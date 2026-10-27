import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const suggestions = [
  { icon: "✦", title: "Learn something new", text: "Explain a difficult topic in simple words." },
  { icon: "⌘", title: "Write code", text: "Help me build a website with React." },
  { icon: "▤", title: "Write something", text: "Help me write a clear, well-structured essay." },
  { icon: "◉", title: "Plan my day", text: "Make a realistic study plan for today." },
];

export default function App() {
  const [chats, setChats] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const textareaRef = useRef(null);
  const bottomRef = useRef(null);
  const activeChat = chats.find((chat) => chat.id === activeId);
  const messages = activeChat?.messages ?? [];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, busy]);
  useEffect(() => { textareaRef.current?.focus(); }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function submitAuth(event) {
    event.preventDefault();
    setAuthMessage("");
    if (!supabase) {
      setAuthMessage("Login setup pending: add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Render Environment, then redeploy.");
      return;
    }
    if (!authEmail.trim() || !authPassword) {
      setAuthMessage("Email aur password dono bharo.");
      return;
    }
    setAuthBusy(true);
    try {
      if (authMode === "signup") {
        const { data, error: authError } = await supabase.auth.signUp({
          email: authEmail.trim(),
          password: authPassword,
        });
        if (authError) throw authError;
        setAuthMessage(data.session
          ? "Account ban gaya! You are now logged in."
          : "Account request sent. Email confirmation aaye to inbox check karo.");
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: authEmail.trim(),
          password: authPassword,
        });
        if (authError) throw authError;
        setAuthMessage("Login successful.");
        setAuthOpen(false);
      }
    } catch (authError) {
      setAuthMessage(authError.message || "Login nahi ho paya. Details check karke try karo.");
    } finally {
      setAuthBusy(false);
    }
  }

  async function logOut() {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    setAuthMessage("You are logged out.");
  }

  function newChat() {
    setActiveId(null);
    setInput("");
    setError("");
    setSidebarOpen(false);
    textareaRef.current?.focus();
  }

  async function sendMessage(text = input) {
    const prompt = text.trim();
    if (!prompt || busy) return;
    const id = activeId || crypto.randomUUID();
    const existing = chats.find((chat) => chat.id === id);
    const userMessage = { role: "user", content: prompt };
    const nextMessages = [...(existing?.messages ?? []), userMessage];
    const updated = { id, title: existing?.title || prompt.slice(0, 42), messages: nextMessages };
    setChats((old) => existing ? old.map((chat) => chat.id === id ? updated : chat) : [updated, ...old]);
    setActiveId(id);
    setInput("");
    setBusy(true);
    setError("");
    try {
      const response = await fetch("https://akshay-ai-backend.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "AI server se response nahi mila.");
      const answer = data.reply || data.choices?.[0]?.message?.content;
      if (!answer) throw new Error("AI ne khaali response bheja. Dobara try karo.");
      const assistantMessage = { role: "assistant", content: answer };
      setChats((old) => old.map((chat) => chat.id === id ? { ...chat, messages: [...nextMessages, assistantMessage] } : chat));
    } catch (err) {
      const message = err.message || "Connection error. Server ko check karo.";
      setError(message);
      setChats((old) => old.map((chat) => chat.id === id ? { ...chat, messages: [...nextMessages, { role: "assistant", content: message }] } : chat));
    } finally {
      setBusy(false);
      textareaRef.current?.focus();
    }
  }

  function clearHistory() {
    setChats([]);
    newChat();
  }

  return (
    <div className="app-shell">
      {sidebarOpen && <button className="mobile-backdrop" aria-label="Close menu" onClick={() => setSidebarOpen(false)} />}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-logo">A<span>✦</span></div>
          <div className="brand-name"><strong>AKSHAY <span>AI</span></strong><small>YOUR AI ASSISTANT</small></div>
          <button className="icon-button sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">×</button>
        </div>
        <button className="new-chat-button" onClick={newChat}><span>＋</span> New chat <kbd>Ctrl K</kbd></button>
        <div className="sidebar-label">RECENT CHATS</div>
        <div className="chat-history">
          {chats.length === 0 ? <p className="empty-history">Your conversations will appear here.</p> : chats.map((chat) => (
            <button key={chat.id} className={`history-item ${activeId === chat.id ? "selected" : ""}`} onClick={() => { setActiveId(chat.id); setSidebarOpen(false); }}>
              <span className="history-icon">▤</span><span>{chat.title}</span>
            </button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="status-card"><span className="status-dot" /><div><strong>AI assistant</strong><small>API connection required</small></div></div>
          <button className="clear-button" onClick={clearHistory}>⌫ <span>Clear chat history</span></button>
          <div className="profile"><div className="avatar">A</div><div className="profile-info"><strong>Akshay</strong><small>Personal workspace</small></div><span className="profile-dots">•••</span></div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">☰</button>
            <div className="model-selector"><span className="model-spark">✦</span><strong>Akshay AI</strong><span className="model-tag">ASSISTANT</span><span className="chevron">⌄</span></div>
          </div>
          <div className="topbar-right"><div className="online-indicator"><span /> Ready to chat</div>{user ? <button className="login-button logged-in" onClick={logOut} title={user.email || "Account"}><span className="login-avatar">{(user.email || "A").slice(0, 1).toUpperCase()}</span> Log out</button> : <button className="login-button" onClick={() => { setAuthMode("login"); setAuthMessage(""); setAuthOpen(true); }}>Log in <span>↗</span></button>}</div>
        </header>

        <section className="chat-area">
          {messages.length === 0 ? (
            <div className="welcome-screen">
              <div className="hero-orb"><div className="orb-ring ring-one" /><div className="orb-ring ring-two" /><div className="orb-core">✦</div></div>
              <div className="welcome-eyebrow"><span /> YOUR PERSONAL AI ASSISTANT <span /></div>
              <h1>What can I help<br />you <span>with today?</span></h1>
              <p className="welcome-description">Ask a question, explore an idea, or get help with your next big project. Let's make something great.</p>
              <div className="prompt-grid">
                {suggestions.map((item) => <button className="prompt-card" key={item.title} onClick={() => sendMessage(item.text)}><span className="prompt-icon">{item.icon}</span><span className="prompt-title">{item.title}</span><span className="prompt-description">{item.text}</span><span className="prompt-arrow">↗</span></button>)}
              </div>
              <p className="hero-footnote"><span>✦</span> Powered by your configured AI API</p>
            </div>
          ) : (
            <div className="messages-container">
              {messages.map((message, index) => <div className="message-row" key={index}>
                <div className={`message-avatar ${message.role === "user" ? "user" : ""}`}>{message.role === "user" ? "A" : "✦"}</div>
                <div className="message-content"><div className="message-author">{message.role === "user" ? "You" : "Akshay AI"}</div><div className="message-text">{message.content}</div>
                  {message.role === "assistant" && <div className="message-actions"><button onClick={() => navigator.clipboard?.writeText(message.content)}>Copy response</button></div>}
                </div>
              </div>)}
              {busy && <div className="message-row"><div className="message-avatar">✦</div><div className="message-content"><div className="message-author">Akshay AI</div><div className="typing-indicator"><span /><span /><span /><small>Thinking…</small></div></div></div>}
              <div ref={bottomRef} />
            </div>
          )}
        </section>

        <section className="composer-section">
          {error && <div className="error-note" role="status">{error}</div>}
          <form className="composer" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
            <textarea ref={textareaRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} placeholder="Message Akshay AI..." rows={2} aria-label="Message Akshay AI" />
            <div className="composer-toolbar"><div className="composer-hints"><span className="hint-spark">✦</span><span>AI can make mistakes</span><span className="hint-separator">·</span><span>Enter to send</span></div><button className="send-button" type="submit" disabled={!input.trim() || busy} aria-label="Send message">{busy ? "…" : "↑"}</button></div>
          </form>
          <p className="disclaimer">Akshay AI can make mistakes. Verify important information. Your messages are sent to the configured AI service.</p>
        </section>
      </main>
      {authOpen && <div className="auth-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setAuthOpen(false); }}>
        <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
          <button className="auth-close" onClick={() => setAuthOpen(false)} aria-label="Close login">×</button>
          <div className="auth-brand-mark">A<span>✦</span></div>
          <p className="auth-eyebrow">WELCOME TO AKSHAY AI</p>
          <h2 id="auth-title">{authMode === "login" ? "Welcome back" : "Create your account"}</h2>
          <p className="auth-subtitle">{authMode === "login" ? "Log in to your personal AI workspace." : "Sign up to get started with Akshay AI."}</p>
          <form className="auth-form" onSubmit={submitAuth}>
            <label htmlFor="auth-email">Email address</label>
            <input id="auth-email" type="email" autoComplete="email" value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} placeholder="you@example.com" required />
            <label htmlFor="auth-password">Password</label>
            <input id="auth-password" type="password" autoComplete={authMode === "login" ? "current-password" : "new-password"} minLength={6} value={authPassword} onChange={(event) => setAuthPassword(event.target.value)} placeholder="At least 6 characters" required />
            {authMessage && <p className="auth-message" role="status">{authMessage}</p>}
            <button className="auth-submit" type="submit" disabled={authBusy}>{authBusy ? "Please wait…" : authMode === "login" ? "Log in" : "Create account"}</button>
          </form>
          <p className="auth-switch">{authMode === "login" ? "New to Akshay AI?" : "Already have an account?"} <button onClick={() => { setAuthMode(authMode === "login" ? "signup" : "login"); setAuthMessage(""); }}>{authMode === "login" ? "Sign up" : "Log in"}</button></p>
          {!supabase && <p className="auth-setup-note">Login UI is ready. Connect Supabase in Render to enable real accounts.</p>}
          <p className="auth-privacy">Your password is handled by the authentication provider, not stored by Akshay AI.</p>
        </section>
      </div>}
    </div>
  );
}