<template>
  <ul :class="isMobile ? 'flex flex-col gap-3 w-full' : 'flex gap-8'">
    <li
      v-for="(link, index) in links"
      :key="index"
      class="nav-link-item"
      :style="{ '--i': index }"
    >
      <!-- DESKTOP -->
      <router-link
        v-if="!isMobile"
        :to="{ name: link.name }"
        class="desktop-link relative py-2 text-[17px] font-medium flex items-center gap-1.5"
        :class="$route.name === link.name ? 'is-active' : ''"
      >
        <span class="link-text">{{ t(link.key) }}</span>
      </router-link>

      <!-- MOBILE CARD -->
      <router-link
        v-else
        :to="{ name: link.name }"
        class="mobile-card flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl transition-all duration-300"
        :class="$route.name === link.name ? 'mobile-active' : ''"
      >
        <span class="mobile-text">{{ t(link.key) }}</span>
        <span class="ml-auto mobile-arrow">→</span>
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { useLang } from "@/components/composable/i18n"
import { useRoute } from "vue-router"

const { t } = useLang()
const $route = useRoute()

defineProps({
  isMobile: { type: Boolean, default: false }
})

const links = [
  { key: "homeLink",     name: "home"     },
  { key: "aboutLink",    name: "about"    },
  { key: "skillsLink",   name: "skills"   },
  { key: "projectsLink", name: "projects" },
  { key: "servicesLink", name: "services" },
]
</script>

<style scoped>
/* ── Entry animation ── */
.nav-link-item {
  opacity: 0;
  transform: translateY(-14px);
  animation: dropIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(0.15s + var(--i) * 0.07s);
}
@keyframes dropIn {
  to { opacity: 1; transform: translateY(0); }
}

/* ══════════════════════════
   DESKTOP
══════════════════════════ */
.desktop-link {
  color: #9ca8bc;
  text-decoration: none;
  transition: color 0.3s;
}

/* Hover — gradient matn */
.desktop-link:hover .link-text,
.desktop-link.is-active .link-text {
  background: linear-gradient(90deg, #38BDF8, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.desktop-link:hover .num,
.desktop-link.is-active .num {
  color: #38BDF8;
  opacity: 0.7;
}

/* Active — pastida chiziq */
.desktop-link.is-active .link-text::after {
  content: '';
  display: block;
  height: 2px;
  background: linear-gradient(90deg, #38BDF8, #818cf8);
  border-radius: 999px;
  margin-top: 2px;
  animation: lineGrow 0.3s ease forwards;
}
@keyframes lineGrow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.num {
  font-size: 11px;
  font-family: monospace;
  color: #38BDF8;
  opacity: 0.3;
  transition: opacity 0.3s, color 0.3s;
}

.link-text {
  position: relative;
  transition: all 0.3s;
}

/* ══════════════════════════
   MOBILE CARD
══════════════════════════ */
.mobile-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #9ca8bc;
  text-decoration: none;
}

.mobile-card:hover {
  background: rgba(56, 189, 248, 0.08);
  border-color: rgba(56, 189, 248, 0.25);
  transform: translateX(4px);
}

.mobile-card:hover .mobile-num {
  color: #38BDF8;
}

.mobile-card:hover .mobile-text {
  background: linear-gradient(90deg, #38BDF8, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.mobile-card:hover .mobile-arrow {
  color: #38BDF8;
  transform: translateX(4px);
}

/* Active mobile */
.mobile-active {
  background: rgba(56, 189, 248, 0.1);
  border-color: rgba(56, 189, 248, 0.3);
}

.mobile-active .mobile-num {
  color: #38BDF8;
}

.mobile-active .mobile-text {
  background: linear-gradient(90deg, #38BDF8, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.mobile-active .mobile-arrow {
  color: #38BDF8;
}

.mobile-num {
  font-size: 11px;
  font-family: monospace;
  color: rgba(56, 189, 248, 0.3);
  min-width: 24px;
  transition: color 0.3s;
}

.mobile-text {
  font-size: 16px;
  font-weight: 500;
  color: #9ca8bc;
  transition: all 0.3s;
}

.mobile-arrow {
  font-size: 14px;
  color: rgba(255,255,255,0.2);
  transition: all 0.3s;
}
</style>