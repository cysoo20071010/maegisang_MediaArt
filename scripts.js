// PIXI + Live2D
const { Live2DModel } = PIXI.live2d;

// PIXI 앱 생성
const app = new PIXI.Application({
    view: document.getElementById("live2dCanvas"),
    autoStart: true,
    backgroundAlpha: 0
});

let model;

// Live2D 모델 로드
(async () => {
    try {
        // ★ 실제 경로: models/model/changli/model3.json
        model = await Live2DModel.from("models/model/changli/model3.json");

        // 크기 / 위치 조정
        model.scale.set(0.4);
        model.anchor.set(0.5, 1);   // 아래 중앙 기준
        model.x = 300;
        model.y = 750;

        app.stage.addChild(model);
    } catch (err) {
        console.error("Live2D 모델 로딩 실패:", err);
    }
})();

// -------------------------
//   채팅 UI
// -------------------------
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

    // TODO: 나중에 여기서 백엔드 API 호출
    // const res = await fetch("https://maegisang-media-art.vercel.app/chat", {...});
    // const data = await res.json();
    // addMessage("bot", data.reply);

    addMessage("bot", "일단 모델이 잘 나오는지부터 확인하자! (AI 연결 전)");
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});
