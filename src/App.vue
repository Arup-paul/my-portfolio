<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import GitHubStatsSection from './components/GitHubStatsSection.vue'
import ContactSection from './components/ContactSection.vue'
import CvPreviewModal from './components/CvPreviewModal.vue'

const showScrollTop = ref(false)
const cvOpen = ref(false)

function onScroll() {
  showScrollTop.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <NavBar @open-cv="cvOpen = true" />
  <main>
    <HeroSection @open-cv="cvOpen = true" />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <ProjectsSection />
    <GitHubStatsSection />
    <ContactSection />
  </main>
  <footer class="site-footer">
    <div class="container text-center">
      <p class="mb-1">
        Designed &amp; built by <span class="gradient-text fw-semibold">Arup Paul</span>
      </p>
      <p class="mb-0 small text-secondary">&copy; {{ new Date().getFullYear() }} · All rights reserved</p>
    </div>
  </footer>

  <CvPreviewModal v-model="cvOpen" />

  <button
    class="scroll-top-btn"
    :class="{ hidden: !showScrollTop }"
    @click="scrollToTop"
    aria-label="Scroll to top"
  >
    <i class="bi bi-chevron-up"></i>
  </button>
</template>
