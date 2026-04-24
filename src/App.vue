<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <ProjectsSection />
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
</template>
