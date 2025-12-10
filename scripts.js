const { Live2DModel } = PIXI.live2d;

const app = new PIXI.Application({
    view: document.getElementById("live2dCanvas"),
    autoStart: true,
    backgroundAlpha: 0
});

(async () => {
    const model = await Live2DModel.from("models/model\\ changli/model3.json");
    model.scale.set(0.4);
    model.anchor.set(0.5, 1);
    model.x = 300;
    model.y = 750;
    app.stage.addChild(model);
})();


// --------------------
//  채팅 UI 기능
// --------------------

const chatLog = document.getElementById("chatLog");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(type, text) {
    const div = document.createElement("div");
    div.className = type === "user" ? "msg-user" : "msg-bot";
    div.innerText = text;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
}

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    input.value = "";

    // ---------------------------
    //  API 연동 전 임시 응답
    // ---------------------------
    addMessage("bot", "모델은 정상적으로 로드되었어요! ✓\nAI 연결은 아직이에요.");

    // 이후 API 연결 시:
    // const res = await fetch("https://YOUR-API/chat", ...)
    // addMessage("bot", data.reply);
}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});
