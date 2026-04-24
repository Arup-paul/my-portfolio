<template>
  <section id="contact" class="section-padding">
    <div class="container">
      <div class="section-header text-center mb-5">
        <span class="section-tag">Get In Touch</span>
        <h2 class="section-title">Contact <span class="gradient-text">Me</span></h2>
        <div class="divider mx-auto"></div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="contact-card p-5">
            <p class="text-secondary text-center mb-5" style="font-size:1.05rem; line-height:1.8">
              I'm currently open to freelance projects and full-time remote opportunities.
              Whether you have a project in mind or just want to say hi — reach out through
              any of the channels below.
            </p>

            <div class="row g-4 mb-5">
              <div class="col-sm-6" v-for="info in contactInfo" :key="info.label">
                <a :href="info.href" class="contact-info-card">
                  <div class="contact-icon">
                    <i :class="info.icon" class="text-primary"></i>
                  </div>
                  <div>
                    <p class="contact-info-label">{{ info.label }}</p>
                    <p class="contact-info-value">{{ info.value }}</p>
                  </div>
                </a>
              </div>
            </div>

            <div class="text-center">
              <p class="text-secondary small mb-3">Find me on</p>
              <div class="d-flex gap-3 justify-content-center flex-wrap">
                <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank"
                   class="social-btn-lg" :title="s.label">
                  <i :class="s.icon" class="me-2"></i>{{ s.label }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const contactInfo = [
  { label: 'Email',        value: 'aruppaulctg@gmail.com',    href: 'mailto:aruppaulctg@gmail.com', icon: 'bi bi-envelope-fill' },
  { label: 'Whatsapp',        value: '+880 1866702189',           href: 'tel:+8801866702189',           icon: 'bi bi-whatsapp' },
  { label: 'Location',     value: 'Chattogram, BD', href: '#',                            icon: 'bi bi-geo-alt-fill' },
  { label: 'Availability', value: 'Open to remote work',       href: '#',                            icon: 'bi bi-check-circle-fill' },
]

const socials = [
  { label: 'GitHub',   href: 'https://github.com/Arup-paul',   icon: 'bi bi-github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arup-paul02/', icon: 'bi bi-linkedin' },
  { label: 'Twitter',  href: 'https://x.com/Arup_paul_bd',  icon: 'bi bi-twitter-x' },
  { label: 'Medium',   href: 'https://medium.com/@aruppaulctg',  icon: 'bi bi-medium' },
]
</script>
