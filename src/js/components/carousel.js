export class Carousel {
  constructor(container, images, options = {}) {
    this.container = container
    this.images = images
    this.currentIndex = 0
    this.options = {
      showNav: images.length > 1,
      showDots: images.length > 1,
      ...options
    }
    this.state = {}

    this.init()
  }

  init() {
    if (!this.container || this.images.length === 0) return

    this.container.innerHTML = ''
    this.container.className = 'carousel-container'

    const track = document.createElement('div')
    track.className = 'carousel-track'

    this.images.forEach((src, index) => {
      const slide = document.createElement('div')
      slide.className = 'carousel-slide'

      const img = document.createElement('img')
      img.src = src
      img.alt = `Imagen ${index + 1}`
      img.loading = index === 0 ? 'eager' : 'lazy'
      img.decoding = 'async'

      img.addEventListener('load', function() {
        this.classList.add('loaded')
      }, { once: true })

      img.addEventListener('error', function() {
        this.classList.add('loaded')
      }, { once: true })

      slide.appendChild(img)
      track.appendChild(slide)
    })

    this.container.appendChild(track)
    this.track = track
    this.slides = track.querySelectorAll('.carousel-slide')

    if (this.options.showNav && this.images.length > 1) {
      this.createNav()
    }

    if (this.options.showDots && this.images.length > 1) {
      this.createDots()
    }

    this.update()
  }

  createNav() {
    const prevBtn = document.createElement('button')
    prevBtn.className = 'carousel-nav prev'
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>'
    prevBtn.setAttribute('aria-label', 'Imagen anterior')
    prevBtn.addEventListener('click', () => this.navigate(-1))

    const nextBtn = document.createElement('button')
    nextBtn.className = 'carousel-nav next'
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>'
    nextBtn.setAttribute('aria-label', 'Siguiente imagen')
    nextBtn.addEventListener('click', () => this.navigate(1))

    this.container.appendChild(prevBtn)
    this.container.appendChild(nextBtn)

    this.prevBtn = prevBtn
    this.nextBtn = nextBtn
  }

  createDots() {
    const dots = document.createElement('div')
    dots.className = 'carousel-dots'

    this.images.forEach((_, index) => {
      const dot = document.createElement('button')
      dot.className = 'carousel-dot'
      if (index === 0) dot.classList.add('active')
      dot.setAttribute('aria-label', `Ir a imagen ${index + 1}`)
      dot.addEventListener('click', () => this.goTo(index))
      dots.appendChild(dot)
    })

    this.container.appendChild(dots)
    this.dots = dots.querySelectorAll('.carousel-dot')
  }

  navigate(direction) {
    this.currentIndex += direction

    if (this.currentIndex < 0) {
      this.currentIndex = this.images.length - 1
    } else if (this.currentIndex >= this.images.length) {
      this.currentIndex = 0
    }

    this.update()
  }

  goTo(index) {
    if (index >= 0 && index < this.images.length) {
      this.currentIndex = index
      this.update()
    }
  }

  update() {
    if (!this.track || !this.slides.length) return

    this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`

    if (this.dots) {
      this.dots.forEach((dot, i) => {
        if (i === this.currentIndex) {
          dot.classList.add('active')
        } else {
          dot.classList.remove('active')
        }
      })
    }

    if (this.prevBtn) this.prevBtn.disabled = false
    if (this.nextBtn) this.nextBtn.disabled = false
  }
}

