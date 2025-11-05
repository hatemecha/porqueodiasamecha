export function initLightbox(options = {}) {
  const {
    selector = '.media img',
    lightboxId = 'lightbox',
    closeSelector = '.close',
    openOnClick = true
  } = options

  const lightbox = document.getElementById(lightboxId)
  if (!lightbox) {
    console.warn(`Lightbox con id "${lightboxId}" no encontrado`)
    return null
  }

  const lightboxImg = lightbox.querySelector('img')
  const closeBtn = lightbox.querySelector(closeSelector)

  if (!lightboxImg) {
    console.warn('Elemento img no encontrado en lightbox')
    return null
  }

  const open = (src) => {
    lightboxImg.src = src
    lightbox.classList.add('open')
    lightbox.style.display = 'flex'
    lightbox.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
  }

  const close = () => {
    lightbox.classList.remove('open')
    lightbox.style.display = 'none'
    lightbox.setAttribute('aria-hidden', 'true')
    lightboxImg.src = ''
    document.body.style.overflow = ''
  }

  if (openOnClick) {
    document.querySelectorAll(selector).forEach(img => {
      img.style.cursor = 'zoom-in'
      img.addEventListener('click', () => {
        open(img.currentSrc || img.src)
      })
    })
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', close)
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      close()
    }
  })

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      close()
    }
  })

  return { open, close }
}

