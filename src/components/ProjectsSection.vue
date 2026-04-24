<template>
  <section id="projects" class="section-padding">
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
          class="col-md-6 col-lg-6"
          v-for="project in filteredProjects"
          :key="project.title"
        >
          <div class="project-card h-100">
            <div class="project-img">
              <i :class="project.icon"></i>
              <span class="project-cat-badge">{{ project.category }}</span>
            </div>
            <div class="p-4">
              <h5 class="project-title mb-2">{{ project.title }}</h5>
              <p class="project-desc mb-3">{{ project.description }}</p>
              <div class="d-flex flex-wrap gap-1 mb-4">
                <span class="tech-tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
              </div>
              <div class="d-flex gap-2">
                <a :href="project.demo" target="_blank" class="btn btn-proj-primary btn-sm">
                  <i class="bi bi-eye me-1"></i>Live Demo
                </a>
                <a :href="project.repo" target="_blank" class="btn btn-proj-outline btn-sm">
                  <i class="bi bi-github me-1"></i>Code
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
import { ref, computed } from 'vue'

const activeFilter = ref('All')
const categories = ['All', 'Maritime', 'ERP', 'SaaS', 'E-Finance', 'Social']

const projects = [
   {
    title: 'mi ERP – Industry Specific ERP',
    description: 'Full-scale ERP for SMEs covering Supply Chain & Procurement, Manufacturing, Inventory, CRM/Sales, Project Management, Accounting, HRM & Payroll, Fixed Assets, and Compliance. Includes specialized vertical modules: HospitalOS, DentalOS, FactoryOS, NGO OS, RealEstate OS & ServiceOS. Features miAccounts — a complete Accounting, Inventory & VAT/Tax compliance solution tailored for Bangladesh.',
    icon: 'bi bi-diagram-3 display-2 text-danger',
    category: 'ERP',
    tags: ['Laravel', 'PHP', 'MySQL', 'Vue', 'Bootstrap', 'REST API'],
    demo: 'https://musketeersidea.com/',
    repo: '#',
  },
  {
    title: 'SPD',
    description: 'Vessel-wise Salary, Portage Bill & crew management system built for Global MariCruit (Singapore). Handles complete crew payroll per vessel, generates portage bills, manages crew records and contracts, and produces detailed salary & disbursement reports for the maritime finance team.',
    icon: 'bi bi-radar display-2 text-primary',
    category: 'Maritime',
    tags: ['Laravel', 'PHP', 'MySQL', 'React', 'REST API', 'Bootstrap'],
    demo: '#',
    repo: '#',
  },
  {
    title: 'Vessel Dashboard',
    description: 'All-in-one vessel operations management system for Global MariCruit. Manages onboard equipment operations including crane, grab, and other tools, tracks equipment maintenance schedules, and covers all vessel operational activities. Features a comprehensive reporting dashboard giving management full visibility into vessel performance, equipment status, and operational summaries.',
    icon: 'bi bi-speedometer2 display-2 text-info',
    category: 'Maritime',
    tags: ['Laravel', 'PHP', 'MySQL', 'Chart.js', 'Bootstrap'],
    demo: '#',
    repo: '#',
  },
 
  {
    title: 'Garments HR System',
    description: 'HR management module built for a garments factory. Covers employee onboarding, attendance tracking, leave management, payroll processing, and HR reporting — streamlining the entire human resource workflow for factory floor and admin staff.',
    icon: 'bi bi-people display-2 text-warning',
    category: 'ERP',
    tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    demo: '#',
    repo: '#',
  },
  {
    title: 'PMS – Planned Maintenance System',
    description: 'Maritime Planned Maintenance System for scheduling and tracking preventive and corrective maintenance of vessel machinery and equipment. Manages maintenance jobs, spare parts inventory, service intervals, and compliance checklists to ensure vessels meet ISM Code and class requirements.',
    icon: 'bi bi-tools display-2 text-danger',
    category: 'Maritime',
    tags: ['Laravel', 'PHP', 'MySQL', 'Vue', 'Bootstrap', 'REST API'],
    demo: '#',
    repo: '#',
  },
  {
    title: 'OpenSaaS',
    description: 'Sell Your Skills As A Subscription (SaaS). A platform enabling freelancers and agencies to package and sell services as recurring subscriptions with billing management.',
    icon: 'bi bi-cloud-upload display-2 text-primary',
    category: 'SaaS',
    tags: ['Laravel', 'Ajax', 'jQuery', 'JavaScript', 'PHP', 'MySQL'],
    demo: 'https://codecanyon.net/item/opensaas-multi-level-subscription-selling-platform/38629226?s_rank=13',
    repo: '#',
  },
  {
    title: 'DigitalSell',
    description: 'Digital Product And Subscription Selling Platform (SaaS). Allows creators to sell digital products, e-books, templates, and software with subscription management.',
    icon: 'bi bi-cart-check display-2 text-success',
    category: 'SaaS',
    tags: ['Laravel', 'Ajax', 'jQuery', 'JavaScript', 'PHP', 'MySQL'],
    demo: 'https://codecanyon.net/item/digitalsell-digital-product-and-subscription-selling-platform-saas/39916691?s_rank=12',
    repo: '#',
  },
  {
    title: 'BuyMeTea',
    description: 'Ultimate creator support and social media platform. Fans can support their favourite creators with one-time or recurring contributions, with a built-in social feed.',
    icon: 'bi bi-cup-hot display-2 text-warning',
    category: 'Social',
    tags: ['Laravel', 'PHP', 'Firebase', 'Ajax', 'JavaScript', 'jQuery', 'MySQL'],
    demo: 'https://codecanyon.net/item/buymetea-ultimate-support-creators-and-social-media-platform/40497876?s_rank=11',
    repo: '#',
  },
  {
    title: 'SHONGJOGyou',
    description: 'E-Finance Solution – a full-stack SPA for managing digital financial transactions, wallets, transfers, and financial reporting with real-time updates.',
    icon: 'bi bi-currency-exchange display-2 text-info',
    category: 'E-Finance',
    tags: ['Laravel', 'REST API', 'React', 'Redux', 'MySQL'],
    demo: '#',
    repo: '#',
  }
]

const filteredProjects = computed(() =>
  activeFilter.value === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter.value)
)
</script>
