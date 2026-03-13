<template>
  <div class="min-h-screen bg-[#080b12] text-slate-200 relative overflow-hidden pb-20">

    <!-- Background grid -->
    <div class="fixed inset-0 pointer-events-none z-0"
      style="background-image: linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg,rgba(56,189,248,0.04) 1px,transparent 1px); background-size: 48px 48px;">
    </div>
    <!-- Glow blobs -->
    <div class="fixed -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none z-0"
      style="background:rgba(56,189,248,0.07); filter:blur(120px);"></div>
    <div class="fixed -bottom-10 -right-10 w-80 h-80 rounded-full pointer-events-none z-0"
      style="background:rgba(167,139,250,0.06); filter:blur(120px);"></div>

    <!-- ── Hero ── -->
    <section class="relative z-10 text-center px-6 pt-20 pb-14">
      <p class="text-[11px] tracking-[0.3em] text-sky-400 opacity-80 mb-4 font-mono uppercase">
        {{ t('skills_label') }}
      </p>
      <h1 class="text-5xl md:text-7xl font-extrabold text-slate-100 leading-tight mb-4">
        {{ t('skills_title1') }}
        <span class="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
          {{ t('skills_title2') }}
        </span>
      </h1>
      <p class="max-w-md mx-auto text-slate-500 text-base leading-relaxed">
        {{ t('skills_subtitle') }}
      </p>
    </section>

    <div class="relative z-10 max-w-4xl mx-auto px-6 space-y-7">

      <!-- ── 1. FRONTEND — Progress Bars ── -->
      <div class="rounded-2xl bg-slate-900/80 backdrop-blur-sm p-8 border border-white/5 border-l-4 border-l-sky-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(56,189,248,0.07)]">
        <div class="flex items-start gap-4 mb-8">
          <span class="w-12 h-12 flex items-center justify-center rounded-xl text-base font-mono font-bold shrink-0 text-sky-400"
            style="background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.25);">⟨/⟩</span>
          <div>
            <h2 class="text-lg font-bold text-slate-100">{{ t('skills_frontend_title') }}</h2>
            <p class="text-xs text-slate-500 mt-0.5">{{ t('skills_frontend_desc') }}</p>
          </div>
        </div>
        <div class="space-y-5">
          <div v-for="(skill, i) in frontend" :key="skill.name">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-semibold text-slate-300">{{ skill.name }}</span>
              <span class="text-xs font-mono text-sky-400">{{ skill.level }}%</span>
            </div>
            <div class="relative h-1.5 rounded-full overflow-hidden bg-white/5">
              <div class="absolute inset-y-0 left-0 rounded-full bar-fill"
                :style="{ '--w': skill.level + '%', background: 'linear-gradient(90deg,#38bdf8,#7dd3fc)', animationDelay: (i * 0.1) + 's' }">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── 2. TOOLS — Icon + Level Label ── -->
      <div class="rounded-2xl bg-slate-900/80 backdrop-blur-sm p-8 border border-white/5 border-l-4 border-l-violet-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(167,139,250,0.07)]">
        <div class="flex items-start gap-4 mb-8">
          <span class="w-12 h-12 flex items-center justify-center rounded-xl text-xl shrink-0 text-violet-400"
            style="background:rgba(167,139,250,0.1); border:1px solid rgba(167,139,250,0.25);">⚙︎</span>
          <div>
            <h2 class="text-lg font-bold text-slate-100">{{ t('skills_tools_title') }}</h2>
            <p class="text-xs text-slate-500 mt-0.5">{{ t('skills_tools_desc') }}</p>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div v-for="tool in tools" :key="tool.key"
            class="flex items-center gap-3 rounded-xl p-4 border border-white/5 bg-white/[0.02] hover:-translate-y-1 transition-transform duration-200">
            <span class="text-2xl">{{ tool.icon }}</span>
            <div>
              <div class="text-sm font-semibold text-slate-200 mb-1">{{ tool.name }}</div>
              <span class="text-[11px] font-mono px-2 py-0.5 rounded-full" :class="levelClass(tool.levelKey)">
                {{ t(tool.levelKey) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── 3. DESIGN — Tag / Badge Cards ── -->
      <div class="rounded-2xl bg-slate-900/80 backdrop-blur-sm p-8 border border-white/5 border-l-4 border-l-rose-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(251,113,133,0.07)]">
        <div class="flex items-start gap-4 mb-8">
          <span class="w-12 h-12 flex items-center justify-center rounded-xl text-xl shrink-0 text-rose-400"
            style="background:rgba(251,113,133,0.1); border:1px solid rgba(251,113,133,0.25);">✎</span>
          <div>
            <h2 class="text-lg font-bold text-slate-100">{{ t('skills_design_title') }}</h2>
            <p class="text-xs text-slate-500 mt-0.5">{{ t('skills_design_desc') }}</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-3">
          <span v-for="tag in design" :key="tag.key"
            class="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 hover:scale-105 cursor-default"
            :style="{ background: tag.color + '18', borderColor: tag.color + '44', color: tag.color }">
            <span class="text-base">{{ tag.icon }}</span>{{ t(tag.key) }}
          </span>
        </div>
      </div>

      <!-- ── 4. DESKTOP — Stat Cards ── -->
      <div class="rounded-2xl bg-slate-900/80 backdrop-blur-sm p-8 border border-white/5 border-l-4 border-l-emerald-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(52,211,153,0.07)]">
        <div class="flex items-start gap-4 mb-8">
          <span class="w-12 h-12 flex items-center justify-center rounded-xl text-xl shrink-0 text-emerald-400"
            style="background:rgba(52,211,153,0.1); border:1px solid rgba(52,211,153,0.25);">⊞</span>
          <div>
            <h2 class="text-lg font-bold text-slate-100">{{ t('skills_desktop_title') }}</h2>
            <p class="text-xs text-slate-500 mt-0.5">{{ t('skills_desktop_desc') }}</p>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div v-for="stat in desktop" :key="stat.descKey"
            class="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center hover:-translate-y-1 transition-transform duration-200">
            <div class="text-4xl font-extrabold font-mono mb-2"
              style="background:linear-gradient(135deg,#34d399,#6ee7b7); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">
              {{ stat.value }}
            </div>
            <div class="text-sm font-bold text-slate-200 mb-1">{{ stat.name }}</div>
            <div class="text-xs text-slate-500">{{ t(stat.descKey) }}</div>
          </div>
        </div>
      </div>

      <!-- ── 5. TEACHING — Icon + Level ── -->
      <div class="rounded-2xl bg-slate-900/80 backdrop-blur-sm p-8 border border-white/5 border-l-4 border-l-amber-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(251,191,36,0.07)]">
        <div class="flex items-start gap-4 mb-8">
          <span class="w-12 h-12 flex items-center justify-center rounded-xl text-xl shrink-0 text-amber-400"
            style="background:rgba(251,191,36,0.1); border:1px solid rgba(251,191,36,0.25);">▶</span>
          <div>
            <h2 class="text-lg font-bold text-slate-100">{{ t('skills_teaching_title') }}</h2>
            <p class="text-xs text-slate-500 mt-0.5">{{ t('skills_teaching_desc') }}</p>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="item in teaching" :key="item.key"
            class="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:-translate-y-1 transition-transform duration-200">
            <span class="w-10 h-10 text-xl flex items-center justify-center rounded-lg shrink-0"
              style="background:rgba(251,191,36,0.08); border:1px solid rgba(251,191,36,0.15);">{{ item.icon }}</span>
            <div>
              <div class="text-sm font-semibold text-slate-200 mb-1">{{ t(item.key) }}</div>
              <span class="text-[11px] font-mono px-2 py-0.5 rounded-full" :class="levelClass(item.levelKey)">
                {{ t(item.levelKey) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── 6. IELTS ── -->
      <div class="rounded-2xl bg-slate-900/80 backdrop-blur-sm p-8 border border-sky-400/20">
        <div class="flex flex-col sm:flex-row sm:items-start gap-4 mb-8">
          <!-- Icon + Title row -->
          <div class="flex items-start gap-4 flex-1 min-w-0">
            <span class="w-12 h-12 flex items-center justify-center rounded-xl text-xl shrink-0"
              style="background:rgba(56,189,248,0.08); border:1px solid rgba(56,189,248,0.2);">🌐</span>
            <div class="min-w-0">
              <h2 class="text-lg font-bold text-slate-100">{{ t('skills_ielts_title') }}</h2>
              <p class="text-xs text-slate-500 mt-0.5">{{ t('skills_ielts_desc') }}</p>
            </div>
          </div>
          <!-- Overall Band card — full width on mobile, auto on desktop -->
          <div class="text-center rounded-xl px-6 py-3 w-full sm:w-auto"
            style="background:linear-gradient(135deg,rgba(56,189,248,0.08),rgba(167,139,250,0.08)); border:1px solid rgba(56,189,248,0.2);">
            <div class="text-3xl font-extrabold font-mono"
              style="background:linear-gradient(135deg,#38bdf8,#a78bfa); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">
              6.0
            </div>
            <div class="text-[10px] uppercase tracking-widest text-slate-500 mt-1 font-semibold">
              {{ t('skills_ielts_overall') }}
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div v-for="band in ielts" :key="band.nameKey"
            class="rounded-xl border border-white/5 bg-white/[0.02] p-5 text-center hover:-translate-y-1 transition-transform duration-200">
            <div class="text-2xl mb-2">{{ band.icon }}</div>
            <div class="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
              {{ t(band.nameKey) }}
            </div>
            <div class="text-3xl font-extrabold font-mono mb-3" :style="{ color: band.color }">
              {{ band.score }}
            </div>
            <div class="h-1 rounded-full bg-white/5 overflow-hidden mb-2">
              <div class="h-full rounded-full bar-fill"
                :style="{ '--w': (band.score / 9 * 100) + '%', background: band.color }">
              </div>
            </div>
            <div class="text-[10px] text-slate-500">{{ t(band.labelKey) }}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLang } from '../components/composable/i18n'

const { t, lang } = useLang()

// ── Frontend — static, names don't change with lang ──
const frontend = [
  { name: 'HTML5 & CSS3',      level: 95 },
  { name: 'JavaScript (ES6+)', level: 88 },
  { name: 'Vue.js',            level: 90 },
  { name: 'Responsive Design', level: 92 },
  { name: 'Tailwind CSS',      level: 85 },
]

// ── Tools — levelKey maps to t() ──
const tools = [
  { key: 'git',   name: 'Git & GitHub', icon: '🐙', levelKey: 'tools_expert'       },
  { key: 'vscode',name: 'VS Code',      icon: '💻', levelKey: 'tools_expert'       },
  { key: 'linux', name: 'Linux / CLI',  icon: '🐧', levelKey: 'tools_intermediate' },
]

// ── Design — key maps to t() for translated names ──
const design = [
  { key: 'design_figma',    icon: '🎨', color: '#fb7185' },
  { key: 'design_uiux',     icon: '✦',  color: '#f472b6' },
  { key: 'design_wireframe',icon: '📐', color: '#e879f9' },
  { key: 'design_system',   icon: '🧩', color: '#c084fc' },
]

// ── Desktop — descKey maps to t() ──
const desktop = [
  { name: 'Electron.js',        value: '3+',  descKey: 'desktop_electron_desc' },
  { name: 'Cross-platform Apps',value: '10+', descKey: 'desktop_cross_desc'    },
  { name: 'System Integration', value: '✓',   descKey: 'desktop_system_desc'   },
]

// ── Teaching — key and levelKey map to t() ──
const teaching = [
  { key: 'teaching_english',    icon: '🇬🇧', levelKey: 'tools_expert'    },
  { key: 'teaching_frontend',   icon: '🖥️',  levelKey: 'tools_expert'    },
  { key: 'teaching_curriculum', icon: '📋', levelKey: 'tools_advanced'   },
  { key: 'teaching_codereview', icon: '🔍', levelKey: 'tools_advanced'   },
  { key: 'teaching_mentorship', icon: '🤝', levelKey: 'tools_expert'     },
]

// ── IELTS — nameKey and labelKey map to t() ──
const ielts = [
  { nameKey: 'ielts_listening', score: 6.5, icon: '🎧', color: '#38bdf8', labelKey: 'ielts_upper_intermediate' },
  { nameKey: 'ielts_reading',   score: 6.5, icon: '📖', color: '#a78bfa', labelKey: 'ielts_upper_intermediate' },
  { nameKey: 'ielts_writing',   score: 5.5, icon: '✍️',  color: '#fb7185', labelKey: 'ielts_intermediate'       },
  { nameKey: 'ielts_speaking',  score: 6.0, icon: '🗣️',  color: '#34d399', labelKey: 'ielts_competent'          },
]

// ── Level badge class helper ──
function levelClass(levelKey) {
  if (levelKey === 'tools_expert')       return 'bg-sky-400/10 text-sky-400 border border-sky-400/20'
  if (levelKey === 'tools_advanced')     return 'bg-violet-400/10 text-violet-400 border border-violet-400/20'
  if (levelKey === 'tools_intermediate') return 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
  return 'bg-slate-400/10 text-slate-400 border border-slate-400/20'
}
</script>

<style scoped>
@keyframes fillBar {
  from { width: 0; }
  to   { width: var(--w); }
}
.bar-fill {
  width: 0;
  animation: fillBar 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
</style>