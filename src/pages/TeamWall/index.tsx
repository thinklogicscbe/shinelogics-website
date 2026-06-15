import React, { useState, useEffect, useRef, useCallback } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { io, Socket } from "socket.io-client";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const EMOJIS = ["🔥", "👏", "💪", "🎯", "✅", "🚀", "😎", "❤️"];

// ── Notification sound ────────────────────────────────────────────────────────
const playNotificationSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.4);
  } catch { }
};

// ── JWT decoder (no library) ──────────────────────────────────────────────────
const decodeJWT = (token: string): Record<string, any> | null => {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch { return null; }
};

// ── Wall token resolver (MD / Manager magic link) ─────────────────────────────
const resolveWallToken = (): void => {
  try {
    const params = new URLSearchParams(window.location.search);
    const wallToken = params.get("wallToken");
    if (!wallToken) return;

    const payload = decodeJWT(wallToken);
    if (!payload?.id || !payload?.wallOnly) return;

    sessionStorage.setItem("wallToken", wallToken);
    sessionStorage.setItem("wallProfile", JSON.stringify({
      id: String(payload.id),
      firstName: payload.firstName,
      email: payload.email,
      role: payload.role,
    }));

    window.history.replaceState({}, "", "/team-wall");
  } catch { }
};

// ── Resolve employee ID — handles ALL three login paths ───────────────────────
const resolveEmployeeId = (): string => {
  try {
    const wallProfile = sessionStorage.getItem("wallProfile");
    if (wallProfile) {
      const p = JSON.parse(wallProfile);
      if (p.id) return p.id;
    }
    const empRaw = localStorage.getItem("employee");
    if (empRaw) {
      const emp = JSON.parse(empRaw);
      const id = emp.id || emp._id;
      if (id) return id;
    }
    const token = localStorage.getItem("authToken");
    if (token) {
      const payload = decodeJWT(token);
      if (payload?.id) return payload.id;
    }
    return "";
  } catch { return ""; }
};

// ── Resolve initial display name ──────────────────────────────────────────────
const resolveInitialName = (): string => {
  try {
    const wallProfile = sessionStorage.getItem("wallProfile");
    if (wallProfile) {
      const p = JSON.parse(wallProfile);
      if (p.firstName) return p.firstName;
    }
    const empRaw = localStorage.getItem("employee");
    if (empRaw) {
      const emp = JSON.parse(empRaw);
      if (emp.firstName) return emp.firstName;
    }
    const token = localStorage.getItem("authToken");
    if (token) {
      const payload = decodeJWT(token);
      if (payload?.email) return payload.email.split("@")[0];
    }
    return "";
  } catch { return ""; }
};

// ── Wall headers ──────────────────────────────────────────────────────────────
const getWallHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const wallToken = sessionStorage.getItem("wallToken");
  if (wallToken) headers["x-wall-token"] = wallToken;
  return headers;
};

// ── Date helpers ──────────────────────────────────────────────────────────────
/**
 * Always returns DD-MM-YYYY (the format stored in DB and used as socket room).
 */
const todayStr = () => new Date().toLocaleDateString("en-GB").split("/").join("-");

/** Convert DD-MM-YYYY → YYYY-MM-DD for <input type="date"> */
const toInputDate  = (d: string) => { const [dd, mm, yyyy] = d.split("-"); return `${yyyy}-${mm}-${dd}`; };
/** Convert YYYY-MM-DD → DD-MM-YYYY */
const fromInputDate = (d: string) => { const [yyyy, mm, dd] = d.split("-"); return `${dd}-${mm}-${yyyy}`; };

/**
 * Socket room name — must match server: `wall-DD-MM-YYYY`
 */
const dateToRoom = (ddMmYyyy: string) => `wall-${ddMmYyyy}`;

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  "Todo":                 { color: "#6b7280", bg: "#f3f4f6" },
  "Started":              { color: "#5b21b6", bg: "#ede9fe" },
  "In Progress":          { color: "#1d4ed8", bg: "#dbeafe" },
  "Paused":               { color: "#854d0e", bg: "#fef9c3" },
  "Blocked":              { color: "#b91c1c", bg: "#fee2e2" },
  "Completed Local":      { color: "#15803d", bg: "#dcfce7" },
  "Ready For Testing":    { color: "#0369a1", bg: "#e0f2fe" },
  "Testing In Progress":  { color: "#1d4ed8", bg: "#dbeafe" },
  "Test Passed":          { color: "#15803d", bg: "#dcfce7" },
  "Ready For Production": { color: "#92400e", bg: "#fef3c7" },
  "Production Released":  { color: "#14532d", bg: "#dcfce7" },
  "Closed":               { color: "#374151", bg: "#f3f4f6" },
  "Done":                 { color: "#15803d", bg: "#dcfce7" },
  "Incomplete":           { color: "#b91c1c", bg: "#fee2e2" },
};

// ── Interfaces ────────────────────────────────────────────────────────────────
interface EmployeeProfile {
  id: string;
  firstName: string;
  email: string;
  role?: string;
  designation?: string;
  department?: string;
}

interface TaskItem {
  taskNumber: number;
  title: string;
  subPoints?: string[];
  shortDesc?: string;
  dependency?: string;
  estimatedHours: number;
  actualHours: number;
  targetPercent: number;
  actualPercent: number;
  status: string;
  score: string;
  impact: string;
  timeSegments?: { start: string; end: string }[];
  breakMinutes?: number;
}

interface Reaction {
  emoji: string;
  employeeId: string;
  employeeName: string;
}

interface Comment {
  _id: string;
  employeeId: string;
  employeeName: string;
  text: string;
  createdAt: string;
}

interface BreakEntry {
  slotId: string;
  slotLabel: string;
  emoji: string;
  totalMins: number;
  sessions: { startIso: string; endIso: string; mins: number }[];
}

interface WallTask {
  _id: string;
  employeeName: string;
  date: string;
  location: string;
  dependency: string;
  workMode?: string;
  tasks: TaskItem[];
  overallHours: number;
  overallScore: string;
  inTime: string;
  outTime: string;
  isOutSubmitted: boolean;
  comments: Comment[];
  reactions: Reaction[];
  breakLog?: BreakEntry[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const groupReactions = (reactions: Reaction[]) => {
  const map: Record<string, { count: number; names: string[] }> = {};
  reactions.forEach(r => {
    if (!map[r.emoji]) map[r.emoji] = { count: 0, names: [] };
    map[r.emoji].count++;
    map[r.emoji].names.push(r.employeeName);
  });
  return map;
};

const AVATAR_COLORS = [
  "#3b82f6", "#8b5cf6", "#059669", "#dc2626",
  "#d97706", "#0891b2", "#7c3aed", "#be185d",
];
const avatarColor = (name: string) =>
  AVATAR_COLORS[(name?.charCodeAt(0) || 0) % AVATAR_COLORS.length];

const fmtTime = (iso: string) => {
  try {
    return new Date(iso).toLocaleTimeString("en-IN", {
      hour: "2-digit", minute: "2-digit", hour12: true,
    });
  } catch { return iso; }
};

const BREAK_COLOR: Record<string, { bg: string; text: string; badge: string }> = {
  morning: { bg: "#FEF9C3", text: "#92400E", badge: "#FDE68A" },
  lunch:   { bg: "#DCFCE7", text: "#15803D", badge: "#BBF7D0" },
  evening: { bg: "#E0F2FE", text: "#0369A1", badge: "#BAE6FD" },
};

// ── Component ─────────────────────────────────────────────────────────────────
const TeamWall: React.FC = () => {

  // Resolve wall token from URL synchronously before state init
  useState(() => { resolveWallToken(); });

  const employeeId = resolveEmployeeId();

  // Authoritative profile — hydrated from DB
  const [profile, setProfile] = useState<EmployeeProfile | null>(() =>
    employeeId
      ? { id: employeeId, firstName: resolveInitialName(), email: "" }
      : null
  );
  const [profileLoading, setProfileLoading] = useState(!!employeeId);

  useEffect(() => {
    if (!employeeId) { setProfileLoading(false); return; }
    (async () => {
      try {
        const res    = await fetch(`${BASE_URL}/members/${employeeId}`);
        const result = await res.json();
        if (result.success) {
          const emp = result.result?.user || result.result;
          setProfile({
            id:          emp._id || emp.id,
            firstName:   emp.firstName,
            email:       emp.email       || "",
            role:        emp.role        || "",
            designation: emp.designation || "",
            department:  emp.department  || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch employee profile:", err);
      } finally {
        setProfileLoading(false);
      }
    })();
  }, [employeeId]);

  // ── Wall state ──────────────────────────────────────────────────────────────
  const [tasks, setTasks]                     = useState<WallTask[]>([]);
  const [loading, setLoading]                 = useState(true);
  const [date, setDate]                       = useState(todayStr);
  const [expandedCard, setExpandedCard]       = useState<string | null>(null);
  const [commentText, setCommentText]         = useState<Record<string, string>>({});
  const [commentLoading, setCommentLoading]   = useState<string | null>(null);
  const [reactionLoading, setReactionLoading] = useState<string | null>(null);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState<string | null>(null);

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText]                 = useState("");
  const [editLoading, setEditLoading]           = useState(false);

  const [toast, setToast] = useState<string | null>(null);

  const emojiRef    = useRef<HTMLDivElement>(null);
  const socketRef   = useRef<Socket | null>(null);
  const tasksRef    = useRef<WallTask[]>([]);
  const profileRef  = useRef<EmployeeProfile | null>(null);

  // Keep refs in sync so socket callbacks always see latest values
  useEffect(() => { tasksRef.current  = tasks;   }, [tasks]);
  useEffect(() => { profileRef.current = profile; }, [profile]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    playNotificationSound();
    setTimeout(() => setToast(null), 4000);
  }, []);

  // ── Fetch wall ──────────────────────────────────────────────────────────────
  const fetchWall = useCallback(async (d: string) => {
    setLoading(true);
    try {
      const res    = await fetch(`${BASE_URL}/public?date=${d}`);
      const result = await res.json();
      if (result.success) {
        setTasks(result.result?.tasks || []);
      }
    } catch (err) {
      console.error("fetchWall:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchWall(date); }, [date, fetchWall]);

  // ── Socket.IO ───────────────────────────────────────────────────────────────
  //
  // FIX: we no longer gate the socket on `profile?.id`.
  // The socket connects as soon as BASE_URL is available and joins the
  // correct room for the current date.  Profile is only needed when deciding
  // whether to show a toast (we read it from profileRef inside the callback).
  //
  useEffect(() => {
    if (!BASE_URL) return;

    const socketUrl = BASE_URL.replace(/\/api\/?$/, "");
    const socket    = io(socketUrl, { transports: ["websocket", "polling"] });
    socketRef.current = socket;

    const room = dateToRoom(date); // e.g. "wall-15-06-2025"

    socket.on("connect", () => {
      console.log(`✅ Socket connected: ${socket.id}  →  joining room "${room}"`);
      socket.emit("join-wall", room);  // <-- send the full room name, not just the date
    });

    socket.on("disconnect", (reason) => {
      console.log("🔌 Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connect error:", err.message);
    });

    // ── New comment ──────────────────────────────────────────────────────────
    socket.on("wall:comment", ({ taskId, comment }: { taskId: string; comment: Comment }) => {
      console.log("📨 wall:comment received", { taskId, comment });

      setTasks(prev => prev.map(t =>
        t._id === taskId
          // Avoid duplicates — the sender's optimistic update already added it
          ? { ...t, comments: t.comments.some(c => c._id === comment._id)
              ? t.comments
              : [...t.comments, comment] }
          : t
      ));

      // Always expand so the new comment is immediately visible
      setExpandedCard(taskId);

      // Only toast if someone else commented
      const me = profileRef.current;
      if (me && comment.employeeId !== me.id) {
        const task = tasksRef.current.find(t => t._id === taskId);
        showToast(`💬 ${comment.employeeName} commented${task ? ` on ${task.employeeName}'s update` : ""}`);
      }
    });

    // ── Comment deleted ──────────────────────────────────────────────────────
    socket.on("wall:comment-deleted", ({ taskId, commentId }: { taskId: string; commentId: string }) => {
      console.log("🗑️ wall:comment-deleted received", { taskId, commentId });

      setTasks(prev => prev.map(t =>
        t._id === taskId
          ? { ...t, comments: t.comments.filter(c => c._id !== commentId) }
          : t
      ));
    });

    // ── Comment edited ───────────────────────────────────────────────────────
    socket.on("wall:comment-edited", ({ taskId, commentId, text }: { taskId: string; commentId: string; text: string }) => {
      console.log("✏️ wall:comment-edited received", { taskId, commentId, text });

      setTasks(prev => prev.map(t =>
        t._id === taskId
          ? { ...t, comments: t.comments.map(c => c._id === commentId ? { ...c, text } : c) }
          : t
      ));
    });

    // ── Reaction updated ─────────────────────────────────────────────────────
    socket.on("wall:reaction", ({ taskId, reactions }: { taskId: string; reactions: Reaction[] }) => {
      console.log("👍 wall:reaction received", { taskId, reactions });

      setTasks(prev => prev.map(t =>
        t._id === taskId ? { ...t, reactions } : t
      ));
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  // Re-connect (and join new room) whenever the viewed date changes.
  }, [date, showToast]);

  // ── Close emoji picker on outside click ────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node))
        setEmojiPickerOpen(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── React ───────────────────────────────────────────────────────────────────
  const handleReact = async (taskId: string, emoji: string) => {
    if (!profile?.id) return;
    setReactionLoading(taskId + emoji);
    try {
      await fetch(`${BASE_URL}/public/${taskId}/react`, {
        method:  "POST",
        headers: getWallHeaders(),
        body: JSON.stringify({
          employeeId:   profile.id,
          employeeName: profile.firstName,
          emoji,
        }),
      });
      // UI update arrives via "wall:reaction" socket event
    } finally {
      setReactionLoading(null);
      setEmojiPickerOpen(null);
    }
  };

  // ── Comment ─────────────────────────────────────────────────────────────────
  const handleComment = async (taskId: string) => {
    const text = commentText[taskId]?.trim();
    if (!text) return;
    if (!profile?.id) {
      showToast("⚠️ Could not identify your account. Please log in again.");
      return;
    }

    // ── Optimistic update ───────────────────────────────────────────────────
    // Add a temporary comment immediately so the sender sees it right away.
    // The socket event will arrive shortly and the duplicate-check above will
    // skip re-adding it once we have the real _id from the server.
    const tempId = `temp-${Date.now()}`;
    const optimisticComment: Comment = {
      _id:          tempId,
      employeeId:   profile.id,
      employeeName: profile.firstName,
      text,
      createdAt:    new Date().toISOString(),
    };

    setTasks(prev => prev.map(t =>
      t._id === taskId
        ? { ...t, comments: [...t.comments, optimisticComment] }
        : t
    ));
    setExpandedCard(taskId);
    setCommentText(prev => ({ ...prev, [taskId]: "" }));

    setCommentLoading(taskId);
    try {
      const res    = await fetch(`${BASE_URL}/public/${taskId}/comment`, {
        method:  "POST",
        headers: getWallHeaders(),
        body: JSON.stringify({
          employeeId:   profile.id,
          employeeName: profile.firstName,
          text,
        }),
      });
      const result = await res.json();

      if (result.success) {
        // Replace temp comment with the real one (has the real _id & createdAt)
        const real: Comment = result.result?.comment;
        if (real) {
          setTasks(prev => prev.map(t =>
            t._id === taskId
              ? { ...t, comments: t.comments.map(c => c._id === tempId ? real : c) }
              : t
          ));
        }
        // The socket echo from the server will also arrive; the duplicate-check
        // in the socket handler will skip it because _id already matches.
      } else {
        // Roll back on failure
        setTasks(prev => prev.map(t =>
          t._id === taskId
            ? { ...t, comments: t.comments.filter(c => c._id !== tempId) }
            : t
        ));
        showToast("❌ " + (result.message || "Failed to send comment."));
      }
    } catch (err) {
      // Roll back on network error
      setTasks(prev => prev.map(t =>
        t._id === taskId
          ? { ...t, comments: t.comments.filter(c => c._id !== tempId) }
          : t
      ));
      showToast("❌ Network error. Check your connection.");
      console.error(err);
    } finally {
      setCommentLoading(null);
    }
  };

  // ── Delete comment ──────────────────────────────────────────────────────────
  const handleDeleteComment = async (taskId: string, commentId: string) => {
    if (!profile?.id) return;

    // Optimistic removal
    setTasks(prev => prev.map(t =>
      t._id === taskId
        ? { ...t, comments: t.comments.filter(c => c._id !== commentId) }
        : t
    ));

    try {
      await fetch(`${BASE_URL}/public/comment/${commentId}`, {
        method:  "DELETE",
        headers: getWallHeaders(),
        body: JSON.stringify({ employeeId: profile.id }),
      });
      // Server will also broadcast "wall:comment-deleted"; the duplicate-check
      // in the socket handler (filter on non-existent id) is a no-op.
    } catch (err) {
      console.error("deleteComment:", err);
      // Re-fetch on error to restore state
      fetchWall(date);
    }
  };

  // ── Edit comment ────────────────────────────────────────────────────────────
  const startEdit  = (c: Comment) => { setEditingCommentId(c._id); setEditText(c.text); };
  const cancelEdit = ()            => { setEditingCommentId(null);  setEditText(""); };

  const handleEditComment = async (taskId: string, commentId: string) => {
    const text = editText.trim();
    if (!text || !profile?.id) return;
    setEditLoading(true);

    // Optimistic edit
    setTasks(prev => prev.map(t =>
      t._id === taskId
        ? { ...t, comments: t.comments.map(c => c._id === commentId ? { ...c, text } : c) }
        : t
    ));
    cancelEdit();

    try {
      const res    = await fetch(`${BASE_URL}/public/comment/${commentId}`, {
        method:  "PUT",
        headers: getWallHeaders(),
        body: JSON.stringify({ employeeId: profile.id, text }),
      });
      const result = await res.json();
      if (!result.success) {
        showToast("❌ " + (result.message || "Failed to update comment."));
        fetchWall(date); // restore
      }
    } catch (err) {
      console.error("editComment:", err);
      fetchWall(date);
    } finally {
      setEditLoading(false);
    }
  };

  // ── Loading / auth guard ────────────────────────────────────────────────────
  if (profileLoading) {
    return (
      <>
        <GlobalFont />
        <PageWrap>
          <WallContainer>
            <LoadingWrap><Spinner /><p>Loading your profile...</p></LoadingWrap>
          </WallContainer>
        </PageWrap>
      </>
    );
  }

  if (!profile?.id) {
    return (
      <>
        <GlobalFont />
        <PageWrap>
          <WallContainer>
            <LoadingWrap>
              <p style={{ color: "#ef4444", textAlign: "center" }}>
                ⚠️ You are not logged in. Please log in to view the team wall.
              </p>
            </LoadingWrap>
          </WallContainer>
        </PageWrap>
      </>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <GlobalFont />
      {toast && <Toast>{toast}</Toast>}

      <PageWrap>
        <WallContainer>

          {/* TOPBAR */}
          <TopBar>
            <TopBarLeft>
              <HashSymbol>#</HashSymbol>
              <ChannelName>shineops</ChannelName>
              {!loading && tasks.length > 0 && (
                <MemberCount>{tasks.length} active today</MemberCount>
              )}
            </TopBarLeft>

            <TopBarRight>
              <WhoAmI>
                <WhoAvatar color={avatarColor(profile.firstName)}>
                  {profile.firstName.charAt(0).toUpperCase()}
                </WhoAvatar>
                <WhoInfo>
                  <span className="who-name">{profile.firstName}</span>
                  {profile.role && (
                    <span className={`who-role ${profile.role === "Admin" ? "admin" : ""}`}>
                      {profile.role}
                    </span>
                  )}
                </WhoInfo>
              </WhoAmI>

              <DatePickerWrap>
                <label>📅</label>
                <input
                  type="date"
                  value={toInputDate(date)}
                  onChange={e => setDate(fromInputDate(e.target.value))}
                />
              </DatePickerWrap>
            </TopBarRight>
          </TopBar>

          {/* STATS BAR */}
          {!loading && tasks.length > 0 && (
            <StatsBar>
              <StatItem><strong>{tasks.length}</strong> members active</StatItem>
              <StatItem>
                <strong>{tasks.filter(t => t.isOutSubmitted).length}</strong> completed day
              </StatItem>
              <StatItem>
                <strong>
                  {tasks.reduce((a, t) => a + t.tasks.filter(x =>
                    ["Done", "Closed", "Production Released", "Completed Local"].includes(x.status)
                  ).length, 0)}
                </strong> tasks done
              </StatItem>
              <StatItem>
                <strong>{tasks.reduce((a, t) => a + t.comments.length, 0)}</strong> comments
              </StatItem>
            </StatsBar>
          )}

          {loading && (
            <LoadingWrap><Spinner /><p>Loading team activity...</p></LoadingWrap>
          )}

          {!loading && tasks.length === 0 && (
            <EmptyState>
              <span>🌅</span>
              <h3>No updates yet for {date}</h3>
              <p>Check back once the team starts logging their day.</p>
            </EmptyState>
          )}

          {/* FEED */}
          {!loading && tasks.length > 0 && (
            <Feed>
              <DateDivider><span>{date}</span></DateDivider>

              {tasks.map((task, idx) => {
                const isExpanded = expandedCard === task._id;
                const grouped    = groupReactions(task.reactions);
                const myReactions = task.reactions
                  .filter(r => r.employeeId === profile.id)
                  .map(r => r.emoji);

                return (
                  <React.Fragment key={task._id}>
                    <Message>
                      <MsgAvatar color={avatarColor(task.employeeName)}>
                        {task.employeeName?.charAt(0).toUpperCase()}
                      </MsgAvatar>

                      <MsgBody>
                        <MsgHeader>
                          <MsgName>{task.employeeName}</MsgName>
                          <MsgTime>{task.inTime}</MsgTime>
                          {task.isOutSubmitted
                            ? <StatusBadge done>✓ day complete</StatusBadge>
                            : <StatusBadge>● in progress</StatusBadge>}
                        </MsgHeader>

                        <MsgMeta>
                          <strong>IN</strong> → {task.location}
                          {task.dependency && ` · Dep: ${task.dependency}`}
                          {task.workMode   && ` · ${task.workMode}`}
                          {` · ${task.date}`}
                        </MsgMeta>

                        <TasksBlock>
                          {task.tasks.map(t => {
                            const cfg       = STATUS_CONFIG[t.status] ?? STATUS_CONFIG["Todo"];
                            const subPoints = (t.subPoints || []).filter(p => p.trim());
                            return (
                              <React.Fragment key={t.taskNumber}>
                                <TaskLine>
                                  <TaskNum>Task {t.taskNumber}</TaskNum>
                                  <TaskTitleText>{t.title}</TaskTitleText>
                                  <TaskRight>
                                    <StatusPill color={cfg.color} bg={cfg.bg}>{t.status}</StatusPill>
                                    {task.isOutSubmitted
                                      ? <MetaChip>{t.estimatedHours}h est · {t.actualHours}h act</MetaChip>
                                      : <MetaChip>{t.estimatedHours}h est · {t.targetPercent}%</MetaChip>}
                                    {task.isOutSubmitted && t.score && t.score !== "N/A" && (
                                      <MetaChip>Score: {t.score}</MetaChip>
                                    )}
                                  </TaskRight>
                                </TaskLine>

                                {t.timeSegments && t.timeSegments.some(s => s.start && s.end) && (
                                  <TimeSegRow>
                                    {t.timeSegments.map((s, si) =>
                                      s.start && s.end
                                        ? <SegPill key={si}>🕐 {s.start}–{s.end}</SegPill>
                                        : null
                                    )}
                                    {(t.breakMinutes || 0) > 0 && (
                                      <BreakPill>☕ {t.breakMinutes}m break</BreakPill>
                                    )}
                                  </TimeSegRow>
                                )}

                                {t.dependency && (
                                  <DepLine>👤 Dep: {t.dependency}</DepLine>
                                )}

                                {subPoints.length > 0 && (
                                  <SubPointsBlock>
                                    {subPoints.map((point, pi) => (
                                      <SubPoint key={pi}><span>•</span><span>{point}</span></SubPoint>
                                    ))}
                                  </SubPointsBlock>
                                )}

                                {t.shortDesc && (
                                  <ShortDescLine>{t.shortDesc}</ShortDescLine>
                                )}

                                {task.isOutSubmitted && t.impact && (
                                  <ImpactLine>💡 {t.impact}</ImpactLine>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </TasksBlock>

                        <FooterRow>
                          <TimeChip chipType="in">🌅 IN {task.inTime}</TimeChip>
                          {task.isOutSubmitted && task.outTime && (
                            <TimeChip chipType="out">🌆 OUT {task.outTime}</TimeChip>
                          )}
                          {task.isOutSubmitted && task.overallScore && task.overallScore !== "N/A" && (
                            <ScoreChip>⭐ {task.overallScore}</ScoreChip>
                          )}
                          {task.isOutSubmitted && task.overallHours > 0 && (
                            <ScoreChip>⏱ {task.overallHours}h</ScoreChip>
                          )}
                        </FooterRow>

                        {task.isOutSubmitted && task.breakLog && task.breakLog.length > 0 && (
                          <BreakLogWrap>
                            <BreakLogTitle>⏱ Break log</BreakLogTitle>
                            <BreakSlots>
                              {task.breakLog.map(entry => {
                                const col = BREAK_COLOR[entry.slotId] ?? BREAK_COLOR.morning;
                                return (
                                  <BreakSlotChip key={entry.slotId} bg={col.bg} text={col.text}>
                                    <span>{entry.emoji} {entry.slotLabel}</span>
                                    <BreakBadge bg={col.badge} text={col.text}>
                                      {entry.totalMins} min
                                    </BreakBadge>
                                    {entry.sessions.map((s, si) => (
                                      <BreakSessionLine key={si}>
                                        {fmtTime(s.startIso)} – {fmtTime(s.endIso)}
                                      </BreakSessionLine>
                                    ))}
                                  </BreakSlotChip>
                                );
                              })}
                            </BreakSlots>
                          </BreakLogWrap>
                        )}

                        {/* Reactions */}
                        <ReactionsRow>
                          {Object.entries(grouped).map(([emoji, { count, names }]) => (
                            <ReactionBtn
                              key={emoji}
                              active={myReactions.includes(emoji)}
                              title={names.join(", ")}
                              onClick={() => handleReact(task._id, emoji)}
                              disabled={reactionLoading === task._id + emoji}
                            >
                              {emoji} {count}
                            </ReactionBtn>
                          ))}
                          <AddReactWrap ref={emojiPickerOpen === task._id ? emojiRef : null}>
                            <AddReactBtn onClick={() =>
                              setEmojiPickerOpen(prev => prev === task._id ? null : task._id)
                            }>
                              + react
                            </AddReactBtn>
                            {emojiPickerOpen === task._id && (
                              <EmojiPickerBox>
                                {EMOJIS.map(e => (
                                  <EmojiOpt key={e} active={myReactions.includes(e)}
                                    onClick={() => handleReact(task._id, e)}>
                                    {e}
                                  </EmojiOpt>
                                ))}
                              </EmojiPickerBox>
                            )}
                          </AddReactWrap>
                        </ReactionsRow>

                        {/* Reply toggle */}
                        <ReplyToggle onClick={() =>
                          setExpandedCard(prev => prev === task._id ? null : task._id)
                        }>
                          💬 {task.comments.length}{" "}
                          {task.comments.length === 1 ? "reply" : "replies"}
                          {isExpanded ? " ▲" : " ▼"}
                        </ReplyToggle>

                        {/* Comments thread */}
                        {isExpanded && (
                          <CommentThread>
                            {task.comments.length === 0 && (
                              <NoComments>No replies yet — be the first!</NoComments>
                            )}

                            {task.comments.map(c => {
                              const isMe   = c.employeeId === profile.id;
                              const editing = editingCommentId === c._id;
                              const isTemp  = c._id.startsWith("temp-");
                              return (
                                <CommentRow key={c._id} isMe={isMe}>
                                  {!isMe && (
                                    <CommentAvatar color={avatarColor(c.employeeName)}>
                                      {c.employeeName.charAt(0).toUpperCase()}
                                    </CommentAvatar>
                                  )}

                                  <CommentBubbleWrap isMe={isMe}>
                                    <CommentMeta isMe={isMe}>
                                      <strong>{c.employeeName}</strong>
                                      <span className="ctime">
                                        {new Date(c.createdAt).toLocaleTimeString("en-IN", {
                                          hour: "2-digit", minute: "2-digit",
                                        })}
                                      </span>
                                      {isMe && !editing && !isTemp && (
                                        <>
                                          <EditBtn onClick={() => startEdit(c)} title="Edit">✏️</EditBtn>
                                          <DelBtn
                                            onClick={() => handleDeleteComment(task._id, c._id)}
                                            title="Delete"
                                          >✕</DelBtn>
                                        </>
                                      )}
                                      {isTemp && (
                                        <span style={{ fontSize: 10, color: "#9ca3af", marginLeft: 4 }}>
                                          sending…
                                        </span>
                                      )}
                                    </CommentMeta>

                                    {editing ? (
                                      <EditRow>
                                        <EditInput
                                          value={editText}
                                          onChange={e => setEditText(e.target.value)}
                                          onKeyDown={e => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                              e.preventDefault();
                                              handleEditComment(task._id, c._id);
                                            }
                                            if (e.key === "Escape") cancelEdit();
                                          }}
                                          autoFocus
                                          maxLength={500}
                                        />
                                        <EditSaveBtn
                                          onClick={() => handleEditComment(task._id, c._id)}
                                          disabled={editLoading || !editText.trim()}
                                        >
                                          {editLoading ? "..." : "Save"}
                                        </EditSaveBtn>
                                        <EditCancelBtn onClick={cancelEdit}>Cancel</EditCancelBtn>
                                      </EditRow>
                                    ) : (
                                      <CommentBubble isMe={isMe} isTemp={isTemp}>
                                        {c.text}
                                      </CommentBubble>
                                    )}
                                  </CommentBubbleWrap>

                                  {isMe && (
                                    <CommentAvatar color={avatarColor(profile.firstName)}>
                                      {profile.firstName.charAt(0).toUpperCase()}
                                    </CommentAvatar>
                                  )}
                                </CommentRow>
                              );
                            })}

                            <CommentInputRow>
                              <CommentInput
                                placeholder={`Reply as ${profile.firstName}${profile.role === "Admin" ? " (Admin)" : ""}...`}
                                value={commentText[task._id] || ""}
                                onChange={e => setCommentText(prev => ({
                                  ...prev, [task._id]: e.target.value,
                                }))}
                                onKeyDown={e => {
                                  if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleComment(task._id);
                                  }
                                }}
                                maxLength={500}
                              />
                              <SendBtn
                                onClick={() => handleComment(task._id)}
                                disabled={
                                  !commentText[task._id]?.trim() ||
                                  commentLoading === task._id
                                }
                              >
                                {commentLoading === task._id ? "..." : "Send"}
                              </SendBtn>
                            </CommentInputRow>
                          </CommentThread>
                        )}
                      </MsgBody>
                    </Message>

                    {idx < tasks.length - 1 && <MsgDivider />}
                  </React.Fragment>
                );
              })}
            </Feed>
          )}

        </WallContainer>
      </PageWrap>
    </>
  );
};

export default TeamWall;

// ── Animations ────────────────────────────────────────────────────────────────
const spin    = keyframes`to { transform: rotate(360deg); }`;
const fadeIn  = keyframes`from { opacity:0; transform:translateY(8px); }  to { opacity:1; transform:translateY(0); }`;
const slideIn = keyframes`from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); }`;

const GlobalFont = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
`;

const Toast = styled.div`
  position:fixed;top:18px;right:18px;z-index:9999;background:#1e293b;color:#fff;
  font-family:'Sora',sans-serif;font-size:13px;font-weight:500;padding:12px 18px;
  border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.18);animation:${slideIn} 0.25s ease both;
  max-width:320px;line-height:1.4;
`;
const PageWrap = styled.div`
  min-height:100vh;background:#f0f2f5;font-family:'Sora',sans-serif;padding:24px;
  @media(max-width:700px){padding:0;}
`;
const WallContainer = styled.div`
  max-width:860px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;
  @media(max-width:700px){border-radius:0;border-left:none;border-right:none;}
`;
const TopBar        = styled.div`display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #e5e7eb;background:#fff;position:sticky;top:0;z-index:10;`;
const TopBarLeft    = styled.div`display:flex;align-items:center;gap:8px;`;
const TopBarRight   = styled.div`display:flex;align-items:center;gap:10px;`;
const HashSymbol    = styled.span`font-size:1.2rem;font-weight:700;color:#374151;`;
const ChannelName   = styled.span`font-size:15px;font-weight:600;color:#111827;`;
const MemberCount   = styled.span`font-size:12px;color:#6b7280;background:#f3f4f6;padding:2px 8px;border-radius:20px;`;
const WhoAmI        = styled.div`display:flex;align-items:center;gap:7px;background:#f8faff;border:1px solid #e0e7ff;border-radius:20px;padding:4px 12px 4px 5px;`;
const WhoAvatar     = styled.div<{ color: string }>`width:22px;height:22px;border-radius:50%;background:${p => p.color};color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;`;
const WhoInfo       = styled.div`display:flex;flex-direction:column;line-height:1.2;.who-name{font-size:12px;font-weight:600;color:#111827;}.who-role{font-size:10px;color:#6b7280;&.admin{color:#7c3aed;font-weight:600;}}`;
const DatePickerWrap = styled.div`display:flex;align-items:center;gap:6px;label{font-size:14px;}input{font-size:12px;padding:5px 10px;border:1px solid #e5e7eb;border-radius:6px;background:#f9fafb;color:#111827;cursor:pointer;font-family:'Sora',sans-serif;outline:none;&:focus{border-color:#3b82f6;}&::-webkit-calendar-picker-indicator{cursor:pointer;}}`;
const StatsBar      = styled.div`display:flex;border-bottom:1px solid #e5e7eb;background:#f9fafb;overflow-x:auto;`;
const StatItem      = styled.div`padding:8px 18px;font-size:12px;color:#6b7280;border-right:1px solid #e5e7eb;white-space:nowrap;flex-shrink:0;strong{color:#111827;font-weight:600;}`;
const Feed          = styled.div`padding:8px 0 16px;`;
const DateDivider   = styled.div`display:flex;align-items:center;gap:10px;padding:10px 16px;font-size:12px;color:#6b7280;font-weight:600;&::before,&::after{content:'';flex:1;height:1px;background:#e5e7eb;}`;
const LoadingWrap   = styled.div`display:flex;flex-direction:column;align-items:center;gap:14px;padding:80px 20px;p{color:#9ca3af;font-size:14px;margin:0;}`;
const Spinner       = styled.div`width:28px;height:28px;border:2px solid #e5e7eb;border-top-color:#374151;border-radius:50%;animation:${spin} 0.8s linear infinite;`;
const EmptyState    = styled.div`text-align:center;padding:80px 20px;span{font-size:3rem;display:block;margin-bottom:14px;}h3{font-size:1.1rem;font-weight:600;color:#374151;margin:0 0 6px;}p{color:#9ca3af;font-size:13px;margin:0;}`;
const Message       = styled.div`display:flex;gap:12px;padding:8px 16px;animation:${fadeIn} 0.3s ease both;transition:background 0.1s;&:hover{background:#f9fafb;}`;
const MsgAvatar     = styled.div<{ color: string }>`width:36px;height:36px;min-width:36px;border-radius:8px;background:${p => p.color};color:#fff;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;`;
const MsgBody       = styled.div`flex:1;min-width:0;`;
const MsgHeader     = styled.div`display:flex;align-items:baseline;gap:8px;margin-bottom:3px;flex-wrap:wrap;`;
const MsgName       = styled.span`font-size:14px;font-weight:600;color:#111827;`;
const MsgTime       = styled.span`font-size:11px;color:#9ca3af;`;
const StatusBadge   = styled.span<{ done?: boolean }>`font-size:11px;font-weight:600;padding:2px 8px;border-radius:20px;background:${p => p.done ? "#dcfce7" : "#fef9c3"};color:${p => p.done ? "#15803d" : "#854d0e"};`;
const MsgMeta       = styled.div`font-size:13px;color:#6b7280;margin-bottom:8px;strong{color:#374151;font-weight:600;}`;
const TasksBlock    = styled.div`display:flex;flex-direction:column;margin-bottom:8px;border:1px solid #f3f4f6;border-radius:8px;overflow:hidden;`;
const TaskLine      = styled.div`display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#111827;padding:6px 10px;border-bottom:1px solid #f3f4f6;&:last-of-type{border-bottom:none;}&:nth-child(odd){background:#fafafa;}`;
const TaskNum       = styled.span`font-size:11px;font-weight:600;color:#6b7280;min-width:48px;padding-top:2px;flex-shrink:0;`;
const TaskTitleText = styled.span`flex:1;line-height:1.45;`;
const TaskRight     = styled.div`display:flex;align-items:center;gap:6px;flex-shrink:0;flex-wrap:wrap;justify-content:flex-end;`;
const StatusPill    = styled.span<{ color: string; bg: string }>`font-size:11px;font-weight:600;padding:2px 7px;border-radius:20px;background:${p => p.bg};color:${p => p.color};white-space:nowrap;`;
const MetaChip      = styled.span`font-size:11px;color:#9ca3af;white-space:nowrap;`;
const TimeSegRow    = styled.div`display:flex;flex-wrap:wrap;gap:4px;padding:4px 10px 5px 58px;background:#f8faff;border-bottom:1px solid #f3f4f6;`;
const SegPill       = styled.span`font-size:11px;font-weight:600;background:#eff6ff;color:#1d4ed8;padding:2px 7px;border-radius:10px;white-space:nowrap;`;
const BreakPill     = styled.span`font-size:11px;font-weight:600;background:#fef9c3;color:#854d0e;padding:2px 7px;border-radius:10px;white-space:nowrap;`;
const DepLine       = styled.div`font-size:11px;font-weight:600;color:#7c3aed;padding:3px 10px 3px 58px;background:#f9fafb;border-bottom:1px solid #f3f4f6;`;
const ShortDescLine = styled.div`font-size:12px;color:#6b7280;font-style:italic;padding:3px 10px 5px 58px;background:#fafafa;border-bottom:1px solid #f3f4f6;&:last-child{border-bottom:none;}`;
const SubPointsBlock = styled.div`display:flex;flex-direction:column;gap:2px;padding:4px 10px 6px 58px;background:#f9fafb;border-bottom:1px solid #f3f4f6;&:last-child{border-bottom:none;}`;
const SubPoint      = styled.div`display:flex;align-items:flex-start;gap:6px;font-size:12px;color:#6b7280;line-height:1.5;span:first-child{color:#3b82f6;font-weight:700;flex-shrink:0;margin-top:1px;}`;
const ImpactLine    = styled.div`font-size:12px;color:#6b7280;font-style:italic;padding:4px 10px 5px 58px;background:#fffbeb;border-bottom:1px solid #f3f4f6;&:last-child{border-bottom:none;}`;
const BreakLogWrap  = styled.div`margin-bottom:8px;`;
const BreakLogTitle = styled.div`font-size:11px;font-weight:700;color:#6b7280;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.4px;`;
const BreakSlots    = styled.div`display:flex;gap:6px;flex-wrap:wrap;`;
const BreakSlotChip = styled.div<{ bg: string; text: string }>`background:${p => p.bg};border-radius:8px;padding:5px 8px;font-size:11px;font-weight:600;color:${p => p.text};display:flex;flex-direction:column;gap:2px;min-width:90px;span:first-child{font-size:11px;font-weight:700;}`;
const BreakBadge    = styled.span<{ bg: string; text: string }>`background:${p => p.bg};color:${p => p.text};padding:1px 6px;border-radius:10px;font-size:10px;font-weight:700;width:fit-content;`;
const BreakSessionLine = styled.div`font-size:10px;color:#6b7280;`;
const FooterRow     = styled.div`display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap;`;
const TimeChip      = styled.span<{ chipType: "in" | "out" }>`font-size:11px;font-weight:600;padding:2px 8px;border-radius:20px;background:${p => p.chipType === "in" ? "#e3f2fd" : "#fff3e0"};color:${p => p.chipType === "in" ? "#1565c0" : "#e65100"};`;
const ScoreChip     = styled.span`font-size:11px;font-weight:600;padding:2px 8px;border-radius:20px;background:#dcfce7;color:#15803d;`;
const ReactionsRow  = styled.div`display:flex;gap:4px;margin-bottom:6px;flex-wrap:wrap;position:relative;`;
const ReactionBtn   = styled.button<{ active: boolean }>`font-size:12px;padding:2px 8px;border:1px solid ${p => p.active ? "#3b82f6" : "#e5e7eb"};border-radius:20px;background:${p => p.active ? "#eff6ff" : "#f9fafb"};cursor:pointer;color:#374151;font-family:'Sora',sans-serif;transition:all 0.12s;&:hover:not(:disabled){border-color:#3b82f6;background:#eff6ff;}&:disabled{cursor:wait;opacity:0.6;}`;
const AddReactWrap  = styled.div`position:relative;`;
const AddReactBtn   = styled.button`font-size:12px;padding:2px 8px;border:1px dashed #d1d5db;border-radius:20px;background:transparent;cursor:pointer;color:#6b7280;font-family:'Sora',sans-serif;transition:all 0.12s;&:hover{border-color:#3b82f6;color:#3b82f6;}`;
const EmojiPickerBox = styled.div`position:absolute;bottom:calc(100% + 6px);left:0;background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:6px;display:flex;gap:4px;flex-wrap:wrap;width:192px;box-shadow:0 4px 16px rgba(0,0,0,0.1);z-index:50;`;
const EmojiOpt      = styled.button<{ active: boolean }>`width:32px;height:32px;border-radius:6px;border:1px solid ${p => p.active ? "#3b82f6" : "transparent"};background:${p => p.active ? "#eff6ff" : "transparent"};font-size:1rem;cursor:pointer;transition:background 0.1s;&:hover{background:#f1f5f9;}`;
const ReplyToggle   = styled.button`font-size:12px;color:#6b7280;cursor:pointer;background:none;border:none;padding:2px 0;margin-bottom:4px;font-family:'Sora',sans-serif;transition:color 0.12s;&:hover{color:#111827;}`;
const CommentThread = styled.div`display:flex;flex-direction:column;gap:6px;padding:8px 0 4px;border-left:2px solid #e5e7eb;padding-left:12px;margin-left:4px;`;
const NoComments    = styled.p`font-size:12px;color:#9ca3af;font-style:italic;margin:0;`;
const CommentRow    = styled.div<{ isMe: boolean }>`display:flex;gap:7px;align-items:flex-end;flex-direction:${p => p.isMe ? "row-reverse" : "row"};`;
const CommentAvatar = styled.div<{ color: string }>`width:24px;height:24px;min-width:24px;border-radius:50%;background:${p => p.color};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;flex-shrink:0;`;
const CommentBubbleWrap = styled.div<{ isMe: boolean }>`display:flex;flex-direction:column;gap:2px;max-width:75%;align-items:${p => p.isMe ? "flex-end" : "flex-start"};`;
const CommentMeta   = styled.div<{ isMe: boolean }>`display:flex;align-items:center;gap:5px;flex-direction:${p => p.isMe ? "row-reverse" : "row"};strong{font-size:11px;font-weight:600;color:#374151;}.ctime{font-size:10px;color:#9ca3af;}`;
const CommentBubble = styled.div<{ isMe: boolean; isTemp?: boolean }>`background:${p => p.isMe ? "#dbeafe" : "#f3f4f6"};color:${p => p.isMe ? "#1e40af" : "#374151"};border-radius:${p => p.isMe ? "12px 12px 2px 12px" : "12px 12px 12px 2px"};padding:6px 10px;font-size:12px;line-height:1.45;word-break:break-word;opacity:${p => p.isTemp ? 0.6 : 1};`;
const EditRow       = styled.div`display:flex;gap:5px;align-items:center;flex-wrap:wrap;margin-top:2px;`;
const EditInput     = styled.textarea`flex:1;min-width:140px;padding:5px 9px;border:1px solid #3b82f6;border-radius:8px;font-size:12px;font-family:'Sora',sans-serif;outline:none;resize:none;height:32px;line-height:1.4;color:#1e293b;`;
const EditSaveBtn   = styled.button`padding:0 12px;height:32px;background:#2563eb;color:#fff;border:none;border-radius:7px;font-size:12px;font-weight:600;cursor:pointer;font-family:'Sora',sans-serif;&:disabled{opacity:0.5;cursor:not-allowed;}`;
const EditCancelBtn = styled.button`padding:0 10px;height:32px;background:#f3f4f6;color:#374151;border:1px solid #e5e7eb;border-radius:7px;font-size:12px;font-weight:600;cursor:pointer;font-family:'Sora',sans-serif;&:hover{background:#e5e7eb;}`;
const EditBtn       = styled.button`background:none;border:none;color:#9ca3af;cursor:pointer;font-size:11px;padding:2px 4px;border-radius:4px;display:flex;align-items:center;flex-shrink:0;&:hover{background:#e0f2fe;color:#0369a1;}`;
const DelBtn        = styled.button`width:16px;height:16px;border-radius:50%;border:none;background:transparent;color:#d1d5db;font-size:9px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.12s;&:hover{background:#fee2e2;color:#b91c1c;}`;
const CommentInputRow = styled.div`display:flex;gap:6px;margin-top:2px;`;
const CommentInput  = styled.textarea`flex:1;padding:6px 10px;border:1px solid #e5e7eb;border-radius:8px;font-size:13px;font-family:'Sora',sans-serif;outline:none;resize:none;height:34px;line-height:1.4;color:#1e293b;transition:border-color 0.15s;&:focus{border-color:#3b82f6;}&::placeholder{color:#9ca3af;}`;
const SendBtn       = styled.button`padding:0 14px;background:#1e3a5f;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;height:34px;font-family:'Sora',sans-serif;transition:background 0.15s;white-space:nowrap;&:hover:not(:disabled){background:#2563eb;}&:disabled{opacity:0.5;cursor:not-allowed;}`;
const MsgDivider    = styled.div`height:1px;background:#f3f4f6;margin:4px 16px;`;