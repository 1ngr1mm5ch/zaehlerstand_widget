export type EnergyType = 'gas' | 'strom'

export type ReadingSource = 'customer' | 'estimated' | 'technician'

export interface Meter {
  address: string,
  energyType: EnergyType,
  id: number,
  label: string,
  meterNumber: string,
  unit: string
}

export interface Reading {
  id: number,
  meterId: number,
  readAt: string,
  source: ReadingSource,
  value: number,
}
