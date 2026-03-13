<template>
  <div class="min-h-screen bg-[#080b12] text-slate-200 relative overflow-hidden pb-24">

    <!-- Background grid -->
    <div class="fixed inset-0 pointer-events-none z-0"
      style="background-image: linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg,rgba(56,189,248,0.04) 1px,transparent 1px); background-size: 48px 48px;">
    </div>
    <div class="fixed -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none z-0"
      style="background:rgba(56,189,248,0.07); filter:blur(120px);"></div>
    <div class="fixed -bottom-10 -right-10 w-80 h-80 rounded-full pointer-events-none z-0"
      style="background:rgba(167,139,250,0.06); filter:blur(120px);"></div>

    <!-- ── Hero ── -->
    <section class="relative z-10 text-center px-6 pt-20 pb-14">
      <p class="text-[11px] tracking-[0.3em] text-sky-400 opacity-80 mb-4 font-mono uppercase">
        {{ t('services_label') }}
      </p>
      <h1 class="text-5xl md:text-7xl font-extrabold text-slate-100 leading-tight mb-4">
        {{ t('services_title1') }}
        <span class="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
          {{ t('services_title2') }}
        </span>
      </h1>
      <p class="max-w-lg mx-auto text-slate-500 text-base leading-relaxed mb-4">
        {{ t('services_subtitle') }}
      </p>
      <p class="text-xs text-slate-600 font-mono">
        {{ t('services_flip_hint') }}
      </p>
    </section>

    <!-- ── Services Grid ── -->
    <div class="relative z-10 max-w-6xl mx-auto px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <div
          v-for="(service, index) in services"
          :key="service.id"
          class="flip-card h-[420px] cursor-pointer"
          :class="service.animClass"
          :style="{ '--color': service.color, animationDelay: service.delay }"
          @click="toggleFlip(service.id)"
        >
          <div class="flip-card-inner" :class="{ flipped: flipped[service.id] }">

            <!-- ── FRONT ── -->
            <div class="flip-card-front rounded-2xl border border-white/5 p-7 flex flex-col justify-between relative overflow-hidden"
              :style="{ background: `linear-gradient(135deg, ${service.color}10, #0d1117)`, borderLeftWidth: '3px', borderLeftColor: service.color }">

              <!-- Decorative background shape -->
              <div class="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10 pointer-events-none"
                :style="{ background: service.color, filter: 'blur(30px)' }"></div>
              <div class="absolute top-0 right-0 w-20 h-20 opacity-5 pointer-events-none"
                :style="{ background: `radial-gradient(circle, ${service.color}, transparent)` }"></div>

              <!-- Number -->
              <div class="flex items-start justify-between">
                <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  :style="{ background: service.color + '18', border: `1px solid ${service.color}35` }">
                  {{ service.icon }}
                </div>
                <span class="text-3xl font-extrabold font-mono opacity-10" :style="{ color: service.color }">
                  0{{ index + 1 }}
                </span>
              </div>

              <!-- Title -->
              <div>
                <h3 class="text-2xl font-extrabold text-slate-100 mb-3">{{ t(service.titleKey) }}</h3>
                <p class="text-sm text-slate-500 leading-relaxed line-clamp-3">{{ t(service.descKey) }}</p>
              </div>

              <!-- Flip hint -->
              <div class="flex items-center gap-1.5 text-[11px] font-mono"
                :style="{ color: service.color }">
                <span class="flip-arrow">↻</span>
                {{ t('services_see_more') }}
              </div>
            </div>

            <!-- ── BACK ── -->
            <div class="flip-card-back rounded-2xl border p-7 flex flex-col justify-between relative overflow-hidden bg-[#0d1117]"
              :style="{ borderColor: service.color + '40', borderWidth: '1px' }">

              <!-- Glow top -->
              <div class="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                :style="{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }"></div>

              <!-- Features -->
              <div>
                <h4 class="text-base font-bold mb-5 flex items-center gap-2" :style="{ color: service.color }">
                  <span>✦</span> {{ t(service.titleKey) }}
                </h4>
                <ul class="space-y-3 mb-6">
                  <li v-for="feat in service.featureKeys" :key="feat"
                    class="flex items-center gap-3 text-sm text-slate-300">
                    <span class="w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0"
                      :style="{ background: service.color + '20', color: service.color }">✓</span>
                    {{ t(feat) }}
                  </li>
                </ul>
              </div>

              <!-- Order buttons -->
              <div class="flex flex-col gap-2">
                <a href="https://t.me/Xosilbek_Web" target="_blank"
                  @click.stop
                  class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:brightness-125"
                  :style="{ background: service.color + '22', color: service.color, border: `1px solid ${service.color}45` }">
                  ✈️ {{ t('services_order_tg') }}
                </a>
                <a href="mailto:turdiyevxosilbek661@gmail.com" target="_blank"
                  @click.stop
                  class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold border border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.07] transition-all duration-200">
                  ✉️ {{ t('services_order_email') }}
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

    <!-- ── Bottom CTA ── -->
    <div class="relative z-10 max-w-3xl mx-auto px-6 mt-16">
      <div class="rounded-2xl p-8 md:p-12 text-center border border-white/5 bg-slate-900/60 backdrop-blur-sm relative overflow-hidden">
        <div class="absolute inset-0 pointer-events-none"
          style="background: radial-gradient(ellipse at center, rgba(56,189,248,0.06), transparent 70%);">
        </div>
        <p class="text-[11px] tracking-[0.3em] text-sky-400 font-mono uppercase mb-4">
          {{ t('services_cta_label') }}
        </p>
        <h2 class="text-2xl md:text-4xl font-extrabold text-slate-100 mb-4">
          {{ t('services_cta_title') }}
        </h2>
        <p class="text-slate-400 text-sm leading-relaxed mb-8 max-w-md mx-auto">
          {{ t('services_cta_desc') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://t.me/Xosilbek_Web" target="_blank"
            class="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-sky-400/20 text-sky-400 border border-sky-400/40 hover:bg-sky-400/30 transition-all duration-200 hover:scale-105">
            ✈️ Telegram
          </a>
          <a href="mailto:turdiyevxosilbek661@gmail.com"
            class="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.07] transition-all duration-200 hover:scale-105">
            ✉️ Email
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useLang } from '@/components/composable/i18n'

const { t } = useLang()

// Flip state — har bir karta uchun
const flipped = reactive({})

function toggleFlip(id) {
  flipped[id] = !flipped[id]
}

const services = [
  {
    id: 1,
    icon: '⟨/⟩',
    color: '#38bdf8',
    animClass: 'anim-slide-up',
    delay: '0s',
    titleKey: 'srv1_title',
    descKey: 'srv1_desc',
    featureKeys: ['srv1_f1', 'srv1_f2', 'srv1_f3', 'srv1_f4'],
  },
  {
    id: 2,
    icon: '⊞',
    color: '#34d399',
    animClass: 'anim-slide-left',
    delay: '0.1s',
    titleKey: 'srv2_title',
    descKey: 'srv2_desc',
    featureKeys: ['srv2_f1', 'srv2_f2', 'srv2_f3', 'srv2_f4'],
  },
  {
    id: 3,
    icon: '✎',
    color: '#fb7185',
    animClass: 'anim-zoom',
    delay: '0.15s',
    titleKey: 'srv3_title',
    descKey: 'srv3_desc',
    featureKeys: ['srv3_f1', 'srv3_f2', 'srv3_f3', 'srv3_f4'],
  },
  {
    id: 4,
    icon: '🇬🇧',
    color: '#fbbf24',
    animClass: 'anim-slide-right',
    delay: '0.2s',
    titleKey: 'srv4_title',
    descKey: 'srv4_desc',
    featureKeys: ['srv4_f1', 'srv4_f2', 'srv4_f3', 'srv4_f4'],
  },
  {
    id: 5,
    icon: '🖥️',
    color: '#a78bfa',
    animClass: 'anim-slide-up',
    delay: '0.25s',
    titleKey: 'srv5_title',
    descKey: 'srv5_desc',
    featureKeys: ['srv5_f1', 'srv5_f2', 'srv5_f3', 'srv5_f4'],
  },
  {
    id: 6,
    icon: '💡',
    color: '#f97316',
    animClass: 'anim-zoom',
    delay: '0.3s',
    titleKey: 'srv6_title',
    descKey: 'srv6_desc',
    featureKeys: ['srv6_f1', 'srv6_f2', 'srv6_f3', 'srv6_f4'],
  },
]

// Initialize all cards as not flipped
services.forEach(s => { flipped[s.id] = false })
</script>

<style scoped>
/* ── 3D Flip Card ── */
.flip-card {
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.flip-card-inner.flipped {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}

/* ── Flip arrow spin ── */
.flip-arrow {
  display: inline-block;
  animation: spin-slow 3s linear infinite;
}
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* ── Entry animations — har biri boshqacha ── */
.anim-slide-up {
  animation: slideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay, 0s);
}
.anim-slide-left {
  animation: slideLeft 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay, 0s);
}
.anim-slide-right {
  animation: slideRight 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay, 0s);
}
.anim-zoom {
  animation: zoomIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay, 0s);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes slideLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes slideRight {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes zoomIn {
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1); }
}
</style>