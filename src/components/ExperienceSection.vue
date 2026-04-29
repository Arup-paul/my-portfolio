<template>
  <section id="experience" class="section-padding alt-bg fade-section" :class="{ visible }">
    <div class="container">
      <div class="section-header text-center mb-5">
        <span class="section-tag">My Journey</span>
        <h2 class="section-title">Work <span class="gradient-text">Experience</span></h2>
        <div class="divider mx-auto"></div>
      </div>

      <div class="row g-5">
        <!-- Work History -->
        <div class="col-lg-7">
          <h4 class="exp-group-title mb-4">
            <i class="bi bi-briefcase-fill text-primary me-2"></i>Work History
          </h4>
          <div class="timeline">
            <div class="timeline-item" v-for="job in jobs" :key="job.company">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="d-flex justify-content-between flex-wrap gap-2 mb-1">
                  <h6 class="tl-title mb-0">{{ job.title }}</h6>
                  <span class="tl-period">{{ job.period }}</span>
                </div>
                <p class="tl-company mb-2">
                  <i class="bi bi-building me-1"></i>{{ job.company }}
                  <span class="tl-location ms-2"><i class="bi bi-geo-alt me-1"></i>{{ job.location }}</span>
                </p>
                <ul class="tl-points mb-0">
                  <li v-for="pt in job.points" :key="pt">{{ pt }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Education + Certs -->
        <div class="col-lg-5">
          <h4 class="exp-group-title mb-4">
            <i class="bi bi-mortarboard-fill text-primary me-2"></i>Education
          </h4>
          <div class="timeline mb-5">
            <div class="timeline-item" v-for="edu in education" :key="edu.institution">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="d-flex justify-content-between flex-wrap gap-2 mb-1">
                  <h6 class="tl-title mb-0">{{ edu.degree }}</h6>
                  <span class="tl-period">{{ edu.period }}</span>
                </div>
                <p class="tl-company mb-1">
                  <i class="bi bi-geo-alt me-1"></i>{{ edu.institution }}
                </p>
                <p class="tl-desc mb-0">{{ edu.location }}</p>
              </div>
            </div>
          </div>

          <h4 class="exp-group-title mb-4">
            <i class="bi bi-trophy-fill text-primary me-2"></i>Certifications
          </h4>
          <div class="d-flex flex-column gap-3">
            <div class="cert-card d-flex align-items-center gap-3 p-3" v-for="cert in certifications" :key="cert.name">
              <div class="cert-icon">
                <i :class="cert.icon" class="fs-4 text-primary"></i>
              </div>
              <div>
                <p class="cert-name fw-semibold mb-0 small">{{ cert.name }}</p>
                <p class="text-secondary mb-0" style="font-size:0.78rem">{{ cert.issuer }}</p>
                <div class="d-flex flex-wrap gap-1 mt-1">
                  <span class="tech-tag" v-for="t in cert.topics" :key="t">{{ t }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useFadeIn } from '../composables/useFadeIn'
const { visible } = useFadeIn('experience')

const jobs = [
  {
    title: 'Software Engineer',
    company: 'Musketeers Idea Ltd',
    location: 'Dhaka (Remote)',
    period: '12/2024 – Present',
    points: [
      'Developed & maintained a scalable multi-domain ERP platform (Hospital, Dental, HRM, NGO, SDM)',
      'Contributed across CRM, Inventory, Accounting, Payroll, and Manufacturing modules',
      'Designed modular ERP architecture for rapid customization across diverse business domains',
      'Optimized database queries to handle large-scale datasets and improve system performance',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Global Maricruit',
    location: 'Remote',
    period: '09/2022 – 11/2024',
    points: [
      'Maintained and optimized in-house software (refactoring, debugging, performance tuning)',
      'Built Laravel-based APIs and SPA apps with React & Vue.js',
      'Developed vessel management systems (SPD, PMS, Operations)',
      'Created offline–online synchronization for vessel apps with unreliable connectivity',
      'Contributed to Garments ERP HR module with customization',
    ],
  },
  {
    title: 'Web Developer',
    company: 'AMCoders',
    location: 'Remote, Bangladesh',
    period: '03/2022 – 08/2022',
    points: [
      'Developed Laravel-based web applications for Codecanyon marketplace',
      'Integrated payment gateways and third-party APIs',
      'Maintained and enhanced existing web applications',
    ],
  },
  {
    title: 'Web Developer',
    company: 'SHONGJOGyou',
    location: 'Chattogram',
    period: '11/2020 – 02/2022',
    points: [
      'Built highly responsive UI components with React',
      'Developed Laravel REST API and React-based SPA',
      'Maintained and scaled the e-finance web application',
    ],
  },
]

const education = [
  {
    degree: 'B.Sc. in Computer Science & Engineering',
    institution: 'East Delta University',
    location: 'Chattogram, Bangladesh',
    period: '08/2019 – 12/2022',
  },
  {
    degree: 'Diploma in Computer Technology',
    institution: 'Chittagong Polytechnic Institute',
    location: 'Chattogram, Bangladesh',
    period: '08/2014 – 08/2018',
  },
]

const certifications = [
  {
    name: 'Think In Redux Way',
    issuer: 'Online Certification',
    icon: 'bi bi-arrow-repeat',
    topics: ['Redux', 'React-Redux', 'Redux-Toolkit', 'RTK Query'],
  },
]
</script>
