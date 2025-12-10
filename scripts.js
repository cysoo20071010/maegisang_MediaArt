const app = new PIXI.Application({
    view: document.getElementById("live2dCanvas"),
    autoStart: true,
    backgroundAlpha: 0
});

(async () => {
    // ★★ 가장 중요한 부분: 모델 경로 정확히 지정 ★★
    const model = await PIXI.live2d.Live2DModel.from("models/长离.model3.json");

    model.scale.set(0.5);
    model.position.set(300, 600);

    app.stage.addChild(model);

    // 채팅 기능
    const chatLog = document.getElementById("chatLog");
    const input = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    const addMessage = (sender, message) => {
        const div = document.createElement("div");
        div.className = sender === "user" ? "msg-user" : "msg-bot";
        div.innerText = message;
        chatLog.appendChild(div);
        chatLog.scrollTop = chatLog.scrollHeight;
    };

    const sendMessage = async () => {
        const text = input.value.trim();
        if (!text) return;

        addMessage("user", text);
        input.value = "";

        // 실제 AI 연결 대신 테스트용 응답
        addMessage("bot", "아직 대답 기능 연결 전이야! 모델은 정상적으로 로드됨 ✓");
    };

    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
})();
