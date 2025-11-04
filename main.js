import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

// Obtener el contenedor
const container = document.getElementById('canvas-container')

// Crear escena
const scene = new THREE.Scene()

// Grupo pivote para garantizar rotación sobre el origen
const pivot = new THREE.Group()
scene.add(pivot)

// Crear cámara
const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
)

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

function getBgColor() {
  const bgColorVar = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim()
  
  if (bgColorVar && bgColorVar.startsWith('#')) {
    const rgb = hexToRgb(bgColorVar)
    if (rgb) {
      return (rgb.r << 16) | (rgb.g << 8) | rgb.b
    }
  }
  
  const bgColor = getComputedStyle(document.body).getPropertyValue('background-color')
  if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
    const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1])
      const g = parseInt(rgbMatch[2])
      const b = parseInt(rgbMatch[3])
      return (r << 16) | (g << 8) | b
    }
  }
  
  // Color por defecto del tema light
  return 0xfafaf9
}

let lastBgColor = null

function updateRendererColor(force = false) {
  const currentColor = getBgColor()
  
  if (!force && currentColor === lastBgColor) {
    return
  }
  
  lastBgColor = currentColor
  renderer.setClearColor(currentColor, 1)
}

// Crear renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.setSize(container.clientWidth, container.clientHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.sortObjects = true
renderer.shadowMap.enabled = false

// Establecer color inicial inmediatamente (color por defecto del tema light)
// Esto evita el flash negro al cargar la página
const defaultColor = 0xfafaf9
renderer.setClearColor(defaultColor, 1)
lastBgColor = defaultColor

container.appendChild(renderer.domElement)

// Función para actualizar al color correcto del tema
function setInitialColor() {
  const initialColor = getBgColor()
  renderer.setClearColor(initialColor, 1)
  lastBgColor = initialColor
}

// Actualizar al color correcto después de que el tema se haya aplicado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      setInitialColor()
    })
  })
} else {
  requestAnimationFrame(() => {
    setInitialColor()
  })
}

window.addEventListener('themechange', (e) => {
  setTimeout(() => {
    requestAnimationFrame(() => {
      updateRendererColor(true)
    })
  }, 250)
  
  setTimeout(() => {
    requestAnimationFrame(() => {
      updateRendererColor(true)
    })
  }, 400)
})

// Observer para cambios en el atributo data-theme (backup)
const observer = new MutationObserver(() => {
  setTimeout(() => {
    requestAnimationFrame(() => {
      updateRendererColor(true)
    })
  }, 250)
})

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme']
})

// Aplicar color inicial después de que el tema se haya cargado completamente
function initRendererColor() {
  setTimeout(() => {
    requestAnimationFrame(() => {
      updateRendererColor(true)
    })
  }, 100)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    updateRendererColor(true)
    setTimeout(initRendererColor, 50)
  })
} else {
  updateRendererColor(true)
  initRendererColor()
}

// Ajustar tamaño cuando cambie la ventana
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
})

// Agregar controles de órbita
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.enableZoom = false
controls.enablePan = false

// Detectar interacción del usuario
const canvas = renderer.domElement
let isDragging = false

canvas.addEventListener('mousedown', () => {
    isDragging = true
    isUserInteracting = true
})
canvas.addEventListener('mouseup', () => {
    isDragging = false
    setTimeout(() => {
        isUserInteracting = false
    }, 200)
})
canvas.addEventListener('mouseleave', () => {
    isDragging = false
    setTimeout(() => {
        isUserInteracting = false
    }, 200)
})
canvas.addEventListener('touchstart', () => {
    isUserInteracting = true
})
canvas.addEventListener('touchend', () => {
    setTimeout(() => {
        isUserInteracting = false
    }, 200)
})
canvas.addEventListener('touchcancel', () => {
    setTimeout(() => {
        isUserInteracting = false
    }, 200)
})

// Agregar iluminación
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight1.position.set(5, 10, 5)
scene.add(directionalLight1)

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
directionalLight2.position.set(-5, 5, -5)
scene.add(directionalLight2)

// Función para corregir materiales
function fixMaterials(object) {
    object.traverse((child) => {
        if (child.isMesh) {
            if (child.material) {
                const materials = Array.isArray(child.material) 
                    ? child.material 
                    : [child.material]
                
                materials.forEach((mat) => {
                    if (mat) {
                        // Permitir doble cara para evitar fragmentación
                        mat.side = THREE.DoubleSide
                        mat.transparent = false
                        mat.opacity = 1.0
                        mat.depthWrite = true
                        mat.depthTest = true
                        mat.needsUpdate = true
                    }
                })
            }
            // Asegurar que las geometrías se rendericen correctamente
            if (child.geometry) {
                child.geometry.computeBoundingBox()
                child.geometry.computeBoundingSphere()
            }
        }
    })
}

// Lista de modelos disponibles (se puede extender agregando más rutas)
const availableModels = [
    './models/canon_at-1_retro_camera/scene.gltf',
    './models/lenovo_thinkpad_l410_open/scene.gltf',
    './models/linux-char/scene.gltf'
]

// Variable para almacenar el modelo actual
let currentModel = null
let isUserInteracting = false

// Seleccionar un modelo aleatorio
function getRandomModel() {
    const randomIndex = Math.floor(Math.random() * availableModels.length)
    return availableModels[randomIndex]
}

// Función para cargar un modelo
function loadModel(modelPath) {
    const loader = new GLTFLoader()
    
    // Limpiar modelos anteriores SOLO dentro del pivote
    ;[...pivot.children].forEach((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
            if (Array.isArray(obj.material)) {
                obj.material.forEach((mat) => mat.dispose())
            } else {
                obj.material.dispose()
            }
        }
        pivot.remove(obj)
    })
    
    loader.load(
        modelPath,
        (gltf) => {
            const model = gltf.scene

            fixMaterials(model)

            const box = new THREE.Box3().setFromObject(model)
            const center = box.getCenter(new THREE.Vector3())
            const size = box.getSize(new THREE.Vector3())

            // Centrar el modelo en el origen dentro del pivote
            model.position.x = -center.x
            model.position.y = -center.y
            model.position.z = -center.z

            // Resetear y fijar el pivote en el origen
            pivot.position.set(0, 0, 0)
            pivot.rotation.set(0, 0, 0)
            pivot.add(model)
            currentModel = pivot

            const maxDim = Math.max(size.x, size.y, size.z)
            const fov = camera.fov * (Math.PI / 180)
            let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))
            cameraZ *= 2.2

            camera.position.set(0, 0, cameraZ)
            controls.target.set(0, 0, 0)
            controls.update()
        },
        (progress) => {
            console.log('Cargando:', (progress.loaded / progress.total) * 100 + '%')
        },
        (error) => {
            console.error('Error al cargar el modelo:', error)
        }
    )
}

// Cargar un modelo aleatorio al iniciar
loadModel(getRandomModel())

// Variables para la animación automática
const rotationSpeedX = 0.2
const rotationSpeedY = 0.3

// Animación
function animate() {
    requestAnimationFrame(animate)
    
    // Rotación automática solo si el usuario no está interactuando
    if (currentModel && !isUserInteracting) {
        // Rotación continua y lenta en Y
        currentModel.rotation.y += rotationSpeedY * 0.01
        
        // Rotación continua y lenta en X
        currentModel.rotation.x += rotationSpeedX * 0.01
    }
    
    controls.update()
    renderer.render(scene, camera)
}

animate()

