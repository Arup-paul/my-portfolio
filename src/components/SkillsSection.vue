<template>
  <section id="skills" class="section-padding alt-bg fade-section" :class="{ visible }">
    <div class="container">
      <div class="section-header text-center mb-5">
        <span class="section-tag">What I Know</span>
        <h2 class="section-title">My <span class="gradient-text">Skills</span></h2>
        <div class="divider mx-auto"></div>
      </div>

      <div class="row g-4 mb-5">
        <div class="col-md-6" v-for="skill in skills" :key="skill.name">
          <div class="skill-item">
            <div class="d-flex justify-content-between mb-2">
              <span class="skill-name">
                <i :class="skill.icon" class="me-2 text-primary"></i>{{ skill.name }}
              </span>
              <span class="skill-pct">{{ skill.level }}%</span>
            </div>
            <div class="skill-track">
              <div
                class="skill-fill"
                :style="{ width: animated ? skill.level + '%' : '0%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <h4 class="text-center mb-4 fw-semibold section-title">Technologies &amp; <span class="gradient-text">Tools</span></h4>
      <div class="row g-3 justify-content-center">
        <div class="col-6 col-sm-4 col-md-3 col-lg-2" v-for="tech in technologies" :key="tech.name">
          <div class="tech-card text-center p-3">
            <i :class="tech.icon" class="fs-2 text-primary mb-2 d-block"></i>
            <span class="small text-secondary">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFadeIn } from '../composables/useFadeIn'

const { visible } = useFadeIn('skills')
const animated = ref(false)

const skills = [
  { name: 'Laravel / PHP',              icon: 'bi bi-filetype-php',  level: 85 },
  { name: 'Vue.js',                     icon: 'bi bi-code-slash',    level: 80 },
  { name: 'React / Redux',              icon: 'bi bi-braces',        level: 72 },
  { name: 'JavaScript',                 icon: 'bi bi-filetype-js',   level: 78 },
  { name: 'MySQL',                      icon: 'bi bi-database',      level: 80 },
  { name: 'REST API Design',            icon: 'bi bi-diagram-3',     level: 82 },
  { name: 'HTML / CSS / Bootstrap',     icon: 'bi bi-filetype-html', level: 80 },
  { name: 'Linux / Git / CI',           icon: 'bi bi-terminal',      level: 68 },
]

const technologies = [
  { name: 'Laravel',      icon: 'bi bi-filetype-php' },
  { name: 'PHP',          icon: 'bi bi-code' },
  { name: 'Vue.js',       icon: 'bi bi-code-slash' },
  { name: 'React',        icon: 'bi bi-braces' },
  { name: 'JavaScript',   icon: 'bi bi-filetype-js' },
  { name: 'MySQL',        icon: 'bi bi-database' },
  { name: 'Redux',        icon: 'bi bi-arrow-repeat' },
  { name: 'jQuery',       icon: 'bi bi-code-square' },
  { name: 'REST API',     icon: 'bi bi-arrow-left-right' },
  { name: 'Bootstrap',    icon: 'bi bi-bootstrap' },
  { name: 'Linux',        icon: 'bi bi-terminal' },
  { name: 'Git',          icon: 'bi bi-git' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => { animated.value = true }, 200)
        observer.disconnect()
      }
    },
    { threshold: 0.2 }
  )
  const el = document.getElementById('skills')
  if (el) observer.observe(el)
})
</script>
