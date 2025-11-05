// Header reutilizable para todas las páginas
// Detecta automáticamente la página actual y marca el enlace activo

;(() => {
  // Aplicar tema inmediatamente al cargar
  const savedTheme = localStorage.getItem('theme') || 'light'
  const html = document.documentElement
  const darkThemeIds = themes.filter(t => t.id !== 'light').map(t => t.id)
  if (darkThemeIds.includes(savedTheme)) {
    html.setAttribute('data-theme', savedTheme)
  } else {
    html.removeAttribute('data-theme')
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html'
  
  const pages = [
    { url: 'index.html', label: 'home' },
    { url: 'esquizoposts.html', label: 'esquizoposts' },
    { url: 'lab.html', label: 'lab' },
    { url: 'musica.html', label: 'musica' },
    { url: 'fotos.html', label: 'fotos' },
    { url: 'dump.html', label: 'dump' },
    { url: 'changelog.html', label: 'changelog' }
  ]


  const renderHeader = () => {
    const header = document.querySelector('header')
    if (!header) return

    header.innerHTML = `
      <div class="header-title-wrapper">
        <div class="social-icons">
          <a href="https://www.instagram.com/hatemecha/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="https://github.com/hatemecha" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
        <h1><a href="index.html">hatemecha</a></h1>
        <div class="theme-selector" id="theme-selector" aria-label="Cambiar tema"></div>
      </div>
      <nav>
        <ul>
          ${pages.map(page => {
            const isActive = page.url === currentPage
            return `<li><a href="${page.url}" ${isActive ? 'class="active"' : ''}>${page.label}</a></li>`
          }).join('')}
        </ul>
      </nav>
    `
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      renderHeader()
      initTheme()
    })
  } else {
    renderHeader()
    initTheme()
  }

  function getCurrentThemeIndex() {
    const savedTheme = localStorage.getItem('theme') || 'light'
    const index = themes.findIndex(t => t.id === savedTheme)
    return index >= 0 ? index : 0
  }

  function updateThemeSelectorColors() {
    const selector = document.getElementById('theme-selector')
    if (selector) {
      const currentIndex = getCurrentThemeIndex()
      const currentTheme = themes[currentIndex]
      const secondaryColor = currentTheme.colors[1]
      
      selector.innerHTML = `<div class="color-swatch" style="background-color: ${secondaryColor}"></div>`
    }
  }

  function cycleTheme() {
    const currentIndex = getCurrentThemeIndex()
    const nextIndex = (currentIndex + 1) % themes.length
    const nextTheme = themes[nextIndex]
    
    applyTheme(nextTheme.id)
    localStorage.setItem('theme', nextTheme.id)
    updateThemeSelectorColors()
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light'
    applyTheme(savedTheme)
    updateThemeSelectorColors()
    
    const themeSelector = document.getElementById('theme-selector')
    if (themeSelector) {
      themeSelector.addEventListener('click', cycleTheme)
    }
  }

  function applyTheme(themeId) {
    const html = document.documentElement
    const darkThemeIds = themes.filter(t => t.id !== 'light').map(t => t.id)
    
    if (darkThemeIds.includes(themeId)) {
      html.setAttribute('data-theme', themeId)
    } else {
      html.removeAttribute('data-theme')
    }

    requestAnimationFrame(() => {
      const event = new CustomEvent('themechange', { detail: { theme: themeId } })
      window.dispatchEvent(event)
    })
  }
})()

