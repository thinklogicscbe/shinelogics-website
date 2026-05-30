import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const EMOJIS = ["🔥", "👏", "💪", "🎯", "✅", "🚀", "😎", "❤️"];

const STATUS_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  "Done":        { color: "#15803d", bg: "#dcfce7", label: "Done" },
  "In Progress": { color: "#1d4ed8", bg: "#dbeafe", label: "In Progress" },
  "Todo":        { color: "#6b7280", bg: "#f3f4f6", label: "Todo" },
  "Incomplete":  { color: "#b91c1c", bg: "#fee2e2", label: "Incomplete" },
};

interface TaskItem {
  taskNumber: number;
  title: string;
  subPoints?: string[];
  estimatedHours: number;
  actualHours: number;
  targetPercent: number;
  actualPercent: number;
  status: string;
  score: string;
  impact: string;
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

interface WallTask {
  _id: string;
  employeeName: string;
  date: string;
  location: string;
  dependency: string;
  tasks: TaskItem[];
  overallHours: number;
  overallScore: string;
  inTime: string;
  outTime: string;
  isOutSubmitted: boolean;
  comments: Comment[];
  reactions: Reaction[];
}

const groupReactions = (reactions: Reaction[]) => {
  const map: Record<string, { count: number; names: string[] }> = {};
  reactions.forEach(r => {
    if (!map[r.emoji]) map[r.emoji] = { count: 0, names: [] };
    map[r.emoji].count++;
    map[r.emoji].names.push(r.employeeName);
  });
  return map;
};

const todayStr = () =>
  new Date().toLocaleDateString("en-GB").split("/").join("-");

const AVATAR_COLORS = [
  "#3b82f6", "#8b5cf6", "#059669", "#dc2626",
  "#d97706", "#0891b2", "#7c3aed", "#be185d",
];
const avatarColor = (name: string) =>
  AVATAR_COLORS[(name?.charCodeAt(0) || 0) % AVATAR_COLORS.length];

const TeamWall: React.FC = () => {
  const employee = JSON.parse(localStorage.getItem("employee") || "{}");

  const [tasks, setTasks]                     = useState<WallTask[]>([]);
  const [loading, setLoading]                 = useState(true);
  const [date, setDate]                       = useState(todayStr());
  const [expandedCard, setExpandedCard]       = useState<string | null>(null);
  const [commentText, setCommentText]         = useState<Record<string, string>>({});
  const [commentLoading, setCommentLoading]   = useState<string | null>(null);
  const [reactionLoading, setReactionLoading] = useState<string | null>(null);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState<string | null>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  useEffect(() => { fetchWall(date); }, [date]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node))
        setEmojiPickerOpen(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchWall = async (d: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/public?date=${d}`);
      const result = await res.json();
      if (result.success) setTasks(result.result?.tasks || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReact = async (taskId: string, emoji: string) => {
    if (!employee.id) return;
    setReactionLoading(taskId + emoji);
    try {
      const res = await fetch(`${BASE_URL}/public/${taskId}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: employee.id, employeeName: employee.firstName, emoji }),
      });
      const result = await res.json();
      if (result.success)
        setTasks(prev => prev.map(t => t._id === taskId ? { ...t, reactions: result.result.reactions } : t));
    } finally {
      setReactionLoading(null);
      setEmojiPickerOpen(null);
    }
  };

  const handleComment = async (taskId: string) => {
    const text = commentText[taskId]?.trim();
    if (!text || !employee.id) return;
    setCommentLoading(taskId);
    try {
      const res = await fetch(`${BASE_URL}/public/${taskId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: employee.id, employeeName: employee.firstName, text }),
      });
      const result = await res.json();
      if (result.success) {
        setTasks(prev => prev.map(t => t._id === taskId ? { ...t, comments: [...t.comments, result.result.comment] } : t));
        setCommentText(prev => ({ ...prev, [taskId]: "" }));
      }
    } finally {
      setCommentLoading(null);
    }
  };

  const handleDeleteComment = async (taskId: string, commentId: string) => {
    try {
      await fetch(`${BASE_URL}/public/comment/${commentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: employee.id }),
      });
      setTasks(prev => prev.map(t =>
        t._id === taskId ? { ...t, comments: t.comments.filter(c => c._id !== commentId) } : t
      ));
    } catch (err) { console.error(err); }
  };

  const toInputDate = (d: string) => {
    const [dd, mm, yyyy] = d.split("-");
    return `${yyyy}-${mm}-${dd}`;
  };
  const fromInputDate = (d: string) => {
    const [yyyy, mm, dd] = d.split("-");
    return `${dd}-${mm}-${yyyy}`;
  };

  return (
    <>
      <GlobalFont />
      <PageWrap>
        <WallContainer>

          {/* ── TOPBAR ── */}
          <TopBar>
            <TopBarLeft>
              <HashSymbol>#</HashSymbol>
              <ChannelName>shineops</ChannelName>
              {!loading && tasks.length > 0 && (
                <MemberCount>{tasks.length} active today</MemberCount>
              )}
            </TopBarLeft>
            <DatePickerWrap>
              <label>📅</label>
              <input
                type="date"
                value={toInputDate(date)}
                onChange={e => setDate(fromInputDate(e.target.value))}
              />
            </DatePickerWrap>
          </TopBar>

          {/* ── STATS BAR ── */}
          {!loading && tasks.length > 0 && (
            <StatsBar>
              <StatItem><strong>{tasks.length}</strong> members active</StatItem>
              <StatItem><strong>{tasks.filter(t => t.isOutSubmitted).length}</strong> completed day</StatItem>
              <StatItem>
                <strong>
                  {tasks.reduce((a, t) => a + t.tasks.filter(x => x.status === "Done").length, 0)}
                </strong> tasks done
              </StatItem>
              <StatItem>
                <strong>{tasks.reduce((a, t) => a + t.comments.length, 0)}</strong> comments
              </StatItem>
            </StatsBar>
          )}

          {/* ── LOADING ── */}
          {loading && (
            <LoadingWrap>
              <Spinner />
              <p>Loading team activity...</p>
            </LoadingWrap>
          )}

          {/* ── EMPTY ── */}
          {!loading && tasks.length === 0 && (
            <EmptyState>
              <span>🌅</span>
              <h3>No updates yet for {date}</h3>
              <p>Check back once the team starts logging their day.</p>
            </EmptyState>
          )}

          {/* ── FEED ── */}
          {!loading && tasks.length > 0 && (
            <Feed>
              <DateDivider><span>{date}</span></DateDivider>

              {tasks.map((task, idx) => {
                const isExpanded = expandedCard === task._id;
                const grouped = groupReactions(task.reactions);
                const myReactions = task.reactions
                  .filter(r => r.employeeId === employee.id)
                  .map(r => r.emoji);

                return (
                  <React.Fragment key={task._id}>
                    <Message>
                      {/* Avatar */}
                      <MsgAvatar color={avatarColor(task.employeeName)}>
                        {task.employeeName?.charAt(0).toUpperCase()}
                      </MsgAvatar>

                      <MsgBody>
                        {/* Header row */}
                        <MsgHeader>
                          <MsgName>{task.employeeName}</MsgName>
                          <MsgTime>{task.inTime}</MsgTime>
                          {task.isOutSubmitted
                            ? <StatusBadge done>✓ day complete</StatusBadge>
                            : <StatusBadge>● in progress</StatusBadge>
                          }
                        </MsgHeader>

                        {/* Meta line */}
                        <MsgMeta>
                          <strong>IN</strong> → {task.location}
                          {task.dependency && ` · Dependency: ${task.dependency}`}
                          {` · ${task.date}`}
                        </MsgMeta>

                        {/* Tasks */}
                        <TasksBlock>
                          {task.tasks.map(t => {
                            const cfg = STATUS_CONFIG[t.status] || STATUS_CONFIG["Todo"];
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
                                      : <MetaChip>{t.estimatedHours}h est · {t.targetPercent}%</MetaChip>
                                    }
                                    {task.isOutSubmitted && t.score !== "N/A" && (
                                      <MetaChip>Score: {t.score}</MetaChip>
                                    )}
                                  </TaskRight>
                                </TaskLine>

                                {/* ── SUB POINTS ── */}
                                {subPoints.length > 0 && (
                                  <SubPointsBlock>
                                    {subPoints.map((point, pi) => (
                                      <SubPoint key={pi}>
                                        <span>•</span>
                                        <span>{point}</span>
                                      </SubPoint>
                                    ))}
                                  </SubPointsBlock>
                                )}

                                {task.isOutSubmitted && t.impact && (
                                  <ImpactLine>💡 {t.impact}</ImpactLine>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </TasksBlock>

                        {/* Time + score chips */}
                        <FooterRow>
                          <TimeChip chipType="in">🌅 IN {task.inTime}</TimeChip>
                          {task.isOutSubmitted && (
                            <TimeChip chipType="out">🌆 OUT {task.outTime}</TimeChip>
                          )}
                          {task.isOutSubmitted && task.overallScore !== "N/A" && (
                            <ScoreChip>⭐ {task.overallScore}</ScoreChip>
                          )}
                          {task.isOutSubmitted && task.overallHours > 0 && (
                            <ScoreChip>⏱ {task.overallHours}h</ScoreChip>
                          )}
                        </FooterRow>

                        {/* ── REACTIONS ── */}
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
                            <AddReactBtn
                              onClick={() =>
                                setEmojiPickerOpen(prev => prev === task._id ? null : task._id)
                              }
                            >
                              + react
                            </AddReactBtn>
                            {emojiPickerOpen === task._id && (
                              <EmojiPickerBox>
                                {EMOJIS.map(e => (
                                  <EmojiOpt
                                    key={e}
                                    active={myReactions.includes(e)}
                                    onClick={() => handleReact(task._id, e)}
                                  >
                                    {e}
                                  </EmojiOpt>
                                ))}
                              </EmojiPickerBox>
                            )}
                          </AddReactWrap>
                        </ReactionsRow>

                        {/* ── REPLIES / COMMENTS ── */}
                        <ReplyToggle
                          onClick={() =>
                            setExpandedCard(prev => prev === task._id ? null : task._id)
                          }
                        >
                          💬 {task.comments.length} {task.comments.length === 1 ? "reply" : "replies"}
                          {isExpanded ? " ▲" : " ▼"}
                        </ReplyToggle>

                        {isExpanded && (
                          <CommentThread>
                            {task.comments.length === 0 && (
                              <NoComments>No replies yet — be the first!</NoComments>
                            )}
                            {task.comments.map(c => {
                              const isMe = c.employeeId === employee.id;
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
                                      {isMe && (
                                        <DelBtn
                                          onClick={() => handleDeleteComment(task._id, c._id)}
                                          title="Delete"
                                        >✕</DelBtn>
                                      )}
                                    </CommentMeta>
                                    <CommentBubble isMe={isMe}>
                                      {c.text}
                                    </CommentBubble>
                                  </CommentBubbleWrap>
                                  {isMe && (
                                    <CommentAvatar color="#3b82f6">
                                      {employee.firstName?.charAt(0).toUpperCase()}
                                    </CommentAvatar>
                                  )}
                                </CommentRow>
                              );
                            })}

                            <CommentInputRow>
                              <CommentInput
                                placeholder={`Reply to ${task.employeeName}...`}
                                value={commentText[task._id] || ""}
                                onChange={e =>
                                  setCommentText(prev => ({ ...prev, [task._id]: e.target.value }))
                                }
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
                                disabled={!commentText[task._id]?.trim() || commentLoading === task._id}
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

const spin = keyframes`to { transform: rotate(360deg); }`;
const fadeIn = keyframes`from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); }`;

// ── Global Font ───────────────────────────────────────────────────────────────

const GlobalFont = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
`;

// ── Styled Components ─────────────────────────────────────────────────────────

const PageWrap = styled.div`
  min-height: 100vh;
  background: #f0f2f5;
  font-family: 'Sora', sans-serif;
  padding: 24px;

  @media (max-width: 700px) { padding: 0; }
`;

const WallContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 700px) {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HashSymbol = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: #374151;
`;

const ChannelName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
`;

const MemberCount = styled.span`
  font-size: 12px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 2px 8px;
  border-radius: 20px;
`;

const DatePickerWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  label { font-size: 14px; }

  input {
    font-size: 12px;
    padding: 5px 10px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background: #f9fafb;
    color: #111827;
    cursor: pointer;
    font-family: 'Sora', sans-serif;
    outline: none;

    &:focus { border-color: #3b82f6; }
    &::-webkit-calendar-picker-indicator { cursor: pointer; }
  }
`;

const StatsBar = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  overflow-x: auto;
`;

const StatItem = styled.div`
  padding: 8px 18px;
  font-size: 12px;
  color: #6b7280;
  border-right: 1px solid #e5e7eb;
  white-space: nowrap;
  flex-shrink: 0;

  strong {
    color: #111827;
    font-weight: 600;
  }
`;

const Feed = styled.div`
  padding: 8px 0 16px;
`;

const DateDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  font-size: 12px;
  color: #6b7280;
  font-weight: 600;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }
`;

const LoadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 80px 20px;

  p { color: #9ca3af; font-size: 14px; margin: 0; }
`;

const Spinner = styled.div`
  width: 28px;
  height: 28px;
  border: 2px solid #e5e7eb;
  border-top-color: #374151;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;

  span { font-size: 3rem; display: block; margin-bottom: 14px; }
  h3   { font-size: 1.1rem; font-weight: 600; color: #374151; margin: 0 0 6px; }
  p    { color: #9ca3af; font-size: 13px; margin: 0; }
`;

const Message = styled.div`
  display: flex;
  gap: 12px;
  padding: 8px 16px;
  animation: ${fadeIn} 0.3s ease both;
  transition: background 0.1s;

  &:hover { background: #f9fafb; }
`;

const MsgAvatar = styled.div<{ color: string }>`
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 8px;
  background: ${p => p.color};
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
`;

const MsgBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const MsgHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 3px;
  flex-wrap: wrap;
`;

const MsgName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

const MsgTime = styled.span`
  font-size: 11px;
  color: #9ca3af;
`;

const StatusBadge = styled.span<{ done?: boolean }>`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  background: ${p => p.done ? "#dcfce7" : "#fef9c3"};
  color: ${p => p.done ? "#15803d" : "#854d0e"};
`;

const MsgMeta = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 8px;

  strong {
    color: #374151;
    font-weight: 600;
  }
`;

const TasksBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  overflow: hidden;
`;

const TaskLine = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #111827;
  padding: 6px 10px;
  border-bottom: 1px solid #f3f4f6;

  &:last-of-type { border-bottom: none; }
  &:nth-child(odd) { background: #fafafa; }
`;

const TaskNum = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  min-width: 48px;
  padding-top: 2px;
  flex-shrink: 0;
`;

const TaskTitleText = styled.span`
  flex: 1;
  line-height: 1.45;
`;

const TaskRight = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const StatusPill = styled.span<{ color: string; bg: string }>`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 20px;
  background: ${p => p.bg};
  color: ${p => p.color};
  white-space: nowrap;
`;

const MetaChip = styled.span`
  font-size: 11px;
  color: #9ca3af;
  white-space: nowrap;
`;

// ── Sub Points ────────────────────────────────────────────────────────────────

const SubPointsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px 10px 6px 66px;
  background: #f9fafb;
  border-bottom: 1px solid #f3f4f6;

  &:last-child { border-bottom: none; }
`;

const SubPoint = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 12px;
  color: #6b7280;
  line-height: 1.5;

  span:first-child {
    color: #3b82f6;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
  }
`;

// ── Impact ────────────────────────────────────────────────────────────────────

const ImpactLine = styled.div`
  font-size: 12px;
  color: #6b7280;
  font-style: italic;
  padding: 4px 10px 5px 66px;
  background: #fffbeb;
  border-bottom: 1px solid #f3f4f6;

  &:last-child { border-bottom: none; }
`;

const FooterRow = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
  flex-wrap: wrap;
`;

const TimeChip = styled.span<{ chipType: "in" | "out" }>`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  background: ${p => p.chipType === "in" ? "#e3f2fd" : "#fff3e0"};
  color: ${p => p.chipType === "in" ? "#1565c0" : "#e65100"};
`;

const ScoreChip = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  background: #dcfce7;
  color: #15803d;
`;

const ReactionsRow = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 6px;
  flex-wrap: wrap;
  position: relative;
`;

const ReactionBtn = styled.button<{ active: boolean }>`
  font-size: 12px;
  padding: 2px 8px;
  border: 1px solid ${p => p.active ? "#3b82f6" : "#e5e7eb"};
  border-radius: 20px;
  background: ${p => p.active ? "#eff6ff" : "#f9fafb"};
  cursor: pointer;
  color: #374151;
  font-family: 'Sora', sans-serif;
  transition: all 0.12s;

  &:hover:not(:disabled) { border-color: #3b82f6; background: #eff6ff; }
  &:disabled { cursor: wait; opacity: 0.6; }
`;

const AddReactWrap = styled.div`
  position: relative;
`;

const AddReactBtn = styled.button`
  font-size: 12px;
  padding: 2px 8px;
  border: 1px dashed #d1d5db;
  border-radius: 20px;
  background: transparent;
  cursor: pointer;
  color: #6b7280;
  font-family: 'Sora', sans-serif;
  transition: all 0.12s;

  &:hover { border-color: #3b82f6; color: #3b82f6; }
`;

const EmojiPickerBox = styled.div`
  position: absolute;
  bottom: calc(100% + 6px);
  left: 0;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 6px;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  width: 192px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 50;
`;

const EmojiOpt = styled.button<{ active: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid ${p => p.active ? "#3b82f6" : "transparent"};
  background: ${p => p.active ? "#eff6ff" : "transparent"};
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.1s;

  &:hover { background: #f1f5f9; }
`;

const ReplyToggle = styled.button`
  font-size: 12px;
  color: #6b7280;
  cursor: pointer;
  background: none;
  border: none;
  padding: 2px 0;
  margin-bottom: 4px;
  font-family: 'Sora', sans-serif;
  transition: color 0.12s;

  &:hover { color: #111827; }
`;

const CommentThread = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 0 4px;
  border-left: 2px solid #e5e7eb;
  padding-left: 12px;
  margin-left: 4px;
`;

const NoComments = styled.p`
  font-size: 12px;
  color: #9ca3af;
  font-style: italic;
  margin: 0;
`;

const CommentRow = styled.div<{ isMe: boolean }>`
  display: flex;
  gap: 7px;
  align-items: flex-end;
  flex-direction: ${p => p.isMe ? "row-reverse" : "row"};
`;

const CommentAvatar = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: 50%;
  background: ${p => p.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
`;

const CommentBubbleWrap = styled.div<{ isMe: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-width: 75%;
  align-items: ${p => p.isMe ? "flex-end" : "flex-start"};
`;

const CommentMeta = styled.div<{ isMe: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  flex-direction: ${p => p.isMe ? "row-reverse" : "row"};

  strong {
    font-size: 11px;
    font-weight: 600;
    color: #374151;
  }

  .ctime {
    font-size: 10px;
    color: #9ca3af;
  }
`;

const CommentBubble = styled.div<{ isMe: boolean }>`
  background: ${p => p.isMe ? "#dbeafe" : "#f3f4f6"};
  color: ${p => p.isMe ? "#1e40af" : "#374151"};
  border-radius: ${p => p.isMe ? "12px 12px 2px 12px" : "12px 12px 12px 2px"};
  padding: 6px 10px;
  font-size: 12px;
  line-height: 1.45;
  word-break: break-word;
`;

const DelBtn = styled.button`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #d1d5db;
  font-size: 9px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.12s;

  &:hover { background: #fee2e2; color: #b91c1c; }
`;

const CommentInputRow = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 2px;
`;

const CommentInput = styled.textarea`
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  font-family: 'Sora', sans-serif;
  outline: none;
  resize: none;
  height: 34px;
  line-height: 1.4;
  color: #1e293b;
  transition: border-color 0.15s;

  &:focus { border-color: #3b82f6; }
  &::placeholder { color: #9ca3af; }
`;

const SendBtn = styled.button`
  padding: 0 14px;
  background: #1e3a5f;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  height: 34px;
  font-family: 'Sora', sans-serif;
  transition: background 0.15s;
  white-space: nowrap;

  &:hover:not(:disabled) { background: #2563eb; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const MsgDivider = styled.div`
  height: 1px;
  background: #f3f4f6;
  margin: 4px 16px;
`;