<template>
  <div class="min-h-screen bg-[#080b12] text-slate-200 relative pb-24 overflow-hidden">

    <!-- Diagonal accent line -->
    <div class="fixed top-0 right-0 w-[1px] h-full pointer-events-none z-0"
      style="background: linear-gradient(to bottom, transparent, rgba(56,189,248,0.15), transparent)"></div>
    <div class="fixed bottom-0 left-0 right-0 h-[1px] pointer-events-none z-0"
      style="background: linear-gradient(to right, transparent, rgba(56,189,248,0.1), transparent)"></div>

    <!-- Big background number -->
    <div class="fixed right-[-60px] top-1/2 -translate-y-1/2 text-[300px] font-extrabold text-white/[0.015] pointer-events-none z-0 leading-none select-none">
      05
    </div>

    <!-- ── Hero — Left aligned ── -->
    <section class="relative z-10 px-8 md:px-16 pt-28 pb-16 max-w-7xl mx-auto">
      <p class="text-xs tracking-[0.4em] text-sky-400/70 uppercase mb-6 font-mono flex items-center gap-3"
        :class="visible ? 'anim-in' : 'anim-out'" style="transition-delay:0s">
        <span class="w-8 h-px bg-sky-400/40"></span>
        {{ t('contact_label') }}
      </p>
      <h1 class="text-6xl md:text-8xl font-extrabold leading-[0.95] tracking-tight mb-8">
        <span class="block text-slate-100"
          :class="visible ? 'anim-in' : 'anim-out'" style="transition-delay:0.1s">
          {{ t('contact_title1') }}
        </span>
        <span class="block"
          :class="visible ? 'anim-in' : 'anim-out'"
          style="transition-delay:0.2s; background: linear-gradient(135deg,#38bdf8,#818cf8,#e879f9); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">
          {{ t('contact_title2') }}
        </span>
      </h1>
      <p class="text-slate-500 text-lg max-w-md leading-relaxed"
        :class="visible ? 'anim-in' : 'anim-out'" style="transition-delay:0.3s">
        {{ t('contact_subtitle') }}
      </p>
    </section>

    <!-- ── Content ── -->
    <div class="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        <!-- ── LEFT: Big Contact Cards ── -->
        <div class="space-y-4">

          <a
            v-for="(card, i) in contactCards"
            :key="card.id"
            :href="card.href"
            target="_blank"
            class="group relative flex items-center gap-6 p-6 rounded-3xl transition-all duration-500 overflow-hidden border border-transparent hover:border-white/10 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            :class="visible ? 'anim-in' : 'anim-out'"
            :style="{ background: `linear-gradient(135deg, ${card.color}08, transparent)`, transitionDelay: `${0.4 + i * 0.1}s` }"
          >
            <!-- Hover fill -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
              :style="{ background: `linear-gradient(135deg, ${card.color}10, transparent)` }"></div>

            <!-- Number -->
            <span class="absolute top-4 right-5 text-5xl font-extrabold opacity-[0.06] group-hover:opacity-[0.1] transition-opacity"
              :style="{ color: card.color }">0{{ i+1 }}</span>

            <!-- Icon -->
            <div class="relative w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 transition-transform duration-300 group-hover:scale-110"
              :style="{ background: card.color + '15', border: `1px solid ${card.color}25` }">
              {{ card.icon }}
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0 relative">
              <p class="text-xs font-mono uppercase tracking-widest mb-1.5 transition-colors"
                :style="{ color: card.color }">{{ t(card.labelKey) }}</p>
              <p class="text-xl font-bold text-slate-100 truncate group-hover:text-white transition-colors">
                {{ card.value }}
              </p>
            </div>

            <!-- Arrow -->
            <div class="relative w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-600 group-hover:border-white/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
              →
            </div>
          </a>

          <!-- ── Status card ── -->
          <div class="mt-4 p-6 rounded-3xl border border-white/5 bg-white/[0.02] flex items-center justify-between"
            :class="visible ? 'anim-in' : 'anim-out'" style="transition-delay:0.75s">
            <div>
              <p class="text-xs text-slate-600 uppercase tracking-widest mb-1">{{ t('contact_hours_label') }}</p>
              <p class="text-base font-semibold text-slate-300">{{ t('contact_hours_days') }}</p>
              <p class="text-sm text-slate-600 mt-0.5">{{ t('contact_hours_time') }}</p>
            </div>
            <div class="text-right">
              <div class="flex items-center justify-end gap-2 mb-1">
                <span class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"></span>
                <span class="text-sm font-semibold text-emerald-400">{{ t('contact_online') }}</span>
              </div>
              <p class="text-xs text-slate-600">{{ t('contact_response_time') }}</p>
            </div>
          </div>

        </div>

        <!-- ── RIGHT: Form ── -->
        <div class="relative">

          <!-- Form card -->
          <div class="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8 backdrop-blur-sm relative overflow-hidden"
            :class="visible ? 'anim-in' : 'anim-out'" style="transition-delay:0.45s">

            <!-- Accent corner -->
            <div class="absolute top-0 right-0 w-32 h-32 pointer-events-none"
              style="background: radial-gradient(circle at top right, rgba(56,189,248,0.08), transparent 70%)"></div>

            <h2 class="text-2xl font-bold text-slate-100 mb-1">{{ t('contact_form_title') }}</h2>
            <p class="text-sm text-slate-500 mb-8">{{ t('contact_form_desc') }}</p>

            <!-- Success -->
            <Transition name="slide-fade">
              <div v-if="submitStatus === 'success'"
                class="mb-6 p-5 rounded-2xl bg-emerald-400/[0.07] border border-emerald-400/25 flex items-start gap-4">
                <span class="text-2xl mt-0.5">✅</span>
                <div>
                  <p class="font-semibold text-emerald-400 mb-0.5">{{ t('contact_success_title') }}</p>
                  <p class="text-sm text-emerald-400/60">{{ t('contact_success_desc') }}</p>
                </div>
              </div>
            </Transition>

            <!-- Error -->
            <Transition name="slide-fade">
              <div v-if="submitStatus === 'error'"
                class="mb-6 p-5 rounded-2xl bg-rose-400/[0.07] border border-rose-400/25 flex items-start gap-4">
                <span class="text-2xl mt-0.5">⚠️</span>
                <p class="text-sm text-rose-400 mt-1">{{ t('contact_error') }}</p>
              </div>
            </Transition>

            <form @submit.prevent="submitForm" class="space-y-5" novalidate>

              <!-- Name -->
              <div>
                <label class="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                  {{ t('contact_field_name') }} <span class="text-sky-400">*</span>
                </label>
                <input v-model="form.name" type="text"
                  :placeholder="t('contact_placeholder_name')"
                  class="w-full bg-white/[0.04] border rounded-2xl px-5 py-4 text-base text-slate-200 placeholder-slate-700 outline-none transition-all duration-200 hover:bg-white/[0.06] focus:bg-white/[0.06]"
                  :class="errors.name ? 'border-rose-400/50' : 'border-white/[0.08] focus:border-sky-400/40'"
                  @input="clearError('name')" />
                <p v-if="errors.name" class="mt-1.5 text-xs text-rose-400/80">{{ errors.name }}</p>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                  {{ t('contact_field_email') }} <span class="text-sky-400">*</span>
                </label>
                <input v-model="form.email" type="email"
                  :placeholder="t('contact_placeholder_email')"
                  class="w-full bg-white/[0.04] border rounded-2xl px-5 py-4 text-base text-slate-200 placeholder-slate-700 outline-none transition-all duration-200 hover:bg-white/[0.06] focus:bg-white/[0.06]"
                  :class="errors.email ? 'border-rose-400/50' : 'border-white/[0.08] focus:border-sky-400/40'"
                  @input="clearError('email')" />
                <p v-if="errors.email" class="mt-1.5 text-xs text-rose-400/80">{{ errors.email }}</p>
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                  {{ t('contact_field_phone') }}
                </label>
                <input v-model="form.phone" type="tel"
                  :placeholder="t('contact_placeholder_phone')"
                  class="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4 text-base text-slate-200 placeholder-slate-700 outline-none transition-all duration-200 hover:bg-white/[0.06] focus:border-sky-400/40 focus:bg-white/[0.06]" />
              </div>

              <!-- Service -->
              <div>
                <label class="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                  {{ t('contact_field_service') }} <span class="text-sky-400">*</span>
                </label>
                <div class="relative">
                  <select v-model="form.service"
                    class="w-full bg-[#080b12] border rounded-2xl px-5 py-4 text-base outline-none transition-all duration-200 appearance-none cursor-pointer hover:bg-white/[0.03]"
                    :class="[errors.service ? 'border-rose-400/50' : 'border-white/[0.08] focus:border-sky-400/40', form.service ? 'text-slate-200' : 'text-slate-700']"
                    @change="clearError('service')">
                    <option value="" disabled class="bg-[#080b12]">{{ t('contact_placeholder_service') }}</option>
                    <option v-for="srv in serviceOptions" :key="srv.value" :value="srv.value" class="bg-[#080b12] text-slate-200">
                      {{ t(srv.labelKey) }}
                    </option>
                  </select>
                  <span class="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none">▾</span>
                </div>
                <p v-if="errors.service" class="mt-1.5 text-xs text-rose-400/80">{{ errors.service }}</p>
              </div>

              <!-- Message -->
              <div>
                <label class="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                  {{ t('contact_field_message') }} <span class="text-sky-400">*</span>
                </label>
                <textarea v-model="form.message" rows="5"
                  :placeholder="t('contact_placeholder_message')"
                  class="w-full bg-white/[0.04] border rounded-2xl px-5 py-4 text-base text-slate-200 placeholder-slate-700 outline-none transition-all duration-200 hover:bg-white/[0.06] focus:bg-white/[0.06] resize-none"
                  :class="errors.message ? 'border-rose-400/50' : 'border-white/[0.08] focus:border-sky-400/40'"
                  @input="clearError('message')"></textarea>
                <div class="flex justify-between mt-1.5">
                  <p v-if="errors.message" class="text-xs text-rose-400/80">{{ errors.message }}</p>
                  <p class="text-xs text-slate-700 ml-auto">{{ form.message.length }} / 500</p>
                </div>
              </div>

              <!-- Submit -->
              <button type="submit" :disabled="isLoading"
                class="w-full py-4 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                :class="isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]'"
                style="background: linear-gradient(135deg, #0ea5e9, #6366f1); color: white;">
                <span v-if="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span v-else>✈️</span>
                {{ isLoading ? t('contact_sending') : t('contact_submit') }}
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from 'vue'
import { useLang } from '@/components/composable/i18n'

const { t } = useLang()

const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN
const CHAT_ID   = import.meta.env.VITE_CHAT_ID

// ── Animatsiya ──
const visible = ref(false)
onMounted(async () => {
  await nextTick()
  setTimeout(() => { visible.value = true }, 50)
})


const contactCards = [
  { id: 1, icon: '✈️', color: '#38bdf8', labelKey: 'contact_card_tg',        value: '@Xosilbek_Web',                 href: 'https://t.me/Xosilbek_Web' },
  { id: 2, icon: '✉️', color: '#a78bfa', labelKey: 'contact_card_email',     value: 'xosilbekturdiyev@gmail.com', href: 'mailto:turdiyevxosilbek661@gmail.com' },
  { id: 3, icon: '📸', color: '#fb7185', labelKey: 'contact_card_instagram', value: '@xosilbek_web_developer ',                  href: 'https://instagram.com/xosilbek_dev' },
]

const serviceOptions = [
  { value: 'frontend',  labelKey: 'srv1_title' },
  { value: 'desktop',   labelKey: 'srv2_title' },
  { value: 'design',    labelKey: 'srv3_title' },
  { value: 'english',   labelKey: 'srv4_title' },
  { value: 'teaching',  labelKey: 'srv5_title' },
  { value: 'consult',   labelKey: 'srv6_title' },
]

const form = reactive({ name: '', email: '', phone: '', service: '', message: '' })
const errors = reactive({})
const isLoading = ref(false)
const submitStatus = ref('')

function validate() {
  const e = {}
  if (!form.name.trim()) e.name = t('contact_err_name')
  else if (form.name.trim().length < 2) e.name = t('contact_err_name_short')
  if (!form.email.trim()) e.email = t('contact_err_email')
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t('contact_err_email_invalid')
  if (!form.service) e.service = t('contact_err_service')
  if (!form.message.trim()) e.message = t('contact_err_message')
  else if (form.message.trim().length < 10) e.message = t('contact_err_message_short')
  else if (form.message.length > 500) e.message = t('contact_err_message_long')
  Object.assign(errors, e)
  Object.keys(errors).forEach(k => { if (!e[k]) delete errors[k] })
  return Object.keys(e).length === 0
}

function clearError(field) { delete errors[field] }

async function submitForm() {
  if (!validate()) return
  isLoading.value = true
  submitStatus.value = ''
  const serviceName = t(serviceOptions.find(s => s.value === form.service)?.labelKey || '')
  const text = `📩 <b>Yangi xabar!</b>\n\n👤 <b>Ism:</b> ${form.name}\n✉️ <b>Email:</b> ${form.email}\n📱 <b>Telefon:</b> ${form.phone || "Ko'rsatilmagan"}\n🛠 <b>Xizmat:</b> ${serviceName}\n💬 <b>Xabar:</b>\n${form.message}\n\n⏰ <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}`
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
    })
    const data = await res.json()
    if (data.ok) {
      submitStatus.value = 'success'
      form.name = ''; form.email = ''; form.phone = ''; form.service = ''; form.message = ''
      setTimeout(() => { submitStatus.value = '' }, 5000)
    } else {
      submitStatus.value = 'error'
    }
  } catch {
    submitStatus.value = 'error'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* ── Entry animation ── */
.anim-out {
  opacity: 0;
  transform: translateY(35px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.anim-in {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

/* ── Slide-fade for success/error ── */
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.35s ease; }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; transform: translateY(-10px); }
</style>