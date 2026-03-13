<template>
  <div class="hero-container">
    <canvas ref="canvasRef" class="hero-canvas"></canvas>

    <div
      class="hero-content w-[90%] lg:w-[83%] mx-auto flex flex-col lg:flex-row items-center gap-10 py-20"
    >
      <!-- LEFT -->
      <div class="main-details flex flex-col justify-start w-full lg:w-[50%]">
        <h1 class="text-4xl md:text-6xl mb-8 font-bold text-justify anim-item" style="--d:0.1s">
          {{ t("heroTitle1") }} <br />
          <span class="text-purple-500 whitespace-nowrap">
            {{ t("heroTitle2") }} <br />
          </span>
          {{ t("heroTitle3") }}<br />
        </h1>

        <p class="text-justify mb-8 text-gray-300 font-bold anim-item" style="--d:0.25s">
          {{ t("heroDesc") }}
        </p>

        <div class="btns flex gap-4 mb-14 anim-item" style="--d:0.4s">
          <router-link :to="{ name: 'projects' }">
            <button
              class="transition-all duration-300 ease-in-out border-2 border-[#1EC8FF] bg-[#1EC8FF] text-white px-7 py-4 rounded-xl hover:bg-transparent hover:text-[#1EC8FF] font-bold hover:scale-105"
            >
              {{ t("heroBtn1") }}
            </button>
          </router-link>
          <router-link :to="{ name: 'contact' }">
            <button
              class="transition-all font-bold duration-300 ease-in-out border-2 border-[#1EC8FF] bg-transparent text-[#1EC8FF] px-7 py-4 rounded-xl hover:bg-[#1EC8FF] hover:text-white hover:scale-105"
            >
              {{ t("heroBtn2") }}
            </button>
          </router-link>
        </div>

        <div class="etc flex gap-6 sm:gap-14 items-stretch w-full">
          <div
            class="flex-1 min-h-[120px] border border-[#1EC8FF] rounded-xl py-4 sm:py-5 lg:py-6 backdrop-uchun text-center flex flex-col justify-center anim-item hover:scale-105 transition-transform duration-300 cursor-default"
            style="--d:0.55s"
          >
            <h2 class="text-[28px] sm:text-[34px] lg:text-[40px] font-black text-[#00d9ff]">1.5 +</h2>
            <p class="text-[#b7c1d3] font-bold text-sm sm:text-base">{{ t("hero_content1") }}</p>
          </div>

          <div
            class="flex-1 min-h-[120px] border border-[#1EC8FF] rounded-xl py-4 sm:py-5 lg:py-6 backdrop-uchun text-center flex flex-col justify-center anim-item hover:scale-105 transition-transform duration-300 cursor-default"
            style="--d:0.65s"
          >
            <h2 class="text-[28px] sm:text-[34px] lg:text-[40px] font-black text-[#00d9ff]">27 +</h2>
            <p class="text-[#b7c1d3] font-bold text-sm sm:text-base">{{ t("hero_content2") }}</p>
          </div>

          <div
            class="flex-1 min-h-[120px] border border-[#1EC8FF] rounded-xl py-4 sm:py-5 lg:py-6 backdrop-uchun text-center flex flex-col justify-center anim-item hover:scale-105 transition-transform duration-300 cursor-default"
            style="--d:0.75s"
          >
            <h2 class="text-[28px] sm:text-[34px] lg:text-[40px] font-black text-[#00d9ff]">99%</h2>
            <p class="text-[#b7c1d3] font-bold text-sm sm:text-base">{{ t("hero_content3") }}</p>
          </div>
        </div>
      </div>

      <!-- RIGHT: Code card -->
      <div
        class="flex justify-center w-full lg:w-[50%] min-h-[280px] sm:h-[320px] lg:h-[350px] border-[#1EC8FF] border rounded-2xl anim-right"
      >
        <div class="bg-gray-700/35 backdrop-blur-xl border border-none rounded-2xl p-6 w-full">
          <div class="flex gap-2 mb-4">
            <span class="w-4 h-4 bg-red-500 rounded-full"></span>
            <span class="w-4 h-4 bg-yellow-500 rounded-full"></span>
            <span class="w-4 h-4 bg-green-500 rounded-full"></span>
          </div>

          <div class="p-4 text-justify">
            <p class="text-[#00d9ff] text-[20px] mb-3 code-line" style="--cl:0.5s">
              <span class="text-red-300">const</span> {{ t("card_dev") }} = {
            </p>
            <p class="text-[20px] mb-3 code-line" style="--cl:0.7s">
              Name: <span class="ml-3 text-[#00ff88]">{{ t("card_name") }}</span>
            </p>
            <p class="text-[20px] mb-3 code-line" style="--cl:0.9s">
              Skills: <span class="ml-3 text-[#00ff88]">{{ t("card_skills") }}</span>
            </p>
            <p class="text-[20px] mb-3 code-line" style="--cl:1.1s">
              Passion: <span class="ml-3 text-[#00ff88]">{{ t("card_title") }}</span>
            </p>
            <p class="text-[20px] mb-3 code-line" style="--cl:1.3s">};</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useLang } from "@/components/composable/i18n";
const { t } = useLang();

const props = defineProps({
  speed:     { type: Number, default: 1.0  },
  lineCount: { type: Number, default: 10   },
  amplitude: { type: Number, default: 0.15 },
  yOffset:   { type: Number, default: 0.15 },
});

const canvasRef = ref(null);
let gl = null, program = null, animationFrame = null;
let startTime = Date.now(), uniforms = {};

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() { gl_Position = vec4(a_position, 0, 1); }
`;
const fragmentShaderSource = `
  precision mediump float;
  uniform vec2 iResolution;
  uniform float iTime, uSpeed, uLineCount, uAmplitude, uYOffset;
  const float MAX_LINES = 20.0;
  float wave(vec2 uv, float speed, float yPos, float thickness, float softness) {
    float falloff = smoothstep(1., 0.5, abs(uv.x));
    float y = falloff * sin(iTime * speed + uv.x * 10.0) * yPos - uYOffset;
    return 1.0 - smoothstep(thickness, thickness + softness, abs(uv.y - y));
  }
  void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.y;
    vec4 col = vec4(0.0, 0.0, 0.0, 1.0);
    vec3 gradCol1 = vec3(0.2, 0.1, 0.0), gradCol2 = vec3(0.2, 0.0, 0.2);
    col.xyz = mix(gradCol1, gradCol2, uv.x + uv.y);
    uv -= 0.5;
    const vec3 col1 = vec3(0.2, 0.5, 0.9), col2 = vec3(0.9, 0.3, 0.9);
    float aaDy = iResolution.y * 0.000005;
    for (float i = 0.; i < MAX_LINES; i += 1.) {
      if (i <= uLineCount) {
        float t = i / (uLineCount - 1.0);
        vec3 lineCol = mix(col1, col2, t);
        float bokeh = pow(t, 3.0), thickness = 0.003;
        float softness = aaDy + bokeh * 0.2;
        float amt = max(0.0, pow(1.0 - bokeh, 2.0) * 0.9);
        col.xyz += wave(uv, uSpeed * (1.0 + t), uAmplitude, thickness, softness) * lineCol * amt;
      }
    }
    gl_FragColor = col;
  }
`;

function initWebGL() {
  const canvas = canvasRef.value;
  gl = canvas.getContext("webgl");
  if (!gl) return;
  const vs = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vs, vertexShaderSource); gl.compileShader(vs);
  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fs, fragmentShaderSource); gl.compileShader(fs);
  program = gl.createProgram();
  gl.attachShader(program, vs); gl.attachShader(program, fs);
  gl.linkProgram(program); gl.useProgram(program);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
  uniforms = {
    iResolution: gl.getUniformLocation(program, "iResolution"),
    iTime:       gl.getUniformLocation(program, "iTime"),
    uSpeed:      gl.getUniformLocation(program, "uSpeed"),
    uLineCount:  gl.getUniformLocation(program, "uLineCount"),
    uAmplitude:  gl.getUniformLocation(program, "uAmplitude"),
    uYOffset:    gl.getUniformLocation(program, "uYOffset"),
  };
}

function resize() {
  const canvas = canvasRef.value;
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w; canvas.height = h;
    gl.viewport(0, 0, w, h);
  }
}

function render() {
  const elapsed = (Date.now() - startTime) / 1000;
  gl.uniform2f(uniforms.iResolution, gl.canvas.width, gl.canvas.height);
  gl.uniform1f(uniforms.iTime,      elapsed);
  gl.uniform1f(uniforms.uSpeed,     props.speed);
  gl.uniform1f(uniforms.uLineCount, props.lineCount);
  gl.uniform1f(uniforms.uAmplitude, props.amplitude);
  gl.uniform1f(uniforms.uYOffset,   props.yOffset);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  animationFrame = requestAnimationFrame(render);
}

onMounted(() => {
  initWebGL(); resize(); render();
  window.addEventListener("resize", resize);
});
onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame);
  window.removeEventListener("resize", resize);
});
</script>

<style scoped>
.backdrop-uchun {
  backdrop-filter: blur(150px);
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
}
.hero-container {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 64px);
  overflow: hidden;
}
.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.hero-content {
  backdrop-filter: blur(3px);
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
}

/* ── Chap tomon — pastdan yuqoriga ── */
.anim-item {
  opacity: 0;
  transform: translateY(40px);
  animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--d, 0s);
}
@keyframes slideUp {
  to { opacity: 1; transform: translateY(0); }
}

/* ── O'ng tomon (kod karta) — o'ngdan kiradi ── */
.anim-right {
  opacity: 0;
  transform: translateX(60px);
  animation: slideRight 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: 0.3s;
}
@keyframes slideRight {
  to { opacity: 1; transform: translateX(0); }
}

/* ── Kod satrlari — birma-bir fade in ── */
.code-line {
  opacity: 0;
  transform: translateX(-12px);
  animation: codeFade 0.5s ease forwards;
  animation-delay: var(--cl, 0s);
}
@keyframes codeFade {
  to { opacity: 1; transform: translateX(0); }
}
</style>