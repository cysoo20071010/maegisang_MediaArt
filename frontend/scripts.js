// 기본 Three.js 세팅
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);

// 카메라 위치
camera.position.set(0, 1.5, 3);

// 조명
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 3, 2);
scene.add(light);

// glTF 로더
const loader = new THREE.GLTFLoader();
let character;

loader.load("./models/character.gltf", (gltf) => {
  character = gltf.scene;
  scene.add(character);
});

// 렌더링 루프
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chat");

  const text = input.value;
  input.value = "";

  chatBox.innerHTML += `<div class='msg user'>${text}</div>`;

  const res = await fetch("https://YOUR-SERVER-DOMAIN/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();
  chatBox.innerHTML += `<div class='msg bot'>${data.reply}</div>`;
}

document.getElementById("sendBtn").onclick = sendMessage;
