<template>
  <section id="about" class="section-padding">
    <div class="container">
      <div class="section-header text-center mb-5">
        <span class="section-tag">Get To Know Me</span>
        <h2 class="section-title">About <span class="gradient-text">Me</span></h2>
        <div class="divider mx-auto"></div>
      </div>
      <div class="row align-items-center g-5">
        <div class="col-lg-5 text-center">
          <div class="about-img-wrapper mx-auto">
            <div class="about-photo-frame">
              <img :src="profilePhoto" alt="Arup Paul" class="about-photo-img" />
            </div>
            <div class="stat-badge stat-top">
              <span class="stat-num">5+</span>
              <span class="stat-label">Years Exp.</span>
            </div>
            <div class="stat-badge stat-bottom">
              <span class="stat-num">10+</span>
              <span class="stat-label">Projects</span>
            </div>
          </div>
        </div>
        <div class="col-lg-7">
          <h3 class="about-subtitle mb-3">
            A dedicated <span class="gradient-text">Software Engineer</span> from Bangladesh
          </h3>
          <p class="about-text mb-3">
            I specialize in building scalable and high-performance web applications with over
            <strong>5 years</strong> in PHP &amp; Laravel, <strong>4+ years</strong> in Vue.js,
            and <strong>2+ years</strong> in React. I've worked on multi-domain ERP systems
            covering hospital, HRM, vessel management, and service platforms.
          </p>
          <p class="about-text mb-4">
            I leverage AI tools like ChatGPT and Claude to boost productivity while maintaining
            strong engineering practices. My goal is to build impactful software and continuously
            grow with modern technologies.
          </p>
          <div class="row g-3 mb-4">
            <div class="col-sm-6" v-for="info in personalInfo" :key="info.label">
              <div class="info-row">
                <i :class="info.icon" class="text-primary me-2"></i>
                <span class="info-label">{{ info.label }}:</span>
                <span class="info-value ms-1">{{ info.value }}</span>
              </div>
            </div>
          </div>
          <div class="d-flex gap-3 flex-wrap">
            <a href="/Arup_paul.pdf" download class="btn btn-hero-primary">
              <i class="bi bi-download me-2"></i>Download CV
            </a>
            <a href="#contact" class="btn btn-hero-outline" @click.prevent="scrollTo('#contact')">
              <i class="bi bi-envelope me-2"></i>Contact Me
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import profilePhoto from '../assets/profile.jpg'

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

const personalInfo = [
  { label: 'Name',         value: 'Arup Paul',                   icon: 'bi bi-person-fill' },
  { label: 'Email',        value: 'aruppaulctg@gmail.com',        icon: 'bi bi-envelope-fill' },
  { label: 'Whatsapp',        value: '+880 1866702189',              icon: 'bi bi-whatsapp' },
  { label: 'Location',     value: 'Chattogram, Bangladesh',        icon: 'bi bi-geo-alt-fill' },
  { label: 'Degree',       value: 'B.Sc. CSE – East Delta Univ.', icon: 'bi bi-mortarboard-fill' },
  { label: 'Availability', value: 'Open to work',                 icon: 'bi bi-check-circle-fill' },
]
</script>
