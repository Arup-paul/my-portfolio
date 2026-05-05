<template>
  <section id="hero" class="hero-section d-flex align-items-center min-vh-100">
    <div class="hero-bg-grid"></div>
    <div class="hero-glow"></div>
    <div class="container position-relative">
      <div class="row align-items-center">
        <div class="col-lg-7 order-2 order-lg-1 hero-text-col">
          <div class="hero-badge mb-4">
            <span class="badge-dot"></span>
            Open to Opportunities
          </div>
          <p class="hero-greeting mb-2">Hi there, I'm</p>
          <h1 class="hero-name mb-3">Arup Paul</h1>
          <h2 class="hero-role mb-4">
            <span class="gradient-text">{{ displayedRole }}</span><span class="cursor">|</span>
          </h2>
          <p class="hero-desc mb-5">
            5+ years building scalable web applications with <strong>PHP/Laravel</strong>,
            <strong>Vue.js</strong> &amp; <strong>React</strong>. Specialized in multi-domain ERP systems,
            REST APIs, and high-performance full-stack solutions.
          </p>
          <div class="hero-btn-group mb-5">
            <a href="#projects" class="btn btn-hero-primary" @click.prevent="scrollTo('#projects')">
              <i class="bi bi-code-slash me-2"></i>View Projects
            </a>
            <button @click="emit('open-cv')" class="btn btn-hero-secondary">
              <i class="bi bi-eye me-2"></i>Preview CV
            </button>
            <a href="#contact" class="btn btn-hero-outline" @click.prevent="scrollTo('#contact')">
              <i class="bi bi-envelope me-2"></i>Hire Me
            </a>
          </div>
          <div class="d-flex gap-4 hero-socials">
            <a href="https://github.com/Arup-paul" target="_blank" class="social-icon" title="GitHub">
              <i class="bi bi-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/arup-paul02" target="_blank" class="social-icon" title="LinkedIn">
              <i class="bi bi-linkedin"></i>
            </a>
            <a href="https://x.com/Arup_paul_bd" target="_blank" class="social-icon" title="Twitter">
              <i class="bi bi-twitter-x"></i>
            </a>
            <a href="https://medium.com/@aruppaulctg" target="_blank" class="social-icon" title="Medium">
              <i class="bi bi-medium"></i>
            </a>
          </div>
        </div>
        <div class="col-lg-5 order-1 order-lg-2 text-center mb-5 mb-lg-0">
          <div class="hero-photo-wrapper mx-auto">
            <div class="hero-photo-ring ring-outer"></div>
            <div class="hero-photo-ring ring-inner"></div>
            <div class="hero-photo-frame">
              <img :src="profilePhoto" alt="Arup Paul" class="hero-photo-img" />
            </div>
            <div class="orbit orbit-1"><span></span></div>
            <div class="orbit orbit-2"><span></span></div>
            <div class="float-badge fb-1">
              <i class="bi bi-filetype-php me-1"></i>Laravel
            </div>
            <div class="float-badge fb-2">
              <i class="bi bi-code-slash me-1"></i>Vue.js
            </div>
            <div class="float-badge fb-3">
              <i class="bi bi-braces me-1"></i>React
            </div>
          </div>
        </div>
      </div>
    </div>
    <a class="scroll-indicator" href="#about" @click.prevent="scrollTo('#about')">
      <i class="bi bi-chevron-double-down"></i>
    </a>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import profilePhoto from '../assets/profile.jpeg'

const emit = defineEmits(['open-cv'])

const roles = [
  'Full Stack PHP Developer',
  'Laravel API Architect',
  'Vue.js Developer',
  'React Developer',
  'ERP Systems Builder',
]
const displayedRole = ref('')
let roleIndex = 0, charIndex = 0, deleting = false, timer = null

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

function typeEffect() {
  const cur = roles[roleIndex]
  if (!deleting) {
    displayedRole.value = cur.slice(0, ++charIndex)
    if (charIndex === cur.length) { deleting = true; timer = setTimeout(typeEffect, 2000); return }
  } else {
    displayedRole.value = cur.slice(0, --charIndex)
    if (charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length }
  }
  timer = setTimeout(typeEffect, deleting ? 55 : 100)
}

onMounted(() => { timer = setTimeout(typeEffect, 600) })
onUnmounted(() => clearTimeout(timer))
</script>
