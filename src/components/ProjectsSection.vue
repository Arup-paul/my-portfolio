<template>
  <section id="projects" class="section-padding fade-section" :class="{ visible }">
    <div class="container">
      <div class="section-header text-center mb-5">
        <span class="section-tag">What I've Built</span>
        <h2 class="section-title">My <span class="gradient-text">Projects</span></h2>
        <div class="divider mx-auto"></div>
      </div>

      <div class="d-flex justify-content-center gap-2 flex-wrap mb-5">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-btn"
          :class="{ active: activeFilter === cat }"
          @click="activeFilter = cat"
        >
          {{ cat }}
        </button>
      </div>

      <div class="row g-4">
        <div
          class="col-md-6 col-lg-4"
          v-for="(project, pIdx) in filteredProjects"
          :key="project.title"
        >
          <div class="project-card h-100">
            <!-- Image area -->
            <div
              class="project-img"
              :style="project.images && project.images.length ? {} : { background: project.gradient }"
            >
              <!-- Screenshot carousel -->
              <template v-if="project.images && project.images.length">
                <img
                  :src="project.images[getSlide(pIdx)]"
                  class="project-screenshot"
                  :alt="project.title + ' screenshot'"
                  @click="openLightbox(pIdx, getSlide(pIdx))"
                />

                <div v-if="project.images.length > 1" class="slide-dots">
                  <button
                    v-for="(_, i) in project.images"
                    :key="i"
                    class="slide-dot"
                    :class="{ active: getSlide(pIdx) === i }"
                    @click.stop="setSlide(pIdx, i)"
                  ></button>
                </div>

                <button
                  v-if="project.images.length > 1"
                  class="slide-arrow slide-prev"
                  @click.stop="prevSlide(pIdx, project.images.length)"
                >
                  <i class="bi bi-chevron-left"></i>
                </button>
                <button
                  v-if="project.images.length > 1"
                  class="slide-arrow slide-next"
                  @click.stop="nextSlide(pIdx, project.images.length)"
                >
                  <i class="bi bi-chevron-right"></i>
                </button>

                <button class="img-expand-btn" @click.stop="openLightbox(pIdx, getSlide(pIdx))" title="View full size">
                  <i class="bi bi-arrows-fullscreen"></i>
                </button>
              </template>

              <!-- Gradient fallback -->
              <template v-else>
                <div class="project-img-inner">
                  <i :class="project.icon"></i>
                </div>
              </template>

              <span class="project-cat-badge">{{ project.category }}</span>
            </div>

            <div class="p-4">
              <h5 class="project-title mb-2">{{ project.title }}</h5>
              <p class="project-desc mb-3">{{ project.description }}</p>
              <div class="d-flex flex-wrap gap-1 mb-4">
                <span class="tech-tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
              </div>
              <div class="d-flex gap-2 align-items-center">
                <a
                  v-if="project.demo && project.demo !== '#'"
                  :href="project.demo"
                  target="_blank"
                  class="btn btn-proj-primary btn-sm"
                >
                  <i class="bi bi-eye me-1"></i>Live Demo
                </a>
                <span v-else class="btn btn-proj-primary btn-sm disabled opacity-50">
                  <i class="bi bi-lock me-1"></i>Private
                </span>
                <a
                  v-if="project.repo && project.repo !== '#'"
                  :href="project.repo"
                  target="_blank"
                  class="btn btn-proj-outline btn-sm"
                >
                  <i class="bi bi-github me-1"></i>Code
                </a>
                <span v-else class="btn btn-proj-outline btn-sm disabled opacity-50">
                  <i class="bi bi-lock me-1"></i>Private
                </span>
                <span
                  v-if="project.images && project.images.length > 1"
                  class="img-count-badge ms-auto"
                >
                  <i class="bi bi-images me-1"></i>{{ project.images.length }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="lightbox.open" class="proj-lightbox" @click.self="closeLightbox">
        <div class="proj-lightbox-inner">
          <button class="lb-close" @click="closeLightbox"><i class="bi bi-x-lg"></i></button>

          <button v-if="lightboxImages.length > 1" class="lb-arrow lb-prev" @click="lbPrev">
            <i class="bi bi-chevron-left"></i>
          </button>

          <img
            :src="lightboxImages[lightbox.imgIdx]"
            class="lb-img"
            :alt="'Screenshot ' + (lightbox.imgIdx + 1)"
          />

          <button v-if="lightboxImages.length > 1" class="lb-arrow lb-next" @click="lbNext">
            <i class="bi bi-chevron-right"></i>
          </button>

          <div v-if="lightboxImages.length > 1" class="lb-counter">
            {{ lightbox.imgIdx + 1 }} / {{ lightboxImages.length }}
          </div>

          <div v-if="lightboxImages.length > 1" class="lb-thumbs">
            <img
              v-for="(src, i) in lightboxImages"
              :key="i"
              :src="src"
              class="lb-thumb"
              :class="{ active: lightbox.imgIdx === i }"
              @click="lightbox.imgIdx = i"
              :alt="'thumb ' + (i + 1)"
            />
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useFadeIn } from '../composables/useFadeIn'

const { visible } = useFadeIn('projects')

const activeFilter = ref('All')
const categories = ['All', 'Maritime', 'ERP', 'SaaS', 'E-Finance', 'Social']

// Add screenshots to any project by filling its `images` array with paths
// relative to /public, e.g. images: ['/screenshots/mi-erp-1.png', '/screenshots/mi-erp-2.png']
// Leave the array empty (or omit it) to show the gradient background instead.
const projects = [
  {
    title: 'mi ERP – Industry Specific ERP',
    description: 'Full-scale ERP for SMEs covering Supply Chain & Procurement, Manufacturing, Inventory, CRM/Sales, Project Management, Accounting, HRM & Payroll, Fixed Assets, and Compliance. Includes specialized vertical modules: HospitalOS, DentalOS, FactoryOS, NGO OS, RealEstate OS & ServiceOS. Features miAccounts — a complete Accounting, Inventory & VAT/Tax compliance solution tailored for Bangladesh.',
    icon: 'bi bi-diagram-3',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #3b0764 40%, #6d1b7b 100%)',
    category: 'ERP',
    tags: ['Laravel', 'PHP', 'MySQL', 'Vue', 'Bootstrap', 'REST API'],
    demo: 'https://musketeersidea.com/',
    repo: '#',
    images: [],
  },
  {
    title: 'SPD',
    description: 'Vessel-wise Salary, Portage Bill & crew management system built for Global MariCruit (Singapore). Handles complete crew payroll per vessel, generates portage bills, manages crew records and contracts, and produces detailed salary & disbursement reports for the maritime finance team.',
    icon: 'bi bi-radar',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #0d2d5e 40%, #1a4a8a 100%)',
    category: 'Maritime',
    tags: ['Laravel', 'PHP', 'MySQL', 'React', 'REST API', 'Bootstrap'],
    demo: '#',
    repo: '#',
    images: [],
  },
  {
    title: 'Vessel Dashboard',
    description: 'All-in-one vessel operations management system for Global MariCruit. Manages onboard equipment operations including crane, grab, and other tools, tracks equipment maintenance schedules, and covers all vessel operational activities. Features a comprehensive reporting dashboard giving management full visibility into vessel performance, equipment status, and operational summaries.',
    icon: 'bi bi-speedometer2',
    gradient: 'linear-gradient(135deg, #0d1f2d 0%, #0a3d4a 40%, #0e6b7a 100%)',
    category: 'Maritime',
    tags: ['Laravel', 'PHP', 'MySQL', 'Chart.js', 'Bootstrap'],
    demo: '#',
    repo: '#',
    images: [],
  },
  {
    title: 'Garments HR System',
    description: 'HR management module built for a garments factory. Covers employee onboarding, attendance tracking, leave management, payroll processing, and HR reporting — streamlining the entire human resource workflow for factory floor and admin staff.',
    icon: 'bi bi-people',
    gradient: 'linear-gradient(135deg, #1a1200 0%, #3d2c00 40%, #7a5c00 100%)',
    category: 'ERP',
    tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    demo: '#',
    repo: '#',
    images: [],
  },
  {
    title: 'PMS – Planned Maintenance System',
    description: 'Maritime Planned Maintenance System for scheduling and tracking preventive and corrective maintenance of vessel machinery and equipment. Manages maintenance jobs, spare parts inventory, service intervals, and compliance checklists to ensure vessels meet ISM Code and class requirements.',
    icon: 'bi bi-tools',
    gradient: 'linear-gradient(135deg, #1a0808 0%, #4a1010 40%, #8b1a1a 100%)',
    category: 'Maritime',
    tags: ['Laravel', 'PHP', 'MySQL', 'Vue', 'Bootstrap', 'REST API'],
    demo: '#',
    repo: '#',
    images: [],
  },
  {
    title: 'OpenSaaS',
    description: 'Sell Your Skills As A Subscription (SaaS). A platform enabling freelancers and agencies to package and sell services as recurring subscriptions with billing management.',
    icon: 'bi bi-cloud-upload',
    gradient: 'linear-gradient(135deg, #0a1a3d 0%, #1a3a7a 40%, #2563eb 100%)',
    category: 'SaaS',
    tags: ['Laravel', 'Ajax', 'jQuery', 'JavaScript', 'PHP', 'MySQL'],
    demo: 'https://codecanyon.net/item/opensaas-multi-level-subscription-selling-platform/38629226?s_rank=13',
    repo: '#',
    images: [],
  },
  {
    title: 'DigitalSell',
    description: 'Digital Product And Subscription Selling Platform (SaaS). Allows creators to sell digital products, e-books, templates, and software with subscription management.',
    icon: 'bi bi-cart-check',
    gradient: 'linear-gradient(135deg, #0a1f0a 0%, #1a4a1a 40%, #166534 100%)',
    category: 'SaaS',
    tags: ['Laravel', 'Ajax', 'jQuery', 'JavaScript', 'PHP', 'MySQL'],
    demo: 'https://codecanyon.net/item/digitalsell-digital-product-and-subscription-selling-platform-saas/39916691?s_rank=12',
    repo: '#',
    images: [],
  },
  {
    title: 'BuyMeTea',
    description: 'Ultimate creator support and social media platform. Fans can support their favourite creators with one-time or recurring contributions, with a built-in social feed.',
    icon: 'bi bi-cup-hot',
    gradient: 'linear-gradient(135deg, #1a0f00 0%, #4a2800 40%, #92400e 100%)',
    category: 'Social',
    tags: ['Laravel', 'PHP', 'Firebase', 'Ajax', 'JavaScript', 'jQuery', 'MySQL'],
    demo: 'https://codecanyon.net/item/buymetea-ultimate-support-creators-and-social-media-platform/40497876?s_rank=11',
    repo: '#',
    images: [],
  },
  {
    title: 'SHONGJOGyou',
    description: 'E-Finance Solution – a full-stack SPA for managing digital financial transactions, wallets, transfers, and financial reporting with real-time updates.',
    icon: 'bi bi-currency-exchange',
    gradient: 'linear-gradient(135deg, #001a2c 0%, #003a5c 40%, #0369a1 100%)',
    category: 'E-Finance',
    tags: ['Laravel', 'REST API', 'React', 'Redux', 'MySQL'],
    demo: '#',
    repo: '#',
    images: [],
  },
]

const filteredProjects = computed(() =>
  activeFilter.value === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter.value)
)

// Per-card active slide index
const activeSlide = reactive({})

function getSlide(pIdx) {
  return activeSlide[pIdx] !== undefined ? activeSlide[pIdx] : 0
}
function setSlide(pIdx, i) {
  activeSlide[pIdx] = i
}
function nextSlide(pIdx, len) {
  activeSlide[pIdx] = (getSlide(pIdx) + 1) % len
}
function prevSlide(pIdx, len) {
  activeSlide[pIdx] = (getSlide(pIdx) - 1 + len) % len
}

// Lightbox
const lightbox = reactive({ open: false, pIdx: -1, imgIdx: 0 })
const lightboxImages = computed(() =>
  lightbox.pIdx >= 0 ? (filteredProjects.value[lightbox.pIdx]?.images ?? []) : []
)

function openLightbox(pIdx, imgIdx) {
  if (!filteredProjects.value[pIdx]?.images?.length) return
  lightbox.pIdx = pIdx
  lightbox.imgIdx = imgIdx
  lightbox.open = true
  document.body.style.overflow = 'hidden'
}
function closeLightbox() {
  lightbox.open = false
  document.body.style.overflow = ''
}
function lbNext() {
  lightbox.imgIdx = (lightbox.imgIdx + 1) % lightboxImages.value.length
}
function lbPrev() {
  lightbox.imgIdx = (lightbox.imgIdx - 1 + lightboxImages.value.length) % lightboxImages.value.length
}
</script>

<style scoped>
.project-screenshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  cursor: zoom-in;
  transition: transform 0.35s ease;
}
.project-card:hover .project-screenshot { transform: scale(1.03); }

.slide-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,255,255,0.18);
  color: #fff;
  width: 30px; height: 30px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem;
  cursor: pointer;
  opacity: 0;
  z-index: 4;
  backdrop-filter: blur(4px);
  transition: background 0.2s, opacity 0.2s;
}
.slide-prev { left: 8px; }
.slide-next { right: 8px; }
.project-img:hover .slide-arrow { opacity: 1; }
.slide-arrow:hover { background: rgba(99,102,241,0.7); }

.slide-dots {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  z-index: 4;
}
.slide-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.4);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, transform 0.2s;
}
.slide-dot.active { background: #fff; transform: scale(1.3); }

.img-expand-btn {
  position: absolute;
  top: 8px; left: 8px;
  background: rgba(0,0,0,0.45);
  border: 1px solid rgba(255,255,255,0.18);
  color: #fff;
  width: 28px; height: 28px;
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.72rem;
  cursor: pointer;
  opacity: 0;
  z-index: 4;
  backdrop-filter: blur(4px);
  transition: opacity 0.2s, background 0.2s;
}
.project-img:hover .img-expand-btn { opacity: 1; }
.img-expand-btn:hover { background: rgba(99,102,241,0.7); }

.img-count-badge {
  font-size: 0.72rem;
  color: var(--text);
  background: rgba(99,102,241,0.1);
  border: 1px solid rgba(99,102,241,0.2);
  border-radius: 20px;
  padding: 2px 10px;
}

/* Lightbox */
.proj-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.88);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  animation: lbFadeIn 0.2s ease;
}
@keyframes lbFadeIn { from { opacity: 0 } to { opacity: 1 } }

.proj-lightbox-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: min(90vw, 1100px);
  max-height: 92vh;
  width: 100%;
}

.lb-img {
  max-width: 100%;
  max-height: 72vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.7);
  display: block;
}

.lb-close {
  position: absolute;
  top: -40px; right: 0;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}
.lb-close:hover { background: rgba(220,38,38,0.7); }

.lb-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  width: 44px; height: 44px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  z-index: 2;
}
.lb-prev { left: -56px; }
.lb-next { right: -56px; }
.lb-arrow:hover { background: rgba(99,102,241,0.6); }

.lb-counter {
  margin-top: 12px;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.05em;
}

.lb-thumbs {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  max-width: 100%;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: thin;
}
.lb-thumb {
  width: 64px; height: 44px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  opacity: 0.55;
  flex-shrink: 0;
  transition: opacity 0.2s, border-color 0.2s;
}
.lb-thumb.active,
.lb-thumb:hover { opacity: 1; border-color: var(--primary); }

@media (max-width: 767px) {
  .lb-prev { left: 4px; }
  .lb-next { right: 4px; }
  .lb-arrow { width: 36px; height: 36px; font-size: 0.9rem; }
}
</style>
