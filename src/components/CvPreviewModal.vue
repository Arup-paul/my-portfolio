<template>
  <Teleport to="body">
    <transition name="cv-modal">
      <div v-if="modelValue" class="cv-backdrop" @click.self="close" role="dialog" aria-modal="true" aria-label="CV Preview">

        <div class="cv-modal-box">

          <!-- Header bar -->
          <div class="cv-header">
            <div class="cv-header-left">
              <div class="cv-header-icon">
                <i class="bi bi-file-earmark-person"></i>
              </div>
              <div>
                <div class="cv-header-title">Arup Paul — Resume</div>
                <div class="cv-header-sub">Full Stack Developer</div>
              </div>
            </div>
            <div class="cv-header-actions">
              <a href="/Arup_paul.pdf" target="_blank" rel="noopener" class="cv-action-btn" title="Open in new tab">
                <i class="bi bi-box-arrow-up-right"></i>
                <span class="cv-btn-label">New tab</span>
              </a>
              <a href="/Arup_paul.pdf" download="Arup_Paul_Resume.pdf" class="cv-action-btn cv-action-download" title="Download PDF">
                <i class="bi bi-download"></i>
                <span class="cv-btn-label">Download</span>
              </a>
              <button class="cv-close-btn" @click="close" aria-label="Close preview">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>

          <!-- PDF viewer area -->
          <div class="cv-viewer-wrap">
            <!-- Native embed — works in all modern browsers -->
            <iframe
              v-if="useIframe"
              :src="`/Arup_paul.pdf#toolbar=0&navpanes=0&scrollbar=1`"
              class="cv-iframe"
              title="CV Preview"
              @error="useIframe = false"
            ></iframe>

            <!-- Fallback for browsers that block iframes for PDFs -->
            <div v-else class="cv-fallback">
              <div class="cv-fallback-icon">
                <i class="bi bi-file-earmark-pdf"></i>
              </div>
              <p class="cv-fallback-text">Your browser doesn't support inline PDF preview.</p>
              <div class="d-flex gap-3 justify-content-center flex-wrap">
                <a href="/Arup_paul.pdf" target="_blank" rel="noopener" class="btn-cv-fallback">
                  <i class="bi bi-box-arrow-up-right me-2"></i>Open PDF
                </a>
                <a href="/Arup_paul.pdf" download="Arup_Paul_Resume.pdf" class="btn-cv-fallback btn-cv-fallback-outline">
                  <i class="bi bi-download me-2"></i>Download
                </a>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="cv-footer">
            <span class="cv-footer-name">Arup_Paul_Resume.pdf</span>
            <a href="/Arup_paul.pdf" download="Arup_Paul_Resume.pdf" class="cv-footer-download">
              <i class="bi bi-download me-1"></i>Save a copy
            </a>
          </div>

        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])

const useIframe = ref(true)

function close() {
  emit('update:modelValue', false)
}

// Lock body scroll when open
watch(() => props.modelValue, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
  if (val) useIframe.value = true   // reset iframe on each open
})

// Close on Escape
function onKey(e) {
  if (e.key === 'Escape') close()
}
import { onMounted, onUnmounted } from 'vue'
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ── Backdrop ── */
.cv-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

/* ── Modal box ── */
.cv-modal-box {
  width: 100%;
  max-width: 860px;
  height: 90vh;
  max-height: 920px;
  background: var(--bg-alt);
  border: 1px solid rgba(99,102,241,0.25);
  border-radius: 20px;
  box-shadow:
    0 0 0 1px rgba(99,102,241,0.1),
    0 40px 80px rgba(0,0,0,0.6),
    0 0 60px rgba(99,102,241,0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ── Header ── */
.cv-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--card-border);
  background: var(--card);
  flex-shrink: 0;
}
.cv-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.cv-header-icon {
  width: 40px; height: 40px;
  border-radius: 10px;
  background: rgba(99,102,241,0.15);
  border: 1px solid rgba(99,102,241,0.25);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem;
  color: var(--primary);
}
.cv-header-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-bright);
  line-height: 1.2;
}
.cv-header-sub {
  font-size: 0.75rem;
  color: var(--text);
}
.cv-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.cv-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--card-border);
  color: var(--text);
  font-size: 0.8rem;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  white-space: nowrap;
}
.cv-action-btn:hover {
  background: rgba(99,102,241,0.12);
  border-color: rgba(99,102,241,0.4);
  color: var(--text-bright);
}
.cv-action-download {
  background: linear-gradient(135deg, var(--primary), var(--primary-end));
  border-color: transparent;
  color: #fff;
}
.cv-action-download:hover {
  opacity: 0.88;
  background: linear-gradient(135deg, var(--primary), var(--primary-end));
  border-color: transparent;
  color: #fff;
}
.cv-close-btn {
  width: 34px; height: 34px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  color: var(--text);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.cv-close-btn:hover {
  background: rgba(248,113,113,0.12);
  border-color: rgba(248,113,113,0.4);
  color: #f87171;
}

/* ── Viewer ── */
.cv-viewer-wrap {
  flex: 1;
  overflow: hidden;
  background: #2d2d2d;
  position: relative;
}
.cv-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

/* ── Fallback ── */
.cv-fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
  padding: 32px;
  text-align: center;
}
.cv-fallback-icon {
  font-size: 3.5rem;
  color: var(--primary);
  opacity: 0.6;
}
.cv-fallback-text {
  color: var(--text);
  font-size: 0.95rem;
}
.btn-cv-fallback {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, var(--primary), var(--primary-end));
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
}
.btn-cv-fallback:hover { opacity: 0.88; transform: translateY(-2px); color: #fff; }
.btn-cv-fallback-outline {
  background: transparent;
  border: 1px solid var(--card-border);
  color: var(--text);
}
.btn-cv-fallback-outline:hover { border-color: var(--primary); color: var(--text-bright); background: transparent; }

/* ── Footer ── */
.cv-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-top: 1px solid var(--card-border);
  background: var(--card);
  flex-shrink: 0;
}
.cv-footer-name {
  font-size: 0.78rem;
  color: var(--text);
}
.cv-footer-download {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--primary);
  text-decoration: none;
  transition: color 0.2s;
  display: flex;
  align-items: center;
}
.cv-footer-download:hover { color: var(--primary-end); }

/* ── Transition ── */
.cv-modal-enter-active,
.cv-modal-leave-active {
  transition: opacity 0.25s ease;
}
.cv-modal-enter-active .cv-modal-box,
.cv-modal-leave-active .cv-modal-box {
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease;
}
.cv-modal-enter-from,
.cv-modal-leave-to {
  opacity: 0;
}
.cv-modal-enter-from .cv-modal-box {
  transform: scale(0.92) translateY(20px);
  opacity: 0;
}
.cv-modal-leave-to .cv-modal-box {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}

/* ── Light mode ── */
html.light .cv-modal-box {
  background: #f0eee6;
  border-color: rgba(196,104,73,0.2);
  box-shadow:
    0 0 0 1px rgba(196,104,73,0.1),
    0 40px 80px rgba(20,20,19,0.15);
}
html.light .cv-header,
html.light .cv-footer {
  background: rgba(255,255,255,0.85);
  border-color: rgba(20,20,19,0.1);
}
html.light .cv-action-btn {
  background: rgba(20,20,19,0.05);
  border-color: rgba(20,20,19,0.12);
  color: #3d3d3a;
}
html.light .cv-action-btn:hover {
  background: rgba(196,104,73,0.08);
  border-color: rgba(196,104,73,0.35);
  color: #141413;
}
html.light .cv-close-btn {
  background: rgba(20,20,19,0.05);
  border-color: rgba(20,20,19,0.12);
  color: #3d3d3a;
}
html.light .cv-viewer-wrap { background: #525659; }
html.light .cv-footer-name { color: #6b7280; }

/* ── Label hide on small screens ── */
@media (max-width: 480px) {
  .cv-btn-label { display: none; }
  .cv-action-btn { padding: 6px 9px; }
  .cv-modal-box { border-radius: 14px; height: 95vh; }
  .cv-header { padding: 12px 14px; }
  .cv-footer { padding: 8px 14px; }
}
</style>
