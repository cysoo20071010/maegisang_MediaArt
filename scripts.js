// PIXI + Live2D
const { Live2DModel } = PIXI.live2d;

// PIXI 앱 생성
const app = new PIXI.Application({
    view: document.getElementById("live2dCanvas"),
    autoStart: true,
    backgroundAlpha: 0
});

let model;

(async () => {
    try {
        // ★ GitHub / Vercel 기준 경로: models/model/changli/model3.json
        model = await Live2DModel.from("models/model/changli/model3.json");

        // 모델 크기/위치 조정
        model.scale.set(0.4);
        model.anchor.set(0.5, 1);
        model.x = 300;
        model.y = 750;

        app.stage.addChild(model);
    } catch (e) {
        console.error("Live2D 모델 로딩 실패:", e);
    }
})();

// ----------------- 채팅 UI -----------------
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

    // 일단 테스트용 더미 응답
    addMessage("bot", "라이브2D 모델이 잘 뜨는지 먼저 확인해보자! (AI 연결 전)");
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});
