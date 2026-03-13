<template>
  <section
    class="relative min-h-screen py-16 px-6 md:px-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
  >
    <!-- Animated background blobs -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute -top-20 -left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-blob animation-delay-4000"
      ></div>
    </div>

    <div class="max-w-6xl mx-auto relative z-10">
      <!-- Hero header -->
      <div class="text-center mb-12 fade-up">
        <h1
          class="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
        >
          {{ t("about_title") }}
        </h1>
        <p
          class="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          {{ t("about_body") }}
        </p>
      </div>

      <!-- Profile + Info grid -->
      <div class="flex flex-col md:flex-row items-center md:items-start gap-12">
        <!-- Profile image -->
        <div class="flex-shrink-0 fade-up" style="transition-delay: 0.1s">
          <div class="relative group">
            <div
              class="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition duration-500"
            ></div>
            <div
              class="relative overflow-hidden rounded-2xl border-2 border-gray-700 shadow-lg"
            >
              <img
                src="../assets/images/profile2.jpg"
                alt="Xosilbek"
                class="w-72 h-72 object-cover transform transition duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        <!-- Info blocks -->
        <div class="flex-1 space-y-10">
          <!-- Professional Background -->
          <div
            class="bg-gray-800/70 backdrop-blur-md rounded-3xl p-8 border border-gray-700 shadow-2xl hover:shadow-3xl transition-all duration-400 fade-up"
            style="transition-delay: 0.2s"
          >
            <h2 class="text-3xl font-bold text-white mb-4 flex items-center">
              <span class="w-2 h-8 bg-blue-400 rounded-full mr-4"></span
              >Professional Background
            </h2>
            <p class="text-gray-300 leading-relaxed text-lg">
              {{ t("aboutP_p1") }}
              <span
                class="font-semibold text-blue-300 bg-blue-900/50 px-2 py-0.5 rounded"
                >Vue.js</span
              >
              &
              <span
                class="font-semibold text-blue-300 bg-blue-900/50 px-2 py-0.5 rounded"
                >JavaScript</span
              >
              {{ t("aboutP_p2") }}
              <span class="font-semibold text-purple-300">Electron.js</span> &
              <span class="font-semibold text-purple-300">Python</span>
              {{ t("aboutP_p3") }}
            </p>
          </div>

          <!-- Skills -->
          <div
            class="bg-gray-800/70 backdrop-blur-md rounded-3xl p-8 border border-gray-700 shadow-2xl hover:shadow-3xl transition-all duration-400 fade-up"
            style="transition-delay: 0.3s"
          >
            <h2 class="text-3xl font-bold text-white mb-4 flex items-center">
              <span class="w-2 h-8 bg-green-400 rounded-full mr-4"></span
              >{{ t("about_title2") }}
            </h2>
            <ul
              class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 text-lg"
            >
              <li
                class="flex items-center p-3 rounded-xl transition-all duration-300 hover:bg-gray-700/40 hover:scale-105"
              >
                <span class="w-3 h-3 bg-blue-400 rounded-full"></span>&nbsp; 🌐
                Frontend: HTML, CSS, JS, Vue.js
              </li>
              <li
                class="flex items-center p-3 rounded-xl transition-all duration-300 hover:bg-gray-700/40 hover:scale-105"
              >
                <span class="w-3 h-3 bg-green-400 rounded-full"></span>&nbsp;🖥
                Desktop: Electron, Python
              </li>
              <li
                class="flex items-center p-3 rounded-xl transition-all duration-300 hover:bg-gray-700/40 hover:scale-105"
              >
                <span class="w-3 h-3 bg-purple-400 rounded-full"></span>&nbsp;
                🛠 Tools: Git, VS Code, Figma
              </li>
              <li
                class="flex items-center p-3 rounded-xl transition-all duration-300 hover:bg-gray-700/40 hover:scale-105"
              >
                <span class="w-5 mr-1 h-3 bg-orange-400 rounded-full"></span
                >&nbsp;Soft Skills: {{ t("about2_p1") }}
              </li>
              <li
                class="flex items-center p-3 rounded-xl transition-all duration-300 hover:bg-gray-700/40 hover:scale-105"
              >
                <span class="w-5 mr-1 h-3 bg-pink-400 rounded-full"></span
                >&nbsp;Teaching: Programming (1 year), English (0.5 year) : 🎓
              </li>
            </ul>
          </div>

          <!-- Personal Info -->
          <div
            class="bg-gray-800/70 backdrop-blur-md rounded-3xl p-8 border border-gray-700 shadow-2xl hover:shadow-3xl transition-all duration-400 fade-up"
            style="transition-delay: 0.4s"
          >
            <h2 class="text-3xl font-bold text-white mb-4 flex items-center">
              <span class="w-2 h-8 bg-purple-400 rounded-full mr-4"></span
              >{{ t("about3_p1") }}
            </h2>
            <p class="text-gray-300 leading-relaxed text-lg">
              {{ t("about3_p2") }}
            </p>
          </div>

          <!-- Goals -->
          <div
            class="bg-gray-800/70 backdrop-blur-md rounded-3xl p-8 border border-gray-700 shadow-2xl hover:shadow-3xl transition-all duration-400 fade-up"
            style="transition-delay: 0.5s"
          >
            <h2 class="text-3xl font-bold text-white mb-4 flex items-center">
              <span class="w-2 h-8 bg-red-400 rounded-full mr-4"></span
              >{{ t("about4_p1") }}
            </h2>
            <p class="text-gray-300 leading-relaxed text-lg">
              Kelajakda consulting va frontend developmentni birlashtirib
              innovatsion loyihalar yaratmoqchiman. Mening maqsadim —
              foydalanuvchiga qulay, zamonaviy va sifatli web ilovalar yaratish.
              Shu bilan birga, yangi texnologiyalarni o‘rganish va o‘z
              loyihalarim orqali IT sohasida yangiliklar kiritish.
            </p>
          </div>

          <!-- Call to Action -->
          <div class="mt-8 text-center fade-up" style="transition-delay: 0.6s">
            <router-link
              :to="{ name: 'contact' }"
              class="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group text-lg"
            >
              {{ t("about4_p3") }}
              <svg
                class="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLang } from "@/components/composable/i18n";
import { onMounted } from "vue";
const { t, toggle, lang } = useLang();

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  document.querySelectorAll(".fade-up").forEach((el) => {
    observer.observe(el);
  });
});
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(40px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}
.animate-blob {
  animation: blob 8s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}

/* Fade-up animation */
.fade-up {
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.9s cubic-bezier(0.2, 0.9, 0.3, 1),
    transform 0.9s cubic-bezier(0.2, 0.9, 0.3, 1);
}
.fade-up.show {
  opacity: 1;
  transform: translateY(0);
}
</style>
