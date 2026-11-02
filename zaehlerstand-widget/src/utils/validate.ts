export interface ValidationResult {
  valid: boolean
  error?: string
  parsedValue?: number
}

export function validateMeterReading (
  input: string,
  lastValue?: number | null,
): ValidationResult {
  const trimmed = input.trim()

  if (!trimmed) {
    return {valid: false, error: 'Bitte Zählerstand eingeben'}
  }

  const normalized = trimmed.replace(',', '.');
  const num = Number(normalized);

  if(isNaN(num) || num < 0) {
    return { valid: false, error: 'Bitte eine gültige positive Zahl eingeben' }
  }

  if (lastValue !== undefined && lastValue !== null && num <= lastValue) {
    return {
      valid: false,
      error: 'Der neue Zählerstand darf nicht kleiner oder gleich der letzten Angabe sein',
    }
  }

  return {
    valid: true,
    parsedValue: num,
  }

}
