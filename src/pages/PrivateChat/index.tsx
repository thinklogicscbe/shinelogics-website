// pages/PrivateChat.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import styled, { keyframes, createGlobalStyle } from "styled-components";

const BASE_URL   = process.env.REACT_APP_BACKEND_URL!;
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL!;

// ── Sound helpers ─────────────────────────────────────────────────────────────
const playSound = (type: "send" | "receive") => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "send") {
      // Two-tone "whoosh" for send
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.18);
    } else {
      // Gentle "ping" for receive
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    }

    osc.onended = () => ctx.close();
  } catch (_) {}
};

// ── Toast notification ────────────────────────────────────────────────────────
interface Toast {
  id:     number;
  name:   string;
  photo?: string;
  text:   string;
}

let toastId = 0;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
`;

const toastIn = keyframes`
  from { opacity: 0; transform: translateX(110%); }
  to   { opacity: 1; transform: translateX(0); }
`;
const toastOut = keyframes`
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(110%); }
`;

const ToastCard = styled.div<{ $leaving: boolean }>`
  pointer-events: all;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #1e1e2e;
  color: #fff;
  border-radius: 12px;
  padding: 12px 16px;
  min-width: 260px;
  max-width: 320px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.28);
  border-left: 4px solid #667eea;
  animation: ${(p) => (p.$leaving ? toastOut : toastIn)} 0.3s ease forwards;
  cursor: pointer;

  .toast-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.85rem;
    color: #fff;
    flex-shrink: 0;
    overflow: hidden;
    img { width: 100%; height: 100%; object-fit: cover; }
  }

  .toast-body {
    flex: 1;
    min-width: 0;
  }

  .toast-name {
    font-size: 0.8rem;
    font-weight: 700;
    color: #a78bfa;
    margin-bottom: 2px;
  }

  .toast-text {
    font-size: 0.78rem;
    color: #d1d5db;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .toast-close {
    font-size: 0.75rem;
    color: #6b7280;
    flex-shrink: 0;
    padding: 2px;
    line-height: 1;
    &:hover { color: #fff; }
  }
`;

// ── Emoji palette ─────────────────────────────────────────────────────────────
const EMOJI_CATEGORIES: { label: string; icon: string; emojis: string[] }[] = [
  {
    label: "Smileys", icon: "😊",
    emojis: ["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","😊","😇","🥰","😍","🤩","😘","😗","😚","😙","🥲","😋","😛","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔","🤐","😐","😑","😶","😏","😒","🙄","😬","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🤧","🥵","🥶","🥴","😵","🤯","🤠","🥳","🥸","😎","🤓","🧐"],
  },
  {
    label: "Gestures", icon: "👋",
    emojis: ["👍","👎","👌","🤌","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","👇","☝️","👋","🤚","🖐️","✋","🖖","👏","🙌","🤲","🤝","🙏","✍️","💪","🦾","🦿","🦵","🦶"],
  },
  {
    label: "Hearts", icon: "❤️",
    emojis: ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❤️‍🔥","❤️‍🩹","💕","💞","💓","💗","💖","💘","💝","💟","☮️","✝️","☯️","🔯","🕉️","☪️","🛐","♈","♉"],
  },
  {
    label: "Activities", icon: "⚽",
    emojis: ["⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉","🥏","🎱","🏓","🏸","🏒","🥊","🥋","🎯","🎳","🏹","🎣","🤿","🎽","🛹","🛼","🛷","🏂","🪂","🏋️","🤼","🤸","🤺"],
  },
  {
    label: "Food", icon: "🍕",
    emojis: ["🍕","🍔","🍟","🌭","🍿","🧂","🥓","🥚","🍳","🧇","🥞","🧈","🍞","🥐","🥖","🫓","🥨","🥯","🧀","🥗","🥙","🥪","🌮","🌯","🫔","🥫","🍱","🍘","🍙","🍚"],
  },
  {
    label: "Travel", icon: "✈️",
    emojis: ["✈️","🚀","🛸","🚁","🛶","⛵","🚢","🚂","🚃","🚄","🚅","🚇","🚊","🚞","🚋","🚌","🚍","🚎","🚐","🚑","🚒","🚓","🚔","🚕","🚖","🚗","🚘","🚙","🛻","🚚"],
  },
  {
    label: "Objects", icon: "💡",
    emojis: ["💡","🔦","🕯️","🪔","🧱","💈","🪞","🪟","🛏️","🛋️","🪑","🚽","🪠","🚿","🛁","🪤","🧴","🧷","🧹","🧺","🧻","🧼","🫧","🪣","🧽","🪒","🪥","🧲","🪜","🛒"],
  },
  {
    label: "Symbols", icon: "💯",
    emojis: ["💯","🔔","🔕","🔇","🔈","🔉","🔊","📢","📣","📯","💬","💭","🗯️","♻️","✅","❌","❎","🔴","🟠","🟡","🟢","🔵","🟣","⚫","⚪","🟤","🔺","🔻"],
  },
];

// ── Types ─────────────────────────────────────────────────────────────────────
interface Employee {
  _id: string; firstName: string; email: string;
  designation?: string; department?: string; role?: string;
  profilePhoto?: string; employeeCode?: number;
}
interface Message {
  _id: string;
  sender: { _id: string; firstName: string; profilePhoto?: string };
  text: string; createdAt: string; readBy: string[];
}
interface Me {
  id: string; firstName: string; companyId: string; profilePhoto?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

const fmtDate = (iso: string) => {
  const d = new Date(iso); const now = new Date();
  const sameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
  if (sameDay(d, now)) return "Today";
  const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1);
  if (sameDay(d, yesterday)) return "Yesterday";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const AvatarEl: React.FC<{ name: string; photo?: string; size?: number; online?: boolean }> = ({
  name, photo, size = 38, online,
}) => (
  <div style={{ position: "relative", flexShrink: 0, width: size, height: size }}>
    {photo ? (
      <img src={photo} alt={name} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover" }} />
    ) : (
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 700, fontSize: size * 0.38, userSelect: "none",
      }}>
        {name?.charAt(0).toUpperCase()}
      </div>
    )}
    {online !== undefined && (
      <span style={{
        position: "absolute", bottom: 0, right: 0,
        width: size * 0.27, height: size * 0.27, borderRadius: "50%",
        background: online ? "#22c55e" : "#d1d5db", border: "2px solid #fff",
      }} />
    )}
  </div>
);

// ── Component ─────────────────────────────────────────────────────────────────
const PrivateChat: React.FC = () => {
  const navigate = useNavigate();

  const [me,           setMe]           = useState<Me | null>(null);
  const [employees,    setEmployees]    = useState<Employee[]>([]);
  const [search,       setSearch]       = useState("");
  const [activeChat,   setActiveChat]   = useState<Employee | null>(null);
  const [messages,     setMessages]     = useState<Message[]>([]);
  const [text,         setText]         = useState("");
  const [sending,      setSending]      = useState(false);
  const [onlineUsers,  setOnlineUsers]  = useState<Set<string>>(new Set());
  const [typingUsers,  setTypingUsers]  = useState<Set<string>>(new Set());
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [toasts,       setToasts]       = useState<(Toast & { leaving: boolean })[]>([]);
  const [showEmoji,    setShowEmoji]    = useState(false);
  const [emojiCategory,setEmojiCategory]= useState(0);
  const [mobileChatOpen,setMobileChatOpen]=useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLTextAreaElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const socketRef      = useRef<Socket | null>(null);
  const meRef          = useRef<Me | null>(null);
  const activeChatRef  = useRef<Employee | null>(null);

  useEffect(() => { meRef.current = me; },              [me]);
  useEffect(() => { activeChatRef.current = activeChat; }, [activeChat]);

  // ── Toast helpers ─────────────────────────────────────────────────────────
  const addToast = useCallback((t: Toast) => {
    setToasts((prev) => [...prev, { ...t, leaving: false }]);
    // Start leave animation after 3.7s, remove after 4s
    setTimeout(() => {
      setToasts((prev) => prev.map((x) => x.id === t.id ? { ...x, leaving: true } : x));
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== t.id));
      }, 300);
    }, 3700);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.map((x) => x.id === id ? { ...x, leaving: true } : x));
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 300);
  }, []);

  // ── Auth ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem("employee");
    if (!stored) { navigate("/Employee"); return; }
    const emp = JSON.parse(stored);
    if (!emp.companyId) { alert("No company assigned."); navigate("/Employee"); return; }
    setMe(emp);
  }, [navigate]);

  // ── Socket ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!me) return;

    const socket = io(SOCKET_URL, { transports: ["websocket", "polling"], autoConnect: true });
    socketRef.current = socket;

    const onConnect = () => {
      console.log("✅ Socket connected:", socket.id);
      socket.emit("user:online", { employeeId: me.id });
      socket.emit("join", { employeeId: me.id, companyId: me.companyId });
      if (activeChatRef.current) {
        socket.emit("chat:join", { senderId: me.id, receiverId: activeChatRef.current._id });
      }
    };

    const onDisconnect = (reason: string) => console.log("🔌 Disconnected:", reason);

    const onOnlineList = (ids: string[]) => setOnlineUsers(new Set(ids));

    const onStatus = ({ employeeId, online }: { employeeId: string; online: boolean }) => {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        online ? next.add(employeeId) : next.delete(employeeId);
        return next;
      });
    };

    const onMessage = (msg: Message) => {
      const currentMe         = meRef.current;
      const currentActiveChat = activeChatRef.current;

      setMessages((prev) => {
        if (prev.find((m) => m._id === msg._id)) return prev;
        return [...prev, msg];
      });

      // Only play sound + show toast for messages FROM others
      if (currentMe && msg.sender._id !== currentMe.id) {
        playSound("receive");

        // Show toast only if not currently chatting with that person
        if (!currentActiveChat || currentActiveChat._id !== msg.sender._id) {
          setUnreadCounts((c) => ({ ...c, [msg.sender._id]: (c[msg.sender._id] || 0) + 1 }));
          addToast({
            id:    ++toastId,
            name:  msg.sender.firstName,
            photo: msg.sender.profilePhoto,
            text:  msg.text,
          });
        }
      }
    };

    const onReadReceipt = ({ readerId }: { readerId: string; senderId: string }) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.sender._id === me.id && !m.readBy.includes(readerId)
            ? { ...m, readBy: [...m.readBy, readerId] }
            : m
        )
      );
    };

    const onTyping = ({ senderId, isTyping }: { senderId: string; isTyping: boolean }) => {
      setTypingUsers((prev) => {
        const next = new Set(prev);
        isTyping ? next.add(senderId) : next.delete(senderId);
        return next;
      });
    };

    socket.on("connect",           onConnect);
    socket.on("disconnect",        onDisconnect);
    socket.on("user:online-list",  onOnlineList);
    socket.on("user:status",       onStatus);
    socket.on("chat:message",      onMessage);
    socket.on("chat:read_receipt", onReadReceipt);
    socket.on("chat:typing",       onTyping);

    return () => {
      socket.off("connect",           onConnect);
      socket.off("disconnect",        onDisconnect);
      socket.off("user:online-list",  onOnlineList);
      socket.off("user:status",       onStatus);
      socket.off("chat:message",      onMessage);
      socket.off("chat:read_receipt", onReadReceipt);
      socket.off("chat:typing",       onTyping);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [me, addToast]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Employees + unread ────────────────────────────────────────────────────
  useEffect(() => {
    if (!me) return;
    fetch(`${BASE_URL}/chat/employees?companyId=${me.companyId}&excludeId=${me.id}`)
      .then((r) => r.json()).then((d) => { if (d.success) setEmployees(d.result.employees); });
    fetch(`${BASE_URL}/chat/unread?employeeId=${me.id}&companyId=${me.companyId}`)
      .then((r) => r.json()).then((d) => { if (d.success) setUnreadCounts(d.result.counts); });
  }, [me]);

  // ── Scroll ────────────────────────────────────────────────────────────────
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior }), 60);
  }, []);
//   useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  // ── Open chat ─────────────────────────────────────────────────────────────
  const openChat = useCallback(async (emp: Employee) => {
    if (!me) return;
    setActiveChat(emp); setMessages([]); setText(""); setShowEmoji(false); setMobileChatOpen(true);
    const socket = socketRef.current;
    if (socket) {
      socket.emit("chat:join", { senderId: me.id, receiverId: emp._id });
      socket.emit("chat:read", { readerId: me.id, senderId: emp._id, companyId: me.companyId });
    }
    setUnreadCounts((c) => ({ ...c, [emp._id]: 0 }));
    try {
      const r = await fetch(`${BASE_URL}/chat/messages?senderId=${me.id}&receiverId=${emp._id}&companyId=${me.companyId}`);
      const d = await r.json();
      if (d.success) { setMessages(d.result.messages); scrollToBottom("auto"); }
    } catch (err) { console.error(err); }
    // setTimeout(() => inputRef.current?.focus(), 100);
  }, [me, scrollToBottom]);

  // ── Send ──────────────────────────────────────────────────────────────────
  const handleSend = useCallback(() => {
    const socket = socketRef.current;
    if (!text.trim() || !me || !activeChat || sending || !socket) return;
    setSending(true);
    playSound("send"); // ✅ play send sound
    socket.emit("chat:send", { senderId: me.id, receiverId: activeChat._id, companyId: me.companyId, text: text.trim() });
    socket.emit("chat:typing", { senderId: me.id, receiverId: activeChat._id, isTyping: false });
    setText(""); setSending(false); setShowEmoji(false); scrollToBottom();
  }, [text, me, activeChat, sending, scrollToBottom]);

  // ── Typing ────────────────────────────────────────────────────────────────
  const handleTyping = (val: string) => {
    setText(val);
    const socket = socketRef.current;
    if (!me || !activeChat || !socket) return;
    socket.emit("chat:typing", { senderId: me.id, receiverId: activeChat._id, isTyping: true });
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      socket.emit("chat:typing", { senderId: me.id, receiverId: activeChat._id, isTyping: false });
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  // ── Emoji outside click ───────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target as Node)) setShowEmoji(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const insertEmoji = (emoji: string) => {
    const ta = inputRef.current;
    if (!ta) { setText((t) => t + emoji); return; }
    const start = ta.selectionStart ?? text.length;
    const end   = ta.selectionEnd   ?? text.length;
    setText(text.slice(0, start) + emoji + text.slice(end));
    requestAnimationFrame(() => {
      ta.focus();
      const pos = start + emoji.length;
      ta.setSelectionRange(pos, pos);
    });
  };

  // ── Group by date ─────────────────────────────────────────────────────────
  const grouped: { date: string; msgs: Message[] }[] = [];
  messages.forEach((msg) => {
    const d = fmtDate(msg.createdAt);
    const last = grouped[grouped.length - 1];
    if (last && last.date === d) last.msgs.push(msg);
    else grouped.push({ date: d, msgs: [msg] });
  });

  const filteredEmployees = employees.filter((e) =>
    e.firstName.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase()) ||
    (e.designation || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalUnread = Object.values(unreadCounts).reduce((a, b) => a + b, 0);

  if (!me) return null;

  return (
    <>
      <GlobalStyles />

      {/* ── TOAST NOTIFICATIONS ── */}
      <ToastContainer>
        {toasts.map((t) => (
          <ToastCard key={t.id} $leaving={t.leaving} onClick={() => dismissToast(t.id)}>
            <div className="toast-avatar">
              {t.photo
                ? <img src={t.photo} alt={t.name} />
                : t.name.charAt(0).toUpperCase()}
            </div>
            <div className="toast-body">
              <div className="toast-name">{t.name}</div>
              <div className="toast-text">{t.text}</div>
            </div>
            <span className="toast-close">✕</span>
          </ToastCard>
        ))}
      </ToastContainer>

      <Wrapper>
        {/* ── SIDEBAR ── */}
        <Sidebar $hidden={mobileChatOpen}>
          <SidebarTop>
            <div className="top-row">
              <BackBtn onClick={() => navigate(-1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
              </BackBtn>
              <div className="title-block">
                <span className="title-text">Messages</span>
                {totalUnread > 0 && <UnreadPill>{totalUnread}</UnreadPill>}
              </div>
              <AvatarEl name={me.firstName} photo={me.profilePhoto} size={32} online={true} />
            </div>
            <SearchWrap>
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input placeholder="Search people…" value={search} onChange={(e) => setSearch(e.target.value)} />
            </SearchWrap>
          </SidebarTop>

          <ContactList>
            {filteredEmployees.length === 0 && <EmptyContacts>No people found</EmptyContacts>}
            {filteredEmployees.map((emp) => {
              const isOnline = onlineUsers.has(emp._id);
              const isTyping = typingUsers.has(emp._id);
              const unread   = unreadCounts[emp._id] || 0;
              const isActive = activeChat?._id === emp._id;
              return (
                <ContactRow key={emp._id} $active={isActive} onClick={() => openChat(emp)}>
                  <AvatarEl name={emp.firstName} photo={emp.profilePhoto} size={46} online={isOnline} />
                  <div className="info">
                    <div className="name-row">
                      <span className="name">{emp.firstName}</span>
                      {unread > 0 && <UnreadPill>{unread}</UnreadPill>}
                    </div>
                    <div className="sub">
                      {isTyping
                        ? <TypingDots><span/><span/><span/></TypingDots>
                        : (emp.designation || emp.role || emp.email || "")}
                    </div>
                  </div>
                </ContactRow>
              );
            })}
          </ContactList>
        </Sidebar>

        {/* ── CHAT PANEL ── */}
        <Panel $mobileOpen={mobileChatOpen}>
          {!activeChat ? (
            <EmptyChat>
              <div className="icon">💬</div>
              <div className="title">Your messages</div>
              <div className="sub">Select a person to start a private conversation</div>
            </EmptyChat>
          ) : (
            <>
              <PanelHeader>
                <MobileBack onClick={() => { setMobileChatOpen(false); setActiveChat(null); }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5M12 5l-7 7 7 7"/>
                  </svg>
                </MobileBack>
                <AvatarEl name={activeChat.firstName} photo={activeChat.profilePhoto} size={40} online={onlineUsers.has(activeChat._id)} />
                <div className="header-info">
                  <div className="header-name">{activeChat.firstName}</div>
                  <div className="header-status">
                    {typingUsers.has(activeChat._id)
                      ? <span className="typing-status">typing…</span>
                      : onlineUsers.has(activeChat._id)
                        ? <span className="online-status">● Active now</span>
                        : <span className="offline-status">● Offline</span>}
                  </div>
                </div>
                <div className="header-tags">
                  {activeChat.designation && <HeaderTag>{activeChat.designation}</HeaderTag>}
                  {activeChat.department  && <HeaderTag>{activeChat.department}</HeaderTag>}
                </div>
              </PanelHeader>

              <MsgArea>
                {grouped.length === 0 && (
                  <NoMessages>
                    <div className="no-msg-avatar"><AvatarEl name={activeChat.firstName} photo={activeChat.profilePhoto} size={64} /></div>
                    <div className="no-msg-name">{activeChat.firstName}</div>
                    {activeChat.designation && <div className="no-msg-role">{activeChat.designation}</div>}
                    <div className="no-msg-hint">Say hello! 👋</div>
                  </NoMessages>
                )}

                {grouped.map((group) => (
                  <React.Fragment key={group.date}>
                    <DayDivider><span>{group.date}</span></DayDivider>
                    {group.msgs.map((msg, idx) => {
                      const isMe = msg.sender._id === me.id;
                      const prev = group.msgs[idx - 1];
                      const showAvatar = !isMe && (!prev || prev.sender._id !== msg.sender._id);
                      return (
                        <BubbleRow key={msg._id} $isMe={isMe}>
                          {!isMe && (
                            <div className="avatar-slot">
                              {showAvatar
                                ? <AvatarEl name={msg.sender.firstName} photo={msg.sender.profilePhoto} size={28} />
                                : <div style={{ width: 28 }} />}
                            </div>
                          )}
                          <div className="bubble-col">
                            <Bubble $isMe={isMe}>{msg.text}</Bubble>
                            <BubbleMeta $isMe={isMe}>
                              {fmtTime(msg.createdAt)}
                              {isMe && (
                                <ReadTick $read={msg.readBy.length > 1}>
                                  {msg.readBy.length > 1 ? "✓✓" : "✓"}
                                </ReadTick>
                              )}
                            </BubbleMeta>
                          </div>
                        </BubbleRow>
                      );
                    })}
                  </React.Fragment>
                ))}

                {typingUsers.has(activeChat._id) && (
                  <BubbleRow $isMe={false}>
                    <div className="avatar-slot">
                      <AvatarEl name={activeChat.firstName} photo={activeChat.profilePhoto} size={28} />
                    </div>
                    <div className="bubble-col">
                      <Bubble $isMe={false} style={{ padding: "12px 18px" }}>
                        <TypingDots><span/><span/><span/></TypingDots>
                      </Bubble>
                    </div>
                  </BubbleRow>
                )}
                <div ref={messagesEndRef} />
              </MsgArea>

              {showEmoji && (
                <EmojiPickerWrap ref={emojiPickerRef}>
                  <EmojiCategoryBar>
                    {EMOJI_CATEGORIES.map((cat, i) => (
                      <EmojiCatBtn key={i} $active={emojiCategory === i} onClick={() => setEmojiCategory(i)} title={cat.label}>
                        {cat.icon}
                      </EmojiCatBtn>
                    ))}
                  </EmojiCategoryBar>
                  <EmojiGrid>
                    {EMOJI_CATEGORIES[emojiCategory].emojis.map((e, i) => (
                      <EmojiBtn key={i} onClick={() => insertEmoji(e)}>{e}</EmojiBtn>
                    ))}
                  </EmojiGrid>
                </EmojiPickerWrap>
              )}

              <InputBar>
                <EmojiToggle onClick={() => setShowEmoji((v) => !v)} $active={showEmoji} title="Emoji">😊</EmojiToggle>
                <ChatInput
                  ref={inputRef}
                  placeholder={`Message ${activeChat.firstName}…`}
                  value={text}
                  onChange={(e) => handleTyping(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                />
                <SendButton onClick={handleSend} disabled={!text.trim() || sending}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </SendButton>
              </InputBar>
            </>
          )}
        </Panel>
      </Wrapper>
    </>
  );
};

export default PrivateChat;

// ── Global ────────────────────────────────────────────────────────────────────
const GlobalStyles = createGlobalStyle`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`;

// ── Animations ────────────────────────────────────────────────────────────────
const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40%            { transform: translateY(-5px); opacity: 1; }
`;
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const slideIn = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

// ── Layout ────────────────────────────────────────────────────────────────────
const Wrapper = styled.div`
  display: flex; height: 100vh; max-height: 100vh;
  background: #f0f2f5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
`;

const Sidebar = styled.div<{ $hidden?: boolean }>`
  width: 360px; min-width: 280px; max-width: 360px;
  display: flex; flex-direction: column;
  background: #fff; border-right: 1px solid #e5e7eb; overflow: hidden;
  @media (max-width: 768px) {
    width: 100%; max-width: 100%;
    display: ${(p) => (p.$hidden ? "none" : "flex")};
  }
`;

const SidebarTop = styled.div`
  padding: 16px 16px 0; background: #fff;
  .top-row { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .title-block { flex: 1; display: flex; align-items: center; gap: 8px; }
  .title-text { font-size: 1.15rem; font-weight: 800; color: #0a0a0a; letter-spacing: -0.3px; }
`;

const BackBtn = styled.button`
  background: #f3f4f6; border: none; border-radius: 50%; width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #374151; flex-shrink: 0; transition: background 0.15s;
  &:hover { background: #e5e7eb; }
`;

const SearchWrap = styled.div`
  position: relative; margin-bottom: 8px;
  .search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); width: 15px; height: 15px; color: #9ca3af; pointer-events: none; }
  input {
    width: 100%; padding: 9px 12px 9px 34px; background: #f3f4f6;
    border: none; border-radius: 20px; font-size: 0.85rem; color: #111; outline: none; transition: background 0.15s;
    &:focus { background: #e9eaf0; }
    &::placeholder { color: #9ca3af; }
  }
`;

const ContactList = styled.div`
  flex: 1; overflow-y: auto; padding: 4px 0 8px;
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
`;

const EmptyContacts = styled.div`
  text-align: center; padding: 40px 20px; color: #9ca3af; font-size: 0.85rem;
`;

const ContactRow = styled.div<{ $active: boolean }>`
  display: flex; align-items: center; gap: 12px; padding: 10px 16px; cursor: pointer;
  background: ${(p) => (p.$active ? "#f0f2ff" : "transparent")};
  border-left: 3px solid ${(p) => (p.$active ? "#667eea" : "transparent")};
  transition: background 0.12s;
  &:hover { background: ${(p) => (p.$active ? "#f0f2ff" : "#f9fafb")}; }
  .info { flex: 1; min-width: 0; }
  .name-row { display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 2px; }
  .name { font-size: 0.9rem; font-weight: 600; color: #0a0a0a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sub { font-size: 0.75rem; color: #9ca3af; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: flex; align-items: center; }
`;

const Panel = styled.div<{ $mobileOpen?: boolean }>`
  flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #f0f2f5;
  @media (max-width: 768px) {
    position: absolute; inset: 0; z-index: 10;
    display: ${(p) => (p.$mobileOpen ? "flex" : "none")};
  }
`;

const EmptyChat = styled.div`
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; background: #fff;
  .icon  { font-size: 3.5rem; margin-bottom: 8px; }
  .title { font-size: 1.15rem; font-weight: 700; color: #0a0a0a; }
  .sub   { font-size: 0.85rem; color: #9ca3af; }
`;

const PanelHeader = styled.div`
  display: flex; align-items: center; gap: 12px; padding: 12px 18px;
  background: #fff; border-bottom: 1px solid #e5e7eb; box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  .header-info { flex: 1; min-width: 0; }
  .header-name { font-size: 0.95rem; font-weight: 700; color: #0a0a0a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .header-status { font-size: 0.72rem; margin-top: 1px; }
  .online-status  { color: #22c55e; font-weight: 600; }
  .offline-status { color: #9ca3af; }
  .typing-status  { color: #667eea; font-weight: 600; font-style: italic; }
  .header-tags { display: flex; gap: 5px; flex-wrap: wrap; justify-content: flex-end; }
`;

const MobileBack = styled.button`
  display: none; background: #f3f4f6; border: none; border-radius: 50%; width: 34px; height: 34px;
  align-items: center; justify-content: center; cursor: pointer; color: #374151; flex-shrink: 0; transition: background 0.15s;
  &:hover { background: #e5e7eb; }
  @media (max-width: 768px) { display: flex; }
`;

const HeaderTag = styled.span`
  font-size: 0.7rem; background: #f0f2ff; color: #667eea;
  padding: 2px 9px; border-radius: 20px; font-weight: 600; white-space: nowrap;
`;

const MsgArea = styled.div`
  flex: 1; overflow-y: auto; padding: 16px 16px 8px;
  display: flex; flex-direction: column; gap: 1px; background: #f0f2f5;
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
`;

const NoMessages = styled.div`
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 40px 0;
  .no-msg-avatar  { margin-bottom: 8px; }
  .no-msg-name    { font-size: 1rem; font-weight: 700; color: #0a0a0a; }
  .no-msg-role    { font-size: 0.8rem; color: #9ca3af; }
  .no-msg-hint    { font-size: 0.85rem; color: #667eea; margin-top: 4px; }
`;

const DayDivider = styled.div`
  display: flex; align-items: center; justify-content: center; margin: 14px 0 8px;
  span {
    font-size: 0.68rem; font-weight: 700; color: #6b7280;
    background: #e5e7eb; padding: 3px 14px; border-radius: 20px;
    letter-spacing: 0.3px; text-transform: uppercase;
  }
`;

const BubbleRow = styled.div<{ $isMe: boolean }>`
  display: flex; justify-content: ${(p) => (p.$isMe ? "flex-end" : "flex-start")};
  align-items: flex-end; gap: 6px; margin-bottom: 2px;
  animation: ${fadeUp} 0.18s ease both;
  .avatar-slot { flex-shrink: 0; align-self: flex-end; }
  .bubble-col { display: flex; flex-direction: column; align-items: ${(p) => (p.$isMe ? "flex-end" : "flex-start")}; max-width: 68%; }
`;

const Bubble = styled.div<{ $isMe: boolean }>`
  background: ${(p) => (p.$isMe ? "linear-gradient(135deg, #667eea, #764ba2)" : "#fff")};
  color:      ${(p) => (p.$isMe ? "#fff" : "#0a0a0a")};
  border-radius: ${(p) => (p.$isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px")};
  padding: 9px 14px; font-size: 0.88rem; line-height: 1.5;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1); white-space: pre-wrap; word-break: break-word;
  transition: transform 0.1s;
  &:active { transform: scale(0.98); }
`;

const BubbleMeta = styled.div<{ $isMe: boolean }>`
  display: flex; align-items: center; gap: 3px; font-size: 0.62rem; color: #9ca3af;
  margin-top: 3px; padding: 0 4px;
  justify-content: ${(p) => (p.$isMe ? "flex-end" : "flex-start")};
`;

const ReadTick = styled.span<{ $read: boolean }>`
  color: ${(p) => (p.$read ? "#667eea" : "#9ca3af")};
  font-size: 0.7rem; font-weight: 700; letter-spacing: -1px;
`;

const TypingDots = styled.div`
  display: flex; gap: 4px; align-items: center; height: 18px;
  span {
    width: 7px; height: 7px; background: #9ca3af; border-radius: 50%;
    animation: ${bounce} 1.2s infinite;
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
`;

const EmojiPickerWrap = styled.div`
  position: relative; background: #fff; border-top: 1px solid #f0f0f0;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.08); animation: ${slideIn} 0.18s ease both; flex-shrink: 0;
`;

const EmojiCategoryBar = styled.div`
  display: flex; gap: 2px; padding: 8px 12px 4px; border-bottom: 1px solid #f3f4f6; overflow-x: auto;
  &::-webkit-scrollbar { display: none; }
`;

const EmojiCatBtn = styled.button<{ $active: boolean }>`
  background: ${(p) => (p.$active ? "#f0f2ff" : "transparent")}; border: none; border-radius: 8px;
  padding: 5px 8px; font-size: 1.1rem; cursor: pointer; flex-shrink: 0; transition: background 0.12s, transform 0.1s;
  &:hover { background: #f3f4f6; transform: scale(1.1); }
`;

const EmojiGrid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
  gap: 2px; padding: 8px 12px 12px; max-height: 180px; overflow-y: auto;
  &::-webkit-scrollbar { width: 3px; }
  &::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 3px; }
`;

const EmojiBtn = styled.button`
  background: none; border: none; font-size: 1.3rem; cursor: pointer; padding: 4px;
  border-radius: 6px; line-height: 1; transition: background 0.1s, transform 0.1s;
  &:hover { background: #f3f4f6; transform: scale(1.2); }
  &:active { transform: scale(0.95); }
`;

const InputBar = styled.div`
  display: flex; align-items: flex-end; gap: 8px; padding: 10px 14px 12px;
  background: #fff; border-top: 1px solid #f0f0f0; flex-shrink: 0;
`;

const EmojiToggle = styled.button<{ $active: boolean }>`
  background: ${(p) => (p.$active ? "#f0f2ff" : "#f3f4f6")}; border: none; border-radius: 50%;
  width: 38px; height: 38px; font-size: 1.2rem; cursor: pointer;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  transition: background 0.15s, transform 0.1s;
  &:hover { background: #e5e7eb; transform: scale(1.08); }
  &:active { transform: scale(0.95); }
`;

const ChatInput = styled.textarea`
  flex: 1; padding: 9px 14px; background: #f3f4f6;
  border: 1.5px solid transparent; border-radius: 20px;
  font-size: 0.9rem; font-family: inherit; color: #0a0a0a;
  resize: none; outline: none; max-height: 120px; overflow-y: auto; line-height: 1.5;
  transition: border-color 0.2s, background 0.2s;
  &:focus { border-color: #667eea; background: #fff; }
  &::placeholder { color: #9ca3af; }
  &::-webkit-scrollbar { width: 3px; }
`;

const SendButton = styled.button`
  width: 38px; height: 38px; border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  transition: opacity 0.2s, transform 0.1s;
  box-shadow: 0 2px 8px rgba(102,126,234,0.4);
  svg { width: 16px; height: 16px; }
  &:hover:not(:disabled) { opacity: 0.88; transform: scale(1.08); }
  &:active:not(:disabled) { transform: scale(0.95); }
  &:disabled { background: #d1d5db; box-shadow: none; cursor: not-allowed; }
`;

const UnreadPill = styled.span`
  background: linear-gradient(135deg, #667eea, #764ba2); color: #fff;
  border-radius: 20px; padding: 1px 7px; font-size: 0.65rem; font-weight: 700;
  flex-shrink: 0; line-height: 1.6;
`;