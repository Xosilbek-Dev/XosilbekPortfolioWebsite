<template>
  <div class="min-h-screen bg-[#080b12] text-slate-200 relative overflow-hidden pb-24">

    <!-- Background grid -->
    <div class="fixed inset-0 pointer-events-none z-0"
      style="background-image: linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg,rgba(56,189,248,0.04) 1px,transparent 1px); background-size: 48px 48px;"></div>
    <div class="fixed -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none z-0"
      style="background:rgba(56,189,248,0.07); filter:blur(120px);"></div>
    <div class="fixed -bottom-10 -right-10 w-80 h-80 rounded-full pointer-events-none z-0"
      style="background:rgba(167,139,250,0.06); filter:blur(120px);"></div>

    <!-- ── Hero ── -->
    <section class="relative z-10 text-center px-6 pt-20 pb-14">
      <p class="text-[11px] tracking-[0.3em] text-sky-400 opacity-80 mb-4 font-mono uppercase">
        {{ t('projects_label') }}
      </p>
      <h1 class="text-5xl md:text-7xl font-extrabold text-slate-100 leading-tight mb-4">
        {{ t('projects_title1') }}
        <span class="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
          {{ t('projects_title2') }}
        </span>
      </h1>
      <p class="max-w-md mx-auto text-slate-500 text-base leading-relaxed">
        {{ t('projects_subtitle') }}
      </p>
    </section>

    <!-- ── Main Projects ── -->
    <div class="relative z-10 max-w-5xl mx-auto px-6 space-y-8">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="rounded-2xl bg-slate-900/80 backdrop-blur-sm border border-white/5 overflow-hidden transition-all duration-300 hover:shadow-[0_0_48px_rgba(56,189,248,0.06)] hover:-translate-y-1"
        :style="{ borderLeftWidth: '4px', borderLeftColor: project.color }"
      >
        <div class="flex flex-col md:flex-row">

          <!-- ── Preview Panel ── -->
          <div class="md:w-2/5 relative min-h-[220px] flex items-center justify-center overflow-hidden"
            :style="{ background: `linear-gradient(135deg, ${project.color}14, #0d1117)` }">
            <div class="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
              :style="{ background: project.color, filter: 'blur(40px)' }"></div>
            <div class="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10"
              :style="{ background: project.color, filter: 'blur(30px)' }"></div>

            <!-- Browser mockup -->
            <div class="relative z-10 w-[85%] rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <div class="flex items-center gap-1.5 px-3 py-2.5 bg-slate-800/90 border-b border-white/5">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                <div class="flex-1 mx-2 h-4 rounded-md bg-slate-700/70 flex items-center px-2">
                  <span class="text-[9px] text-slate-500 font-mono truncate">{{ project.url || 'localhost:5173' }}</span>
                </div>
              </div>

              <!-- Media Slider -->
              <div class="h-44 relative overflow-hidden bg-slate-900">
                <div v-if="project.media && project.media.length">
                  <template v-for="(item, i) in project.media" :key="i">
                    <img v-if="item.type === 'image'" :src="item.src" :alt="t(project.titleKey)"
                      class="absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 cursor-zoom-in"
                      :class="activeSlide[project.id] === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105'"
                      @click="openLightbox(item.src, 'image')" />
                    <video v-else-if="item.type === 'video'" :src="item.src"
                      class="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                      :class="activeSlide[project.id] === i ? 'opacity-100' : 'opacity-0'"
                      :muted="true" loop playsinline
                      :ref="(el) => { if (el) videoRefs[`${project.id}-${i}`] = el }" @click.prevent />
                  </template>

                  <!-- Zoom icon -->
                  <div v-if="project.media[activeSlide[project.id]]?.type === 'image'"
                    class="absolute top-2 right-2 z-20 w-7 h-7 rounded-full flex items-center justify-center bg-black/50 border border-white/10 cursor-pointer hover:bg-black/70 transition-all text-white text-xs"
                    @click="openLightbox(project.media[activeSlide[project.id]].src, 'image')">⤢</div>

                  <!-- Play/Pause -->
                  <button v-if="project.media[activeSlide[project.id]]?.type === 'video'"
                    @click="toggleVideo(project.id, activeSlide[project.id])"
                    class="absolute bottom-2 right-2 z-20 w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all"
                    :style="{ background: project.color + '30', border: `1px solid ${project.color}50`, color: project.color }">
                    {{ isPlaying[`${project.id}-${activeSlide[project.id]}`] ? '⏸' : '▶' }}
                  </button>

                  <!-- Arrows -->
                  <button v-if="project.media.length > 1" @click="prevSlide(project.id, project.media.length)"
                    class="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full flex items-center justify-center text-xs bg-black/50 hover:bg-black/70 text-white transition-all border border-white/10">‹</button>
                  <button v-if="project.media.length > 1" @click="nextSlide(project.id, project.media.length)"
                    class="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full flex items-center justify-center text-xs bg-black/50 hover:bg-black/70 text-white transition-all border border-white/10">›</button>

                  <!-- Dots -->
                  <div v-if="project.media.length > 1" class="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                    <button v-for="(_, i) in project.media" :key="i" @click="setSlide(project.id, i)"
                      class="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      :style="{ background: activeSlide[project.id] === i ? project.color : 'rgba(255,255,255,0.3)', transform: activeSlide[project.id] === i ? 'scale(1.3)' : 'scale(1)' }"></button>
                  </div>

                  <!-- Badge -->
                  <div class="absolute top-2 left-2 z-20">
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/50 border border-white/10" :style="{ color: project.color }">
                      {{ project.media[activeSlide[project.id]]?.type === 'video' ? '🎬 Video' : '🖼 Rasm' }}
                      {{ activeSlide[project.id] + 1 }}/{{ project.media.length }}
                    </span>
                  </div>
                </div>

                <!-- Fallback -->
                <div v-else class="w-full h-full flex flex-col items-center justify-center gap-2"
                  :style="{ background: `linear-gradient(160deg, ${project.color}22, #080b12)` }">
                  <span class="text-5xl">{{ project.emoji }}</span>
                  <span class="text-xs font-mono opacity-50" :style="{ color: project.color }">{{ t(project.titleKey) }}</span>
                </div>
              </div>
            </div>

            <!-- Platform badges -->
            <div v-if="project.platforms" class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              <span v-for="p in project.platforms" :key="p.label"
                class="flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-lg border"
                :style="{ color: project.color, borderColor: project.color + '40', background: project.color + '10' }">
                {{ p.icon }} {{ p.label }}
              </span>
            </div>
          </div>

          <!-- ── Info Panel ── -->
          <div class="md:w-3/5 p-7 flex flex-col justify-between">
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-3">
                <span class="text-[11px] font-mono px-2.5 py-0.5 rounded-full border"
                  :style="{ color: project.color, borderColor: project.color + '50', background: project.color + '12' }">
                  № {{ project.number }}
                </span>
                <span v-if="project.isNew"
                  class="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/25">
                  ✦ {{ t('projects_new') }}
                </span>
                <span v-if="project.isFullstack"
                  class="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-violet-400/10 text-violet-400 border border-violet-400/25">
                  ⚡ Full-stack
                </span>
              </div>

              <h2 class="text-xl font-extrabold text-slate-100 mb-2">{{ t(project.titleKey) }}</h2>
              <p class="text-sm text-slate-400 leading-relaxed mb-5">{{ t(project.descKey) }}</p>

              <div class="flex flex-wrap gap-2 mb-5">
                <span v-for="tech in project.techs" :key="tech"
                  class="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-slate-200 transition-colors">
                  {{ tech }}
                </span>
              </div>

              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 mb-6">
                <li v-for="feat in project.featureKeys" :key="feat"
                  class="flex items-center gap-2 text-sm text-slate-400">
                  <span class="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                    :style="{ background: project.color + '20', color: project.color }">✓</span>
                  {{ t(feat) }}
                </li>
              </ul>
            </div>

            <div class="flex flex-wrap gap-3">
              <a v-if="project.url" :href="project.url" target="_blank"
                class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 hover:brightness-110"
                :style="{ background: project.color + '20', color: project.color, border: `1px solid ${project.color}40` }">
                🌐 {{ t('projects_live') }}
              </a>
              <a v-if="project.windowsUrl" :href="project.windowsUrl" target="_blank"
                class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.07] transition-all duration-200 hover:scale-105">
                💠 {{ t('projects_windows') }}
              </a>
              <a v-if="project.linuxUrl" :href="project.linuxUrl" target="_blank"
                class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.07] transition-all duration-200 hover:scale-105">
                🐧 {{ t('projects_linux') }}
              </a>
              <a href="https://t.me/Xosilbek_Web" target="_blank"
                class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-sky-400/20 bg-sky-400/5 text-sky-400 hover:bg-sky-400/10 transition-all duration-200 hover:scale-105">
                ✈️ Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════
         BOSHQA LOYIHALAR BO'LIMI
    ══════════════════════════════════════ -->
    <section class="relative z-10 max-w-5xl mx-auto px-6 mt-24">

      <!-- Header -->
      <div class="mb-10">
        <p class="text-[11px] tracking-[0.4em] text-sky-400/60 font-mono uppercase mb-3 flex items-center gap-3">
          <span class="w-6 h-px bg-sky-400/40"></span> other works
        </p>
        <h2 class="text-3xl md:text-5xl font-extrabold text-slate-100 mb-3">
          {{ t('other_title1') }}
          <span class="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
            {{ t('other_title2') }}
          </span>
        </h2>
        <p class="text-slate-500 text-sm">{{ t('other_subtitle') }}</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        <div v-for="stat in otherStats" :key="stat.labelKey"
          class="rounded-2xl border border-white/5 bg-slate-900/60 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/10"
          :style="{ borderBottomWidth: '2px', borderBottomColor: stat.color }">
          <p class="text-4xl font-extrabold mb-1.5" :style="{ color: stat.color }">{{ stat.count }}</p>
          <p class="text-[11px] text-slate-500 font-mono uppercase tracking-wider">{{ t(stat.labelKey) }}</p>
        </div>
      </div>

      <!-- Categories accordion -->
      <div class="space-y-4">
        <div v-for="cat in otherCategories" :key="cat.id"
          class="rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur-sm overflow-hidden transition-all duration-300"
          :class="openCats[cat.id] ? 'border-white/10' : ''">

          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-5 cursor-pointer select-none"
            :style="{ borderLeft: `3px solid ${cat.color}` }"
            @click="toggleCat(cat.id)">
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
                :style="{ background: cat.color + '15', border: `1px solid ${cat.color}25` }">
                {{ cat.icon }}
              </div>
              <div>
                <h3 class="font-bold text-slate-100 text-base leading-tight">{{ t(cat.titleKey) }}</h3>
                <p class="text-xs text-slate-500 mt-0.5">{{ t(cat.descKey) }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3 shrink-0 ml-4">
              <span class="text-sm font-mono font-bold px-3 py-1 rounded-full"
                :style="{ color: cat.color, background: cat.color + '15', border: `1px solid ${cat.color}30` }">
                {{ cat.count }}+ {{ t('other_projects') }}
              </span>
              <span class="text-slate-500 text-lg transition-transform duration-300"
                :class="openCats[cat.id] ? 'rotate-180' : ''">▾</span>
            </div>
          </div>

          <!-- Body -->
          <Transition name="accordion">
            <div v-show="openCats[cat.id]" class="px-6 pb-6">
              <div class="pt-4 border-t border-white/5">
                <p class="text-sm text-slate-400 leading-relaxed mb-4">{{ t(cat.longDescKey) }}</p>

                <!-- Techs -->
                <div class="flex flex-wrap gap-2 mb-5">
                  <span v-for="tech in cat.techs" :key="tech"
                    class="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.07] text-slate-400">
                    {{ tech }}
                  </span>
                </div>

                <!-- Items grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                  <div v-for="item in cat.items" :key="item.name"
                    class="flex items-center justify-between px-4 py-3 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-200">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <span class="w-1.5 h-1.5 rounded-full shrink-0" :style="{ background: cat.color }"></span>
                      <span class="text-sm text-slate-300 truncate">{{ item.name }}</span>
                    </div>
                    <div class="flex items-center gap-2 shrink-0 ml-2">
                      <span v-for="tech in item.techs" :key="tech"
                        class="text-[10px] text-slate-600 font-mono hidden sm:block">{{ tech }}</span>
                      <a v-if="item.url && item.url !== '#'" :href="item.url" target="_blank" @click.stop
                        class="w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-all hover:scale-110"
                        :style="{ color: cat.color, background: cat.color + '15' }">↗</a>
                      <span v-else class="text-[11px] text-slate-700 w-6 text-center">—</span>
                    </div>
                  </div>
                </div>

                <!-- CTA -->
                <div class="flex items-center justify-between pt-4 border-t border-white/5">
                  <p class="text-xs text-slate-600">{{ t('other_more_info') }}</p>
                  <a href="https://t.me/Xosilbek_Web" target="_blank"
                    class="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition-all hover:scale-105"
                    :style="{ color: cat.color, background: cat.color + '12', border: `1px solid ${cat.color}30` }">
                    ✈️ {{ t('other_contact') }}
                  </a>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

    </section>

    <!-- ── Lightbox Modal ── -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="lightbox.open"
          class="fixed inset-0 z-[999] flex items-center justify-center p-4"
          @click.self="closeLightbox">
          <div class="absolute inset-0 bg-black/90 backdrop-blur-sm" @click="closeLightbox"></div>
          <div class="relative z-10 max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            <button @click="closeLightbox"
              class="absolute -top-10 right-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center text-lg transition-all hover:scale-110 z-20">✕</button>
            <img v-if="lightbox.type === 'image'" :src="lightbox.src"
              class="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain border border-white/10 lightbox-img"
              :class="lightbox.zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'"
              :style="{ transform: lightbox.zoomed ? 'scale(1.8)' : 'scale(1)', transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)' }"
              @click="lightbox.zoomed = !lightbox.zoomed" />
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] text-white/30 font-mono select-none">
              {{ lightbox.zoomed ? 'Kichraytirish uchun bosing' : 'Kattalashtirish uchun bosing' }} · ESC — yopish
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useLang } from '../components/composable/i18n'

import cardify1     from '../assets/projects/cardifyimg1.jpg'
import cardify2     from '../assets/projects/cardifyimg2.jpg'
import cardifyVideo from '../assets/projects/cardifyVideo.mp4'
import auth1        from '../assets/projects/login1.jpg'
import auth2        from '../assets/projects/login2.jpg'
import authVideo    from '../assets/projects/login.mp4'
import xshop1       from '../assets/projects/xClothes1.jpg'
import xshop2       from '../assets/projects/xclothes2.jpg'
import xshopVideo   from '../assets/projects/xclothes.mp4'
// import portfolio1   from '../assets/projects/portfolio1.jpg'
// import portfolio2   from '../assets/projects/portfolio2.jpg'
// import portfolioVideo from '../assets/projects/portfolio.mp4'

const { t } = useLang()

// ── Slider ──
const activeSlide = reactive({})
const isPlaying   = reactive({})
const videoRefs   = reactive({})

// ── Lightbox ──
const lightbox = reactive({ open: false, src: null, type: 'image', zoomed: false })
function openLightbox(src, type = 'image') {
  lightbox.src = src; lightbox.type = type; lightbox.open = true; lightbox.zoomed = false
  document.body.style.overflow = 'hidden'
}
function closeLightbox() {
  lightbox.open = false; lightbox.src = null; lightbox.zoomed = false
  document.body.style.overflow = ''
}
function onKeydown(e) { if (e.key === 'Escape') closeLightbox() }
onMounted(()   => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

function nextSlide(id, len) { activeSlide[id] = ((activeSlide[id] ?? 0) + 1) % len; pauseVideos(id) }
function prevSlide(id, len) { activeSlide[id] = ((activeSlide[id] ?? 0) - 1 + len) % len; pauseVideos(id) }
function setSlide(id, i)    { activeSlide[id] = i; pauseVideos(id) }
function pauseVideos(id) {
  Object.keys(videoRefs).forEach(k => {
    if (k.startsWith(`${id}-`)) { videoRefs[k]?.pause(); isPlaying[k] = false }
  })
}
function toggleVideo(projectId, slideIndex) {
  const key = `${projectId}-${slideIndex}`
  const video = videoRefs[key]
  if (!video) return
  if (video.paused) { video.play(); isPlaying[key] = true }
  else              { video.pause(); isPlaying[key] = false }
}

// ── Other projects accordion ──
const openCats = reactive({})
function toggleCat(id) { openCats[id] = !openCats[id] }

// ── Main projects ──
const projects = [
  {
    id: 1, number: '12', emoji: '🗂️', color: '#38bdf8',
    isNew: false, isFullstack: false,
    media: [
      { type: 'image', src: cardify1 },
      { type: 'image', src: cardify2 },
      { type: 'video', src: cardifyVideo },
    ],
    titleKey: 'proj1_title', descKey: 'proj1_desc',
    url: 'https://cardify-crud.netlify.app/',
    windowsUrl: 'https://t.me/XosilbekPortfolioWorks/70',
    linuxUrl:   'https://t.me/XosilbekPortfolioWorks/71',
    platforms: [{ icon: '💠', label: 'Windows' }, { icon: '🐧', label: 'Linux' }, { icon: '🌐', label: 'Web' }],
    techs: ['Vue.js', 'Tailwind CSS', 'shadcn-vue', 'JavaScript', 'Electron', 'Vite'],
    featureKeys: ['proj1_f1', 'proj1_f2', 'proj1_f3', 'proj1_f4'],
  },
  {
    id: 2, number: '13', emoji: '🛍️', color: '#a78bfa',
    isNew: false, isFullstack: false,
    media: [
      { type: 'image', src: xshop1 },
      { type: 'image', src: xshop2 },
      { type: 'video', src: xshopVideo },
    ],
    titleKey: 'proj2_title', descKey: 'proj2_desc',
    url: 'https://xclothes-shop.netlify.app/',
    windowsUrl: null, linuxUrl: null, platforms: null,
    techs: ['Vue.js', 'Tailwind CSS', 'shadcn-vue', 'HTML', 'CSS', 'JavaScript'],
    featureKeys: ['proj2_f1', 'proj2_f2', 'proj2_f3', 'proj2_f4'],
  },
  {
    id: 3, number: '14', emoji: '🔐', color: '#34d399',
    isNew: true, isFullstack: true,
    media: [
      { type: 'image', src: auth1 },
      { type: 'image', src: auth2 },
      { type: 'video', src: authVideo },
    ],
    titleKey: 'proj3_title', descKey: 'proj3_desc',
    url: 'https://mini-authentication-website.netlify.app/',
    windowsUrl: null, linuxUrl: null, platforms: null,
    techs: ['Vue.js', 'Tailwind CSS', 'Firebase Auth', 'JavaScript', 'HTML', 'CSS'],
    featureKeys: ['proj3_f1', 'proj3_f2', 'proj3_f3', 'proj3_f4'],
  },
  {
    id: 4, number: '15', emoji: '🧑‍💻', color: '#fb7185',
    isNew: true, isFullstack: false,
    media: [],
    // media: [{ type: 'image', src: portfolio1 }, { type: 'image', src: portfolio2 }, { type: 'video', src: portfolioVideo }],
    titleKey: 'proj4_title', descKey: 'proj4_desc',
    url: '#',
    windowsUrl: null, linuxUrl: null, platforms: null,
    techs: ['Vue.js', 'Tailwind CSS', 'JavaScript', 'i18n', 'Vite'],
    featureKeys: ['proj4_f1', 'proj4_f2', 'proj4_f3', 'proj4_f4', 'proj4_f5'],
  },
]
projects.forEach(p => { activeSlide[p.id] = 0 })

// ── Other stats ──
const otherStats = [
  { count: '14+', labelKey: 'stat_big',       color: '#38bdf8' },
  { count: '12+', labelKey: 'stat_landing',   color: '#a78bfa' },
  { count: '8+',  labelKey: 'stat_ecommerce', color: '#fb7185' },
  { count: '35+', labelKey: 'stat_total',     color: '#34d399' },
]

// ── Other categories ──
// Nom va linkni o'zingiznikiga almashtiring!
const otherCategories = [
  {
    id: 1, icon: '🛍️', color: '#a78bfa', count: 8,
    titleKey: 'cat1_title', descKey: 'cat1_desc', longDescKey: 'cat1_long',
    techs: ['Vue.js', 'Tailwind CSS', 'JavaScript', 'HTML/CSS'],
    items: [
      { name: "Online Do'kon #1",  techs: ['Vue.js'],     url: '#' },
      { name: "Online Do'kon #2",  techs: ['HTML/CSS'],   url: '#' },
      { name: 'Fashion Store',     techs: ['Vue.js'],     url: '#' },
      { name: 'Tech Shop',         techs: ['JavaScript'], url: '#' },
      { name: 'Food Delivery',     techs: ['Vue.js'],     url: '#' },
      { name: 'Furniture Store',   techs: ['HTML/CSS'],   url: '#' },
    ],
  },
  {
    id: 2, icon: '🚀', color: '#38bdf8', count: 12,
    titleKey: 'cat2_title', descKey: 'cat2_desc', longDescKey: 'cat2_long',
    techs: ['Vue.js', 'HTML', 'CSS', 'JavaScript', 'Tailwind'],
    items: [
      { name: 'SaaS Landing',       techs: ['Vue.js'],   url: '#' },
      { name: 'Agency Landing',     techs: ['HTML/CSS'], url: '#' },
      { name: 'Product Launch',     techs: ['Vue.js'],   url: '#' },
      { name: 'Restaurant Landing', techs: ['JS'],       url: '#' },
      { name: 'Fitness Landing',    techs: ['Tailwind'], url: '#' },
      { name: 'Real Estate',        techs: ['Vue.js'],   url: '#' },
    ],
  },
  {
    id: 3, icon: '🧑‍💻', color: '#fb7185', count: 5,
    titleKey: 'cat3_title', descKey: 'cat3_desc', longDescKey: 'cat3_long',
    techs: ['Vue.js', 'Tailwind CSS', 'JavaScript', 'Vite'],
    items: [
      { name: 'Portfolio #1',  techs: ['Vue.js'],   url: '#' },
      { name: 'Portfolio #2',  techs: ['HTML/CSS'], url: '#' },
      { name: 'CV Website',    techs: ['Vue.js'],   url: '#' },
      { name: 'Personal Blog', techs: ['JS'],       url: '#' },
    ],
  },
  {
    id: 4, icon: '✨', color: '#34d399', count: 10,
    titleKey: 'cat4_title', descKey: 'cat4_desc', longDescKey: 'cat4_long',
    techs: ['Vue.js', 'JavaScript', 'Firebase', 'Electron', 'Tailwind'],
    items: [
      { name: 'Task Manager', techs: ['Vue.js'],     url: '#' },
      { name: 'Weather App',  techs: ['JavaScript'], url: '#' },
      { name: 'Quiz App',     techs: ['Vue.js'],     url: '#' },
      { name: 'Chat App',     techs: ['Firebase'],   url: '#' },
      { name: 'Notes App',    techs: ['Electron'],   url: '#' },
      { name: 'Calculator',   techs: ['JavaScript'], url: '#' },
    ],
  },
]
</script>

<style scoped>
.lightbox-img { animation: zoomIn 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
@keyframes zoomIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
.lightbox-enter-active, .lightbox-leave-active { transition: opacity 0.25s ease; }
.lightbox-enter-from, .lightbox-leave-to { opacity: 0; }

.accordion-enter-active, .accordion-leave-active { transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1); overflow: hidden; }
.accordion-enter-from, .accordion-leave-to { opacity: 0; max-height: 0; }
.accordion-enter-to, .accordion-leave-from { opacity: 1; max-height: 800px; }
</style>