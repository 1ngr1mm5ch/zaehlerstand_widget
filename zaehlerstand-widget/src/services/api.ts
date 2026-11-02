import type { Meter, Reading } from '../types'

const BASE_URL = 'http://localhost:3001/api'

export async function fetchMeters(energyType?: string): Promise<Meter[]> {
  const url = energyType ? `${BASE_URL}/meters?energyType=${energyType}` : `${BASE_URL}/meters`;
  const res = await fetch(url)

  if(!res.ok) {
    throw new Error('Fehler beim Laden der Zähler.')
  }
  return res.json()
}

export async function fetchReadings(meterId: number): Promise<Reading[]> {
  const res = await fetch(`${BASE_URL}/meters/${meterId}/readings`)

  if(!res.ok) {
    throw new Error('Fehler beim Laden der Zählerstände.')
  }

  return res.json()
}

export async function sendReading(meterId: number, value: number): Promise<Reading> {
  const res = await fetch(`${BASE_URL}/meters/${meterId}/readings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value }),
  })
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || 'Fehler beim Übermitteln des Zählerstands.')
  }
  return res.json()
}
