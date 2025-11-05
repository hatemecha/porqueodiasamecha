export function createImageLoader(options = {}) {
  const { 
    eagerCount = 0,
    onLoad = () => {},
    onError = () => {},
    addLoadedClass = true
  } = options

  return function loadImage(img, index) {
    if (index < eagerCount) {
      img.loading = 'eager'
      img.fetchPriority = index < 2 ? 'high' : 'auto'
    } else {
      img.loading = 'lazy'
      img.fetchPriority = 'auto'
    }
    
    img.decoding = 'async'

    img.addEventListener('load', function() {
      if (addLoadedClass) {
        this.classList.add('loaded')
      }
      onLoad(this, index)
    }, { once: true })

    img.addEventListener('error', function() {
      if (addLoadedClass) {
        this.classList.add('loaded')
      }
      onError(this, index)
    }, { once: true })

    if (img.complete && img.naturalHeight !== 0) {
      if (addLoadedClass) {
        img.classList.add('loaded')
      }
      onLoad(img, index)
    }
  }
}

