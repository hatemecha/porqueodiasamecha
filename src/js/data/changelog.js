export const changelogData = [
  {
    date: '2026-03-02',
    changes: [
      {
        type: 'features',
        items: [
          'Restaurada la sección proyectos en el header',
          'Agregados proyectos paprika, ruido molesto y hatewebcam en proyectos.html',
          'Agregados iconos locales para paprika, ruido molesto y hatewebcam'
        ]
      },
      {
        type: 'bugfix',
        items: [
          'Corregidas rutas del header para navegar correctamente desde subdirectorios',
          'Corregido marcado activo de navegación en sección de proyectos',
          'Endurecida la carga de módulos del changelog para mostrar error controlado si falla'
        ]
      },
      {
        type: 'refactor',
        items: [
          'Ajustado versionado de assets para invalidar caché del navegador'
        ]
      }
    ]
  },
  {
    date: '2026-03-02',
    changes: [
      {
        type: 'features',
        items: [
          'Controles de tema y modelo del header convertidos en botones accesibles',
          'Navegación simplificada al retirar las páginas lab y esquizoposts'
        ]
      },
      {
        type: 'bugfix',
        items: [
          'Corregido el conflicto de interacción entre la galería de fotos y el lightbox',
          'Corregida la liberación de geometrías, materiales y texturas al cambiar modelos 3D'
        ]
      },
      {
        type: 'refactor',
        items: [
          'Eliminadas las páginas lab.html y esquizoposts.html del proyecto'
        ]
      }
    ]
  },
  {
    date: '2025-11-13',
    changes: [
      {
        type: 'features',
        items: [
          'Optimización masiva de imágenes en esquizoposts y fotos (reducción de ~90% en tamaño)',
          'Implementación de lazy loading para imágenes',
          'Nueva sección de proyectos con página dedicada',
          'Agregado proyecto fastext'
        ]
      },
      {
        type: 'performance',
        items: [
          'Mejoras en rendimiento de carga de páginas'
        ]
      },
      {
        type: 'bugfix',
        items: [
          'Corregido centrado del footer en todas las páginas',
          'Corregido header y temas en páginas de proyectos'
        ]
      }
    ]
  },
  {
    date: '2025-11-05',
    changes: [
      {
        type: 'features',
        items: [
          'Mejorada estructura del changelog para soportar secciones organizadas',
          'Agregado soporte para bugfix y features con listas de items'
        ]
      },
      {
        type: 'bugfix',
        items: [
          'Corregido desincronización del fondo del modelo 3D con el tema del sitio'
        ]
      },
      {
        type: 'refactor',
        items: [
          'Refactorización general del código'
        ]
      }
    ]
  },
  {
    date: '2025-11-04',
    changes: [
      {
        type: 'features',
        items: [
          'Nueva página dump.html'
        ]
      }
    ]
  }
]
