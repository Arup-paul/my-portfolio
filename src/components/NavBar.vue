<template>
  <nav class="navbar navbar-expand-lg fixed-top" id="mainNav">
    <div class="container">
      <a class="navbar-brand" href="#hero" @click.prevent="scrollTo('#hero')">
        <span class="brand-bracket">&lt;</span>Arup<span class="brand-bracket">/&gt;</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-1">
          <li class="nav-item" v-for="link in navLinks" :key="link.href">
            <a
              class="nav-link px-3"
              :class="{ active: activeSection === link.section }"
              :href="link.href"
              @click.prevent="scrollTo(link.href)"
            >{{ link.label }}</a>
          </li>
          <li class="nav-item ms-lg-2">
            <button @click="emit('open-cv')" class="btn btn-nav-cv btn-sm">
              <i class="bi bi-eye me-1"></i>CV
            </button>
          </li>
          <li class="nav-item ms-lg-1">
            <button class="theme-toggle" @click="toggleTheme" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
              <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['open-cv'])

const activeSection = ref('hero')
const isDark = ref(true)

const navLinks = [
  { label: 'Home',       href: '#hero',       section: 'hero' },
  { label: 'About',      href: '#about',      section: 'about' },
  { label: 'Skills',     href: '#skills',     section: 'skills' },
  { label: 'Experience', href: '#experience', section: 'experience' },
  { label: 'Projects',   href: '#projects',   section: 'projects' },
  { label: 'GitHub',     href: '#github',     section: 'github' },
  { label: 'Contact',    href: '#contact',    section: 'contact' },
]

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

function applyTheme(dark) {
  if (dark) {
    document.documentElement.classList.remove('light')
  } else {
    document.documentElement.classList.add('light')
  }
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}

function toggleTheme() {
  isDark.value = !isDark.value
  applyTheme(isDark.value)
}

function onScroll() {
  for (const link of [...navLinks].reverse()) {
    const el = document.getElementById(link.section)
    if (el && window.scrollY >= el.offsetTop - 90) {
      activeSection.value = link.section
      break
    }
  }
  const nav = document.getElementById('mainNav')
  nav?.classList.toggle('scrolled', window.scrollY > 50)
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  isDark.value = saved ? saved === 'dark' : true
  applyTheme(isDark.value)
  window.addEventListener('scroll', onScroll)
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
