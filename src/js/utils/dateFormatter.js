export function formatDate(iso, format = 'dd-mm-yyyy') {
  try {
    const parts = iso.split('-')
    if (parts.length === 3) {
      const [year, month, day] = parts
      
      if (format === 'dd-mm-yyyy') {
        return `${day} - ${month} - ${year}`
      } else if (format === 'locale') {
        const d = new Date(iso)
        return d.toLocaleDateString('es-AR', {
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        })
      }
      return iso
    }
    return iso
  } catch (e) {
    return iso
  }
}

