// Header reutilizable para todas las páginas
// Detecta automáticamente la página actual y marca el enlace activo

;(() => {
  // Aplicar tema inmediatamente al cargar
  const savedTheme = localStorage.getItem('theme') || 'light'
  const html = document.documentElement
  const darkThemes = ['gruvbox', 'borland', 'doom-one', 'tokyo-night']
  if (darkThemes.includes(savedTheme)) {
    html.setAttribute('data-theme', savedTheme)
  } else {
    html.removeAttribute('data-theme')
  }

  const pathParts = window.location.pathname.split('/').filter(p => p)
  const currentPage = pathParts[pathParts.length - 1] || 'index.html'
  const isInSubfolder = pathParts.length > 1
  const basePath = isInSubfolder ? '../' : ''
  
  const pages = [
    { url: 'index.html', label: 'home' },
    { url: 'esquizoposts.html', label: 'esquizoposts' },
    { url: 'lab.html', label: 'lab' },
    { url: 'musica.html', label: 'musica' },
    { url: 'fotos.html', label: 'fotos' },
    { url: 'proyectos.html', label: 'proyectos' },
    { url: 'changelog.html', label: 'changelog' }
  ]

  const themes = [
    { 
      id: 'light', 
      colors: ['#fafaf9', '#ff6c6b', '#000000', '#f1f1ef'] 
    },
    { 
      id: 'gruvbox', 
      colors: ['#282828', '#d79921', '#98971a', '#fb4934'] 
    },
    { 
      id: 'borland', 
      colors: ['#000080', '#ff6c60', '#ffffff', '#000070'] 
    },
    { 
      id: 'doom-one', 
      colors: ['#282c34', '#ff6c6b', '#51afef', '#bbc2cf'] 
    },
    { 
      id: 'tokyo-night', 
      colors: ['#1a1b26', '#f7768e', '#7aa2f7', '#c0caf5'] 
    }
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
        <h1><a href="${basePath}index.html">hatemecha</a></h1>
        <div class="theme-selector" id="theme-selector" aria-label="Cambiar tema"></div>
      </div>
      <nav>
        <ul>
          ${pages.map(page => {
            const isActive = page.url === currentPage || (page.url === 'proyectos.html' && isInSubfolder && pathParts[0] === 'proyectos')
            return `<li><a href="${basePath}${page.url}" ${isActive ? 'class="active"' : ''}>${page.label}</a></li>`
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
      
      selector.innerHTML = currentTheme.colors.map(color => 
        `<div class="color-swatch" style="background-color: ${color}"></div>`
      ).join('')
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

  function applyTheme(theme) {
    const html = document.documentElement
    const darkThemes = ['gruvbox', 'borland', 'doom-one', 'tokyo-night']
    if (darkThemes.includes(theme)) {
      html.setAttribute('data-theme', theme)
    } else {
      html.removeAttribute('data-theme')
    }
    
    requestAnimationFrame(() => {
      setTimeout(() => {
        const event = new CustomEvent('themechange', { detail: { theme } })
        window.dispatchEvent(event)
      }, 50)
    })
  }
})()

