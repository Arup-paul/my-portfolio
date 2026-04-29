import { ref, onMounted } from 'vue'

export function useFadeIn(sectionId, threshold = 0.12) {
  const visible = ref(false)

  onMounted(() => {
    const el = document.getElementById(sectionId)
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible.value = true
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
  })

  return { visible }
}
