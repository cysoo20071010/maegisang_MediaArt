// Live2D 불러오기
const { Live2DModel } = PIXI.live2d;

// PIXI 앱 생성
const app = new PIXI.Application({
    view: document.getElementById("live2dCanvas"),
    autoStart: true,
    transparent: true,
    width: 600,
    height: 800
});

let model;

// Live2D 모델 로드
(async () => {
    model = await Live2DModel.from("../models/长离带水印/长离带水印模型/长离.model3.json");

    model.scale.set(0.4, 0.4);
    model.position.set(200, 450);

    app.stage.addChild(model);
})();

// 채팅 UI
document.getElementById("sendBtn").onclick = sendMessage;

async function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    input.value = "";

    addMessage(text, "user");

    const res = await fetch("https://maegisang-media-art.vercel.app/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
});


    const data = await res.json();

    let bot = data.reply;

    try {
        bot = JSON.parse(bot);
    } catch (e) {
        bot = { text: data.reply, emotion: "neutral" };
    }

    // 메시지 표시
    addMessage(bot.text, "bot");

    // 감정 따라 Live2D 모션 실행
    playEmotion(bot.emotion);
}

function addMessage(text, who) {
    const log = document.getElementById("chatLog");
    const div = document.createElement("div");
    div.className = who === "user" ? "msg-user" : "msg-bot";
    div.innerText = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}

// Live2D 감정 모션 실행
function playEmotion(emotion) {
    if (!model) return;

    const motions = {
        happy: "EXP3/脸红.exp3.json",
        angry: "EXP3/生气.exp3.json",
        shy: "EXP3/爱心眼.exp3.json",
        sad: "EXP3/黑脸.exp3.json",
        neutral: "EXP3/白眼.exp3.json"
    };

    const motionFile = motions[emotion] || motions["neutral"];

    model.motion(motionFile);
}
