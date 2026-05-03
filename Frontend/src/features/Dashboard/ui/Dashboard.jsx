import { useEffect } from "react";
import { useState } from "react";
import { FiSettings, FiCopy, FiCheck, FiCode } from "react-icons/fi";
import useBot from "../../bots/hook/useBot";
import { useSelector } from "react-redux";

const COLORS = {
  bg: "#F5EEE8",
  card: "#fff",
  border: "#e8ddd5",
  green: "#B2DBB8",
  text: "#2c2420",
  sub: "#a08070",
};

export default function Dashboard() {
  const [copied, setCopied] = useState(false);

  const {handleGetBots} = useBot()
  useEffect(()=>{
    handleGetBots()
  }, [])

 

  const embedToken = useSelector((state) => state.bot.bot).map((bot)=>{
  return bot.embedToken
 })
  const snippetCode = `<script src="http://localhost:3000/widget.js" data-token="${embedToken}"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [tickets] = useState([
    { id: 1, issue: "Bot failed to answer refund policy", status: "Open", priority: "High", time: "2 mins ago" },
    { id: 2, issue: "Unknown question about pricing tiers", status: "In Progress", priority: "Medium", time: "10 mins ago" },
    { id: 3, issue: "Human support request not handled", status: "Resolved", priority: "Low", time: "1 hour ago" },
  ]);

  const [conversations] = useState([
    { id: 1, initials: "JD", name: "John Doe", preview: "How do I reset my password?", time: "2m ago", color: "#e6f1fb", textColor: "#185fa5" },
    { id: 2, initials: "SR", name: "Sara R.", preview: "What's your refund policy?", time: "15m ago", color: "#e1f5ee", textColor: "#0f6e56" },
    { id: 3, initials: "MK", name: "Mike K.", preview: "Can I upgrade my plan mid-month?", time: "1h ago", color: "#faeeda", textColor: "#854f0b" },
  ]);

  const unanswered = [
    "Do you offer enterprise plans?",
    "How long does shipping take?",
    "Can I cancel anytime?",
  ];

  const statCards = [
    { label: "Conversations", value: 128, color: "#e1f5ee", iconColor: "#0f6e56",
      icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> },
    { label: "Messages", value: "8,430", color: "#e6f1fb", iconColor: "#185fa5",
      icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></> },
    { label: "Unanswered", value: 12, color: "#fcebeb", iconColor: "#a32d2d",
      icon: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></> },
    { label: "Q&A", value: 34, color: "#eaf3de", iconColor: "#3b6d11",
      icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></> },
    { label: "Tickets", value: 5, color: "#faeeda", iconColor: "#854f0b",
      icon: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></> },
  ];

  const ticketStyle = {
    Open:          { dot: "#e24b4a", badge: { background: "#fcebeb", color: "#a32d2d" } },
    "In Progress": { dot: "#ef9f27", badge: { background: "#faeeda", color: "#854f0b" } },
    Resolved:      { dot: "#1d9e75", badge: { background: "#e1f5ee", color: "#0f6e56" } },
  };

  const priorityStyle = {
    High:   { background: "#fcebeb", color: "#a32d2d" },
    Medium: { background: "#faeeda", color: "#854f0b" },
    Low:    { background: "#e1f5ee", color: "#0f6e56" },
  };

  const card = {
    background: COLORS.card,
    border: `1.5px solid ${COLORS.border}`,
    borderRadius: 16,
    padding: 16,
  };

  const sectionTitle = {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: COLORS.sub,
    marginBottom: 14,
  };

  const mkBadge = (style) => ({
    display: "inline-flex",
    alignItems: "center",
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 20,
    whiteSpace: "nowrap",
    ...style,
  });


  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", padding: "20px 16px", fontFamily: "'DM Sans','Segoe UI',sans-serif", color: COLORS.text }}>
      <style>{`
        /* ── stat row ── */
        .dash-stats {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin-bottom: 14px;
        }

        /* ── bento grid: 12 equal columns ── */
        .bento {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: auto;
          gap: 14px;
        }

        /* column spans */
        .b-conv      { grid-column: span 5; }
        .b-tickets   { grid-column: span 7; }
        .b-bot       { grid-column: span 4; }
        .b-embed     { grid-column: span 5; }
        .b-unans     { grid-column: span 3; }

        /* tablet  */
        @media (max-width: 960px) {
          .dash-stats          { grid-template-columns: repeat(3, 1fr); }
          .b-conv,
          .b-tickets           { grid-column: span 12; }
          .b-bot               { grid-column: span 5; }
          .b-embed             { grid-column: span 7; }
          .b-unans             { grid-column: span 12; }
        }

        /* mobile  */
        @media (max-width: 600px) {
          .dash-stats          { grid-template-columns: repeat(2, 1fr); }
          .b-conv,
          .b-tickets,
          .b-bot,
          .b-embed,
          .b-unans             { grid-column: span 12; }
          .ticket-row-inner    { flex-wrap: wrap; gap: 6px; }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 3 }}>Dashboard</h1>
        <p style={{ fontSize: 13, color: COLORS.sub }}>Monitor AI performance & support tickets</p>
      </div>

      {/* ── Stat row ── */}
      <div className="dash-stats">
        {statCards.map((s, i) => (
          <div key={i} style={{ background: COLORS.card, border: `1.5px solid ${COLORS.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: s.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" fill="none" stroke={s.iconColor} strokeWidth="1.8" viewBox="0 0 24 24">{s.icon}</svg>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 12, color: COLORS.sub, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1 }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bento grid ── */}
      <div className="bento">

        {/* 1 — Conversations  (5 cols) */}
        <div className="b-conv" style={card}>
          <p style={sectionTitle}>Recent Conversations</p>
          {conversations.map((c) => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: c.color, color: c.textColor, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {c.initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: COLORS.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.preview}</div>
              </div>
              <div style={{ fontSize: 11, color: COLORS.sub, flexShrink: 0 }}>{c.time}</div>
            </div>
          ))}
        </div>

        {/* 2 — Tickets  (7 cols) */}
        <div className="b-tickets" style={card}>
          <p style={sectionTitle}>Support Tickets</p>
          {tickets.map((t) => {
            const ts = ticketStyle[t.status];
            return (
              <div key={t.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: ts.dot, marginTop: 5, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.issue}</div>
                  <div className="ticket-row-inner" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={mkBadge(priorityStyle[t.priority])}>{t.priority}</span>
                    <span style={{ fontSize: 11, color: COLORS.sub }}>{t.time}</span>
                    <span style={mkBadge(ts.badge)}>{t.status}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 — Bot status  (4 cols) */}
        <div className="b-bot" style={card}>
          <p style={sectionTitle}>Bot Status</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Support Bot</div>
              <div style={{ fontSize: 12, color: COLORS.sub }}>Active</div>
            </div>
            <div style={{ width: 36, height: 20, background: COLORS.green, borderRadius: 20, position: "relative", cursor: "pointer" }}>
              <div style={{ width: 14, height: 14, background: "#fff", borderRadius: "50%", position: "absolute", top: 3, right: 4 }} />
            </div>
          </div>
          {[
            { label: "Response rate", value: 91, fill: "#B2DBB8" },
            { label: "Satisfaction",  value: 78, fill: "#b8d4f0" },
          ].map((bar) => (
            <div key={bar.label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.sub, marginBottom: 5 }}>
                <span>{bar.label}</span>
                <span style={{ color: COLORS.text, fontWeight: 600 }}>{bar.value}%</span>
              </div>
              <div style={{ height: 5, background: "#f0e8e0", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${bar.value}%`, height: "100%", background: bar.fill, borderRadius: 4 }} />
              </div>
            </div>
          ))}
          <button style={{ width: "100%", padding: 10, borderRadius: 10, border: `1.5px solid ${COLORS.border}`, background: COLORS.card, color: COLORS.text, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <FiSettings size={12} /> Configure Bot
          </button>
        </div>

        {/* 4 — Embed snippet  (5 cols) */}
        <div className="b-embed" style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: 7, background: "#e1f5ee", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FiCode size={12} color="#0f6e56" />
            </div>
            <p style={{ ...sectionTitle, marginBottom: 0 }}>Embed your bot</p>
          </div>
          <p style={{ fontSize: 12, color: COLORS.sub, marginBottom: 10 }}>
            Paste before the closing{" "}
            <code style={{ background: COLORS.bg, padding: "1px 6px", borderRadius: 5, fontSize: 11, color: COLORS.text }}>&lt;/body&gt;</code>{" "}
            tag.
          </p>
          <div style={{ position: "relative", background: "#1e1e2e", borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
            <pre style={{ margin: 0, fontSize: 11, color: "#a6e3a1", fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", lineHeight: 1.6 }}>
              {`<script\n  src="http://localhost:3000/widget.js"\n  data-token="${embedToken}"\n></script>`}
            </pre>
            <button
              onClick={handleCopy}
              style={{ position: "absolute", top: 8, right: 8, background: copied ? "#e1f5ee" : "#2a2a3e", border: "none", borderRadius: 7, padding: "5px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: copied ? "#0f6e56" : "#888", fontSize: 11, fontWeight: 600, fontFamily: "inherit", transition: "all .2s" }}
            >
              {copied ? <FiCheck size={11} /> : <FiCopy size={11} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: COLORS.bg, borderRadius: 10, padding: "9px 12px" }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: COLORS.sub, marginBottom: 2 }}>Token</div>
              <div style={{ fontSize: 12, fontFamily: "monospace", color: COLORS.text }}>{embedToken.slice(0, 18)}•••</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: "#e1f5ee", color: "#0f6e56" }}>Active</span>
          </div>
        </div>

        {/* 5 — Top unanswered  (3 cols) */}
        <div className="b-unans" style={card}>
          <p style={sectionTitle}>Top Unanswered</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {unanswered.map((q, i) => (
              <div key={i} style={{ fontSize: 12, padding: "9px 12px", background: COLORS.bg, borderRadius: 10, color: COLORS.text }}>
                "{q}"
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
} 