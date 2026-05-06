(function(){

  // piece 1
  const script = document.currentScript
  const embedToken = script.getAttribute("data-token")
  if(!embedToken){
    console.error("Widget: no data-token found")
    return
  }

  // piece 2 - inject styles
  const style = document.createElement("style")
  style.innerHTML = `
  :root {
    --ai-primary: #6366f1;
    --ai-bg: #0f172a;
    --ai-panel: rgba(255,255,255,0.85);
    --ai-border: rgba(0,0,0,0.08);
  }

  #ai-bubble {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    font-size: 22px;
    border: none;
    cursor: pointer;
    z-index: 9999;
    box-shadow: 0 10px 25px rgba(99,102,241,0.4);
    transition: transform 0.2s ease;
  }

  #ai-bubble:hover {
    transform: scale(1.08);
  }

  #ai-chatbox {
    display: none;
    position: fixed;
    bottom: 95px;
    right: 24px;
    width: 360px;
    height: 520px;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    border: 1px solid var(--ai-border);
    border-radius: 18px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.25);
    z-index: 9999;
    flex-direction: column;
    overflow: hidden;
    animation: popIn 0.2s ease;
  }

  @keyframes popIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  #ai-messages {
    flex: 1;
    overflow-y: auto;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: linear-gradient(to bottom, #f9fafb, #ffffff);
  }

  #ai-input-area {
    display: flex;
    padding: 10px;
    border-top: 1px solid var(--ai-border);
    background: white;
    gap: 8px;
  }

  #ai-input {
    flex: 1;
    padding: 10px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    outline: none;
    font-size: 14px;
  }

  #ai-input:focus {
    border-color: var(--ai-primary);
    box-shadow: 0 0 0 2px rgba(99,102,241,0.15);
  }

  #ai-send {
    padding: 10px 14px;
    background: var(--ai-primary);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 500;
    transition: 0.2s;
  }

  #ai-send:hover {
    background: #4f46e5;
  }

  .ai-msg-human {
    align-self: flex-end;
    background: var(--ai-primary);
    color: white;
    padding: 10px 12px;
    border-radius: 14px 14px 4px 14px;
    max-width: 80%;
    font-size: 14px;
    line-height: 1.4;
  }

  .ai-msg-ai {
    align-self: flex-start;
    background: #f3f4f6;
    color: #111827;
    padding: 10px 12px;
    border-radius: 14px 14px 14px 4px;
    max-width: 80%;
    font-size: 14px;
    line-height: 1.4;
  }

  .ai-typing {
    font-size: 13px;
    color: #6b7280;
    font-style: italic;
  }
    #name {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.2px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  margin: 0;
  padding: 10px 14px;

  display: flex;
  align-items: center;

  position: sticky;
  top: 0;

  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);

  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  z-index: 10;
}
  .dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  margin-right: 8px;
  box-shadow: 0 0 8px rgba(34,197,94,0.6);
}
`
  document.head.appendChild(style)

  // inject HTML
  const container = document.createElement("div")
  container.innerHTML = `
 
    <button id="ai-bubble">💬</button>
    <div id="ai-chatbox">
     <h1 id="name"><span class="dot"></span> Assistly</h1>
      <div id="ai-messages"></div>
      <div id="ai-input-area">
        <input id="ai-input" placeholder="Type a message..." />
        <button id="ai-send">Send</button>
      </div>
    </div>
  `

  document.body.appendChild(container)

  // toggle open/close chatbox
  const bubble = document.getElementById("ai-bubble")
  const chatbox = document.getElementById("ai-chatbox")

  bubble.addEventListener("click", () => {
    if(chatbox.style.display === "flex"){
      chatbox.style.display = "none"
    } else {
      chatbox.style.display = "flex"
    }
  })

  // piece 3 - session management
  let sessionId = localStorage.getItem("ai_session_" + embedToken)

  // helper to add message to UI
  const addMessage = (content, role) => {
    const messages = document.getElementById("ai-messages")
    const msg = document.createElement("div")
    msg.classList.add(role === "human" ? "ai-msg-human" : "ai-msg-ai")
    msg.innerText = content
    messages.appendChild(msg)
    // auto scroll to bottom
    messages.scrollTop = messages.scrollHeight
  }

  // init session if first time
  const initSession = async () => {
    const res = await fetch("http://localhost:3000/api/chat/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embedToken })
    })
    const data = await res.json()
    sessionId = data.data.sessionId
    localStorage.setItem("ai_session_" + embedToken, sessionId)
  }

  // send message
  const sendMessage = async () => {
    const input = document.getElementById("ai-input")
    const userMessage = input.value.trim()

    // stop if empty
    if(!userMessage) return

    // show user message in UI
    addMessage(userMessage, "human")
    input.value = ""

    // show loading
    addMessage("typing...", "ai")

    // init session if first message
    if(!sessionId){
      await initSession()
    }

    // call backend
    const res = await fetch("http://localhost:3000/api/chat/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, message: userMessage })
    })
    const data = await res.json()

    // remove loading message
    const messages = document.getElementById("ai-messages")
    messages.removeChild(messages.lastChild)

    // show AI response
    addMessage(data.data.aiResponse, "ai")
  }

  // send on button click
  document.getElementById("ai-send").addEventListener("click", sendMessage)

  // send on enter key
  document.getElementById("ai-input").addEventListener("keypress", (e) => {
    if(e.key === "Enter") sendMessage()
  })

})()