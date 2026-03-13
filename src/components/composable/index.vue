<template>
  <div class="toggle">
    <button
      @click="toggle"
      class="py-3 px-5 text-white border-[#2a3550] rounded-xl bg-[#1A2035] flex gap-1"
    >
      <p>{{ t("languageImage") }}</p>
      <p>
        {{ lang.toUpperCase() }}
      </p>
    </button>
  </div>
</template>

<script setup>
import { useLang } from "@/components/composable/i18n";
const { t, toggle, lang } = useLang();
</script>

<style></style>
