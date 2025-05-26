// Utility Functions
const Utils = {
  formatPrice(price) {
    return `Rp ${price.toLocaleString("id-ID")}`
  },

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("id-ID")
  },

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  },

  showModal(modalId) {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.classList.remove("hidden")
    }
  },

  hideModal(modalId) {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.classList.add("hidden")
    }
  },

  generateId() {
    return Date.now()
  },
}
