// Footer reutilizable para todas las páginas

;(() => {
  const renderFooter = () => {
    const footer = document.querySelector('footer')
    if (!footer) return

    const currentYear = new Date().getFullYear()

    footer.innerHTML = `
      <div class="footer-content">
        <div class="footer-copyright">hatemecha © ${currentYear}</div>
      </div>
    `
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderFooter)
  } else {
    renderFooter()
  }
})()

