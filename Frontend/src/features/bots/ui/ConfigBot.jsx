  import { useEffect, useState } from "react";
  import {
    FiPlus, FiTrash2, FiUpload, FiSettings,
    FiMessageSquare, FiCheckCircle, FiZap, FiUser, FiEdit3,
  } from "react-icons/fi";
  import useBot from "../hook/useBot";
  import { useSelector } from "react-redux";
  import {useNavigate} from "react-router-dom";

  const BOT_COLORS = [
    { bg: "#B2DBB840", border: "#B2DBB8", text: "#2d5c35" },
    { bg: "#f7c8a040", border: "#f7c8a0", text: "#7a3d10" },
    { bg: "#b8d4f040", border: "#b8d4f0", text: "#1a3a5c" },
    { bg: "#e0b8f040", border: "#e0b8f0", text: "#4a1a6c" },
  ];

  const DEFAULT_PROMPT = `You are a helpful and professional customer support assistant for this business.
  Your Goals:
  - Provide clear, accurate, and concise answers
  - Be polite, friendly, and respectful at all times
  - Help users solve their problems quickly
  Guidelines:
  - Only answer based on the information provided to you (FAQs, documents, or context)
  - If you don't know the answer, say you're not sure and suggest contacting human support
  - Do not make up information
  - Keep responses short and easy to understand
  - Ask follow-up questions if the user request is unclear
  Tone:
  - Friendly but professional
  - Calm and helpful
  - Avoid slang or overly casual language
  Edge cases:
  - If user is angry → stay calm and empathetic
  - If request is out of scope → politely decline
  - If sensitive topic → respond safely and suggest human support
  Always prioritize helping the user effectively.`;

  export default function ConfigureBot() {
    const [selectedBot, setSelectedBot] = useState(null);
    const [botName, setBotName] = useState("");
    const [systemPrompt, setSystemPrompt] = useState(DEFAULT_PROMPT);
    const [questions, setQuestions] = useState([{ id: 1, ques: "", ans: "" }]);
    const [pdfFile, setPdfFile] = useState(null);
    const [status, setStatus] = useState("idle");

    const navigate = useNavigate()

    const { handleCreateBot, handleGetBots } = useBot();
    const myBots = useSelector((state) => state.bot.bot ?? []);
    console.log(myBots)


    useEffect(() => {
      handleGetBots();
    }, []);

    const createBot = async () => {
      if (!botName.trim() || status !== "idle") return;
      setStatus("loading");
      try {
        await handleCreateBot({
          name: botName,
          systemPrompt,
          questions: questions.map((q) => ({
            question: q.ques,
            answer: q.ans,
          })),
        });
        setStatus("success");
        setTimeout(() => {
          setBotName("");
          setSystemPrompt(DEFAULT_PROMPT);
          setQuestions([{ id: Date.now(), ques: "", ans: "" }]);
          setPdfFile(null);
          setStatus("idle");
        }, 2200);
        navigate("/dashboard")
      } catch (err) {
        console.error(err);
        setStatus("idle");
      }
    };

    const addQuestion = () =>
      setQuestions((p) => [...p, { id: Date.now(), ques: "", ans: "" }]);

    const removeQuestion = (id) =>
      setQuestions((p) => p.filter((q) => q.id !== id));

    const updateQuestion = (id, field, value) =>
      setQuestions((p) =>
        p.map((q) => (q.id === id ? { ...q, [field]: value } : q))
      );

    const createBtnStyle = () => {
      if (status === "success")
        return { background: "#d6f0da", color: "#1a3d20", border: "1.5px solid #B2DBB8" };
      if (status === "loading")
        return { background: "#e8f5ea", color: "#2d5c35", border: "1.5px solid #B2DBB8", opacity: 0.8 };
      if (!botName.trim())
        return { background: "#f0e8e0", color: "#c9b8a8", border: "1.5px solid #e8ddd5", cursor: "not-allowed" };
      return { background: "#B2DBB8", color: "#1a3d20" };
    };

    const inp = {
      background: "#faf6f2",
      border: "1.5px solid #e8ddd5",
      color: "#2c2420",
      fontFamily: "inherit",
    };

    return (
      <div style={{ background: "#F5EEE8", fontFamily: "'DM Sans','Segoe UI',sans-serif", minHeight: "100vh", padding: 24 }}>

        {/* ✅ pulse keyframe injected once at the top of the component */}
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
        `}</style>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <span style={{ background: "#B2DBB8", color: "#2d5c35", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.07em" }}>
            Bot Studio
          </span>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#2c2420", letterSpacing: -0.3 }}>
            Configure your AI
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>

        

          {/* Panel */}
          <div style={{ background: "#fff", border: "1.5px solid #e8ddd5", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1.5px solid #e8ddd5", background: "#fdf9f6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 18, height: 18, background: "#B2DBB8", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FiSettings size={10} color="#2d5c35" />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#2c2420" }}>Configurations</span>
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                {["#f5a3a3", "#f5d3a3", "#B2DBB8"].map((c) => (
                  <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
                ))}
              </div>
            </div>

            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Name */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: "#a08070", marginBottom: 7, display: "flex", alignItems: "center", gap: 5 }}>
                  <FiUser size={11} /> Bot Name
                </div>
                <input
                  type="text" placeholder="Name your AI Bot" value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  style={{ ...inp, width: "100%", borderRadius: 10, padding: "10px 14px", fontSize: 13, outline: "none" }}
                />
              </div>

              {/* System Prompt */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: "#a08070", marginBottom: 7, display: "flex", alignItems: "center", gap: 5 }}>
                  <FiEdit3 size={11} /> System Prompt
                </div>
                <textarea
                  rows={3} placeholder="Give a command to your AI..." value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  style={{ ...inp, width: "100%", borderRadius: 10, padding: "10px 14px", fontSize: 13, outline: "none", resize: "none" }}
                />
              </div>

              {/* Q&A */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: "#a08070", display: "flex", alignItems: "center", gap: 5 }}>
                    <FiMessageSquare size={11} /> General Questions
                  </div>
                  <span style={{ fontSize: 11, color: "#a08070", fontWeight: 600 }}>{questions.length} added</span>
                </div>
                {questions.map((q, idx) => (
                  <div key={q.id} style={{ background: "#faf6f2", border: "1.5px solid #e8ddd5", borderRadius: 10, padding: 14, marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#a08070", textTransform: "uppercase", letterSpacing: "0.06em" }}>Q{idx + 1}</span>
                      {questions.length > 1 && (
                        <button onClick={() => removeQuestion(q.id)} style={{ background: "none", border: "none", color: "#c9b8a8", cursor: "pointer", fontSize: 14 }}>
                          <FiTrash2 size={13} />
                        </button>
                      )}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {[["Question", "ques", "e.g. What are your hours?"], ["Answer", "ans", "e.g. 9am – 6pm daily"]].map(([label, field, ph]) => (
                        <div key={field}>
                          <p style={{ fontSize: 11, color: "#a08070", marginBottom: 6, fontWeight: 600 }}>{label}</p>
                          <input
                            type="text" placeholder={ph} value={q[field]}
                            onChange={(e) => updateQuestion(q.id, field, e.target.value)}
                            style={{ ...inp, width: "100%", borderRadius: 8, padding: "8px 11px", fontSize: 12, outline: "none", background: "#fff" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 10 }}>
                <label style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 10, borderRadius: 10, border: "1.5px solid #e8ddd5", background: "#faf6f2", color: "#a08070", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  <FiUpload size={13} />
                  <span style={{ color: pdfFile ? "#2d5c35" : undefined }}>
                    {pdfFile ? (pdfFile.name.length > 16 ? pdfFile.name.slice(0, 14) + "…" : pdfFile.name) : "Add PDF"}
                  </span>
                  <input type="file" accept=".pdf" style={{ display: "none" }} onChange={(e) => setPdfFile(e.target.files[0])} />
                </label>
                <button
                  onClick={addQuestion}
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 10, borderRadius: 10, border: "1.5px solid #B2DBB8", background: "#f0faf1", color: "#2d5c35", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                >
                  <FiPlus size={13} /> Add Question
                </button>
              </div>

              {/* Create */}
              <button
                onClick={createBot}
                disabled={!botName.trim() || status !== "idle"}
                style={{ width: "100%", padding: 14, borderRadius: 12, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, border: "none", cursor: "pointer", fontFamily: "inherit", transition: "all .2s", ...createBtnStyle() }}
              >
                {status === "success" ? (
                  <><FiCheckCircle size={15} /> Bot created successfully!</>
                ) : status === "loading" ? (
                  <><FiZap size={15} /> Creating...</>
                ) : (
                  <><FiZap size={15} /> Create Bot</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }