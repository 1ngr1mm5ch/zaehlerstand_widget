import type {Reading} from "../types";

export function sortReadingsByDate(
  readings: Reading[],
  order: 'asc' | 'desc'
): Reading[] {
  return [...readings].sort((a, b) => {
    const dateA = a.readAt || ''
    const dateB = b.readAt || ''
    const diff = dateA.localeCompare(dateB)

    // Wenn die Tage unterschiedlich sind, nach Datum sortieren
    if (diff !== 0) {
      return order === 'asc' ? diff : -diff
    }

    // Am gleichen Tag: Nach ID sortieren (höhere ID = neuere Eingabe)
    const idA = a.id ?? 0
    const idB = b.id ?? 0
    return order === 'asc' ? idA - idB : idB - idA
  })
}

export function getLatestReading(readings: Reading[]): Reading | null {
  if (!readings.length) return null
  return sortReadingsByDate(readings, 'desc')[0]
}
