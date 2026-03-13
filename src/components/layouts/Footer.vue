<template>
  <footer
    class="relative z-10 bg-[#0a0e1a] border-t border-white/[0.06] mt-auto"
  >
    <!-- Top gradient line -->
    <div
      class="w-full h-px"
      style="
        background: linear-gradient(
          90deg,
          transparent,
          #38bdf8,
          #818cf8,
          #f472b6,
          transparent
        );
      "
    ></div>

    <div class="max-w-7xl mx-auto px-8 md:px-16 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
        <!-- ── Col 1: Logo + tavsif ── -->
        <div class="flex flex-col gap-4">
          <router-link :to="{ name: 'home' }" class="inline-block">
            <img
              src="../../assets/images/mylogo.svg"
              class="h-[60px]"
              alt="Xosilbek logo"
            />
          </router-link>
          <p class="text-slate-500 text-sm leading-relaxed max-w-[260px]">
            {{ t("footer_desc") }}
          </p>
          <!-- Status -->
          <div class="flex items-center gap-2 mt-1">
            <span
              class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
            ></span>
            <span class="text-xs text-emerald-400/80 font-mono">{{
              t("footer_available")
            }}</span>
          </div>
        </div>

        <!-- ── Col 2: Nav linklar ── -->
        <div class="flex flex-col gap-3">
          <p
            class="text-xs uppercase tracking-[0.25em] text-slate-600 font-mono mb-1"
          >
            {{ t("footer_nav_title") }}
          </p>
          <router-link
            v-for="link in navLinks"
            :key="link.name"
            :to="{ name: link.name }"
            class="text-slate-400 text-sm hover:text-white transition-colors duration-200 w-fit group flex items-center gap-2"
          >
            <span
              class="w-0 group-hover:w-3 h-px bg-sky-400 transition-all duration-300"
            ></span>
            {{ t(link.key) }}
          </router-link>
        </div>

        <!-- ── Col 3: Ijtimoiy tarmoqlar ── -->
        <div class="flex flex-col gap-4">
          <p
            class="text-xs uppercase tracking-[0.25em] text-slate-600 font-mono mb-1"
          >
            {{ t("footer_social_title") }}
          </p>
          <div class="flex flex-col gap-3">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              target="_blank"
              class="group flex items-center gap-3 w-fit"
            >
              <div
                class="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                :style="{
                  background: social.color + '15',
                  border: `1px solid ${social.color}25`,
                }"
              >
                <span class="text-base">{{ social.icon }}</span>
              </div>
              <div>
                <p
                  class="text-sm text-slate-300 group-hover:text-white transition-colors duration-200"
                >
                  {{ social.label }}
                </p>
                <p class="text-xs text-slate-600">{{ social.handle }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- ── Bottom bar ── -->
      <div
        class="mt-10 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <p class="text-xs text-slate-600 font-mono">
          © {{ currentYear }}
          <span class="text-slate-500">Xosilbek Turdiyev</span>.
          {{ t("footer_rights") }}
        </p>
        <p class="text-xs text-slate-700 font-mono flex items-center gap-1.5">
          {{ t("footer_made_with") }}
          <span class="text-rose-400">♥</span>
          Vue.js + Tailwind CSS
        </p>
      </div>
    </div>

    <!-- Scroll to top -->
    <Transition name="fade-up">
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:brightness-110 shadow-lg"
        style="
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          box-shadow: 0 4px 20px rgba(56, 189, 248, 0.3);
        "
      >
        <span class="text-white text-lg">↑</span>
      </button>
    </Transition>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useLang } from "@/components/composable/i18n";

const { t } = useLang();

const currentYear = computed(() => new Date().getFullYear());

const showScrollTop = ref(false);
function onScroll() {
  showScrollTop.value = window.scrollY > 400;
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => window.removeEventListener("scroll", onScroll));

const navLinks = [
  { key: "homeLink", name: "home" },
  { key: "aboutLink", name: "about" },
  { key: "skillsLink", name: "skills" },
  { key: "projectsLink", name: "projects" },
  { key: "servicesLink", name: "services" },
  { key: "contactLink", name: "contact" },
];

const socials = [
  {
    icon: "✈️",
    label: "Telegram",
    handle: "@Xosilbek_Web",
    href: "https://t.me/Xosilbek_Web",
    color: "#38BDF8",
  },
  {
    icon: "📸",
    label: "Instagram",
    handle: "@xosilbek_web_developer",
    href: "https://instagram.com/xosilbek_dev",
    color: "#F472B6",
  },
  {
    icon: "🐙",
    label: "GitHub",
    handle: "Xozircha yoq",
    href: "",
    color: "#818CF8",
  },
];
</script>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
