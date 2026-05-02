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
    #ai-bubble {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #6366f1;
      color: white;
      font-size: 24px;
      border: none;
      cursor: pointer;
      z-index: 9999;
    }

    #ai-chatbox {
      display: none;
      position: fixed;
      bottom: 90px;
      right: 24px;
      width: 320px;
      height: 420px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.15);
      z-index: 9999;
      flex-direction: column;
    }

    #ai-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    #ai-input-area {
      display: flex;
      padding: 8px;
      border-top: 1px solid #eee;
      gap: 8px;
    }

    #ai-input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 8px;
      outline: none;
    }

    #ai-send {
      padding: 8px 12px;
      background: #6366f1;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    .ai-msg-human {
      align-self: flex-end;
      background: #6366f1;
      color: white;
      padding: 8px 12px;
      border-radius: 12px;
      max-width: 80%;
    }

    .ai-msg-ai {
      align-self: flex-start;
      background: #f3f4f6;
      color: black;
      padding: 8px 12px;
      border-radius: 12px;
      max-width: 80%;
    }
  `
  document.head.appendChild(style)

  // inject HTML
  const container = document.createElement("div")
  container.innerHTML = `
    <button id="ai-bubble">💬</button>
    <div id="ai-chatbox">
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