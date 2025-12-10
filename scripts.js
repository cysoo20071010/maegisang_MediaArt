// PIXI 앱 생성
const app = new PIXI.Application({
    view: document.getElementById("live2dCanvas"),
    autoStart: true,
    backgroundAlpha: 0
});

let model;

(async () => {
    // 플러그인 제대로 로드됐는지 먼저 확인
    if (!PIXI.live2d || !PIXI.live2d.Live2DModel) {
        console.error("PIXI.live2d가 없습니다. pixi-live2d-display 로딩 실패함:", PIXI.live2d);
        return;
    }

    const { Live2DModel } = PIXI.live2d;

    try {
        // ★ 실제 경로에 맞게
        model = await Live2DModel.from("models/model/changli/model3.json");

        model.scale.set(0.4);
        model.anchor.set(0.5, 1);
        model.x = 300;
        model.y = 750;

        app.stage.addChild(model);
    } catch (err) {
        console.error("Live2D 모델 로딩 실패:", err);
    }
})();
