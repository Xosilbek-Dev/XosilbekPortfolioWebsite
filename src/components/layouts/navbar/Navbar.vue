<template>
  <!-- NAVBAR -->
  <div
    class="navbar bg-[#0a0e1a] h-24 border-b-[2px] border-[#2a3550] fixed top-0 z-50 w-full"
  >
    <div
      class="nav-container flex justify-between w-[90%] mx-auto items-center h-full"
    >
      <!-- LOGO -->
      <router-link :to="{ name: 'home' }" class="nav-logo">
        <img
          src="../../../assets/images/mylogo.svg"
          class="h-[75px]"
          alt="logo"
        />
      </router-link>

      <!-- DESKTOP MENU -->
      <div class="hidden md:flex items-center gap-6 nav-links">
        <My_ul />

        <router-link :to="{ name: link.name }" class="nav-btn">
          <button
            class="text-white bg-[#38BDF8] py-3 px-5 rounded-xl hover:bg-[#0ea5e9] hover:scale-105 transition-all duration-200"
          >
            {{ t("contactLink") }}
          </button>
        </router-link>

        <div class="nav-lang">
          <toggleLanguage />
        </div>
      </div>

      <!-- BURGER -->
      <button
        class="md:hidden text-white text-3xl nav-burger hover:scale-110 transition-transform duration-200"
        @click="openMenu"
      >
        ☰
      </button>
    </div>
  </div>

  <!-- OVERLAY -->
  <Transition name="overlay-fade">
    <div
      v-if="menuOpen"
      class="fixed inset-0 bg-black/50 z-40"
      @click="closeMenu"
    ></div>
  </Transition>

  <!-- MOBILE MENU -->
  <div
    class="fixed top-0 right-0 h-full w-[70%] bg-[#0a0e1a] z-50 transform transition-transform duration-500 px-8 py-10"
    :class="menuOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <!-- CLOSE BUTTON -->
    <div class="flex justify-end mb-10">
      <button
        class="text-white text-3xl hover:rotate-90 transition-transform duration-300"
        @click="closeMenu"
      >
        ✕
      </button>
    </div>

    <!-- LINKS -->
    <div class="flex flex-col items-start w-full text-lg">
      <My_ul
        :isMobile="true"
        @click="closeMenu"
      />

      <!-- CONTACT BUTTON -->
      <router-link
        :to="{ name: link.name }"
        @click="closeMenu"
        class="w-full mt-6"
      >
        <button
          class="w-full text-white bg-[#38BDF8] py-4 rounded-xl hover:bg-[#0ea5e9] transition"
        >
          {{ t("contactLink") }}
        </button>
      </router-link>

      <!-- LANGUAGE -->
      <div class="mt-6">
        <toggleLanguage />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import toggleLanguage from "@/components/composable/index.vue";
import { useLang } from "@/components/composable/i18n";
import My_ul from "./my_ul.vue";

const { t } = useLang();

const menuOpen = ref(false);

const openMenu  = () => { menuOpen.value = true;  };
const closeMenu = () => { menuOpen.value = false; };

watch(menuOpen, (val) => {
  document.body.style.overflow = val ? "hidden" : "auto";
});

const link = { key: "contactLink", name: "contact" };
</script>

<style scoped>
.navbar {
  backdrop-filter: blur(8px);
}

/* ── Logo — chapdan kiradi ── */
.nav-logo {
  opacity: 0;
  transform: translateX(-30px);
  animation: fromLeft 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: 0.1s;
}

/* ── Linklar — yuqoridan tushadi ── */
.nav-links {
  opacity: 0;
  transform: translateY(-20px);
  animation: fromTop 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: 0.2s;
}

/* ── Burger — o'ngdan kiradi ── */
.nav-burger {
  opacity: 0;
  transform: translateX(20px);
  animation: fromRight 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: 0.2s;
}

@keyframes fromLeft {
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fromTop {
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fromRight {
  to { opacity: 1; transform: translateX(0); }
}

/* ── Overlay fade ── */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.3s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

/* ── Close button rotate hover ── */
button:focus { outline: none; }
</style>