// PIXI + Live2D
const { Live2DModel } = PIXI.live2d;

// PIXI 앱 생성
const app = new PIXI.Application({
    view: document.getElementById("live2dCanvas"),
    autoStart: true,
    backgroundAlpha: 0,
    resizeTo: window
});

let model;

// Live2D 모델 로드
(async () => {
    try {
        // ★ GitHub Pages 기준 정확한 경로 (폴더 이름 영어로 되어 있어야 함)
        model = await Live2DModel.from("models/changli/model3.json");

        // 모델 크기 & 위치 조절
        model.scale.set(0.45);
        model.x = window.innerWidth * 0.25;
        model.y = window.innerHeight * 0.8;

        // 화면 중앙 정렬
        model.anchor.set(0.5, 1);

        app.stage.addChild(model);

    } catch (e) {
        console.error("Live2D 모델 로딩 실패:", e);
    }
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
