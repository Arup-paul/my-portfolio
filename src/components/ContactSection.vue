<template>
  <section id="contact" class="section-padding fade-section" :class="{ visible }">
    <div class="container">
      <div class="section-header text-center mb-5">
        <span class="section-tag">Get In Touch</span>
        <h2 class="section-title">Contact <span class="gradient-text">Me</span></h2>
        <div class="divider mx-auto"></div>
      </div>

      <div class="row g-5 justify-content-center">

        <!-- Left: info + socials -->
        <div class="col-lg-5">
          <div class="contact-card p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <p class="text-secondary mb-4" style="font-size:1.05rem; line-height:1.8">
                I'm currently open to freelance projects and full-time remote opportunities.
                Whether you have a project in mind or just want to say hi — reach out!
              </p>
              <div class="d-flex flex-column gap-3 mb-4">
                <a v-for="info in contactInfo" :key="info.label" :href="info.href" class="contact-info-card">
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
            <div>
              <p class="text-secondary small mb-3">Find me on</p>
              <div class="d-flex gap-3 flex-wrap">
                <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank"
                   class="social-btn-lg" :title="s.label">
                  <i :class="s.icon" class="me-2"></i>{{ s.label }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: contact form -->
        <div class="col-lg-7">
          <div class="contact-card p-4">
            <h5 class="text-bright fw-semibold mb-4">Send a Message</h5>

            <div v-if="formState === 'success'" class="alert-success-custom text-center py-4">
              <i class="bi bi-check-circle-fill fs-2 text-success mb-2 d-block"></i>
              <p class="fw-semibold mb-1">Message sent!</p>
              <p class="text-secondary small">I'll get back to you as soon as possible.</p>
            </div>

            <form v-else @submit.prevent="submitForm" novalidate>
              <div class="row g-3">
                <div class="col-sm-6">
                  <label class="form-label-custom">Your Name</label>
                  <input
                    v-model="form.name"
                    type="text"
                    class="form-input-custom"
                    :class="{ 'input-error': errors.name }"
                    placeholder="John Doe"
                  />
                  <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
                </div>
                <div class="col-sm-6">
                  <label class="form-label-custom">Email Address</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-input-custom"
                    :class="{ 'input-error': errors.email }"
                    placeholder="john@example.com"
                  />
                  <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
                </div>
                <div class="col-12">
                  <label class="form-label-custom">Subject</label>
                  <input
                    v-model="form.subject"
                    type="text"
                    class="form-input-custom"
                    :class="{ 'input-error': errors.subject }"
                    placeholder="Project inquiry / Job opportunity"
                  />
                  <span v-if="errors.subject" class="field-error">{{ errors.subject }}</span>
                </div>
                <div class="col-12">
                  <label class="form-label-custom">Message</label>
                  <textarea
                    v-model="form.message"
                    class="form-input-custom"
                    :class="{ 'input-error': errors.message }"
                    rows="5"
                    placeholder="Tell me about your project or opportunity..."
                  ></textarea>
                  <span v-if="errors.message" class="field-error">{{ errors.message }}</span>
                </div>
                <div class="col-12">
                  <button
                    type="submit"
                    class="btn btn-hero-primary w-100"
                    :disabled="formState === 'sending'"
                  >
                    <span v-if="formState === 'sending'">
                      <span class="spinner-border spinner-border-sm me-2"></span>Sending…
                    </span>
                    <span v-else>
                      <i class="bi bi-send me-2"></i>Send Message
                    </span>
                  </button>
                  <p v-if="formState === 'error'" class="field-error text-center mt-2">
                    Something went wrong. Please try again or email me directly.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useFadeIn } from '../composables/useFadeIn'

const { visible } = useFadeIn('contact')

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbdqnvqo'

const contactInfo = [
  { label: 'Email',        value: 'aruppaulctg@gmail.com',    href: 'mailto:aruppaulctg@gmail.com', icon: 'bi bi-envelope-fill' },
  { label: 'Whatsapp',     value: '+880 1866702189',           href: 'tel:+8801866702189',           icon: 'bi bi-whatsapp' },
  { label: 'Location',     value: 'Chattogram, BD',            href: '#',                            icon: 'bi bi-geo-alt-fill' },
  { label: 'Availability', value: 'Open to remote work',       href: '#',                            icon: 'bi bi-check-circle-fill' },
]

const socials = [
  { label: 'GitHub',   href: 'https://github.com/Arup-paul',            icon: 'bi bi-github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arup-paul02/', icon: 'bi bi-linkedin' },
  { label: 'Twitter',  href: 'https://x.com/Arup_paul_bd',              icon: 'bi bi-twitter-x' },
  { label: 'Medium',   href: 'https://medium.com/@aruppaulctg',          icon: 'bi bi-medium' },
]

const form = reactive({ name: '', email: '', subject: '', message: '' })
const errors = reactive({ name: '', email: '', subject: '', message: '' })
const formState = ref('idle') // idle | sending | success | error

function validate() {
  errors.name    = form.name.trim()    ? '' : 'Name is required.'
  errors.email   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Valid email required.'
  errors.subject = form.subject.trim() ? '' : 'Subject is required.'
  errors.message = form.message.trim().length >= 10 ? '' : 'Message must be at least 10 characters.'
  return !Object.values(errors).some(Boolean)
}

async function submitForm() {
  if (!validate()) return
  formState.value = 'sending'
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, subject: form.subject, message: form.message }),
    })
    formState.value = res.ok ? 'success' : 'error'
  } catch {
    formState.value = 'error'
  }
}
</script>
