<template>
  <div class="meter-widget">
    <h3 class="meter-widget__title" >
      Zählerstand melden
    </h3>

    <div class="meter-widget__form-container">
      <label :for="`meter-select-${widgetId}`" class="visually-hidden">Zählerstand auswählen</label>
      <select
        :id="`meter-select-${widgetId}`"
        class="meter-widget__select"
        v-model="selectedMeter"
      >
        <option v-for="m in meters" :value="m" :key="m.id">
          {{ m.label }} – {{ formatMeterNumber(m.meterNumber) }}
        </option>
      </select>
    </div>

    <div
      v-if="readings.length"
      class="meter-widget__last-reading"
    >
      <p>
        Letzter Stand: <b>{{ lastReading?.value }} {{ selectedMeter?.unit }}</b> vom
        {{ lastReading?.readAt }}
      </p>
    </div>

    <div class="meter-widget__input-container">
      <label
        :for="`meter-input-${widgetId}`"
        class="visually-hidden"
      >
        Neuer Zählerstand
      </label>
      <input
        :id="`meter-input-${widgetId}`"
         v-model="newValue"
         placeholder="Neuer Zählerstand"
         class="meter-widget__input" type="text"
         inputmode="decimal"  @keydown.enter="send"
      >
      <button
        :disabled="isLoading || isSubmitting"
        class="meter-widget__submit"
        @click="send"
      >
        {{ isSubmitting ? 'Wird gesendet...' : 'Senden' }}
      </button>
    </div>


    <div
      v-if="isLoading" role="status" aria-live="polite"
      class="meter-widget__message meter-widget__message--loading"
    >
      Daten werden geladen...
    </div>

    <div v-else-if="errorMessage"
     role="status"
     aria-live="polite"
     class="meter-widget__message meter-widget__message--error"
    >
      {{ errorMessage }}
    </div>

    <div
      v-else-if="successFeedback"
      role="status"
      aria-live="polite"
      class="meter-widget__message meter-widget__message--success"
    >
      {{ successFeedback }}
    </div>

    <table v-else-if="showHistory && readings.length" class="meter-widget__table">
      <thead>
        <tr>
          <th>Datum</th>
          <th>Stand</th>
          <th>Quelle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in sortedReadings" :key="r.id">
          <td>{{ r.readAt }}</td>
          <td>{{ r.value }} {{ selectedMeter?.unit }}</td>
          <td>{{ r.source }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed, watch, useId} from 'vue'
import { formatMeterNumber } from '../utils/format'
import type {EnergyType, Meter, Reading} from "../types";
import {getLatestReading, sortReadingsByDate} from "../utils/sort.ts";
import { validateMeterReading } from '../utils/validate.ts'
import {fetchMeters, fetchReadings, sendReading} from "../services/api.ts";

const props = withDefaults(defineProps<{
  energyType?: EnergyType
  showHistory?: boolean
  successMessage?: string
}>(), {
  showHistory: true,
  successMessage: 'Danke! Wir haben deinen Zählerstand erhalten.'
})

const isLoading = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref<string | null>(null)
const widgetId = useId()

const meters = ref<Meter[]>([])
const selectedMeter = ref<Meter | null>(null)
const readings = ref<Reading[]>([])
const newValue = ref('')
const successFeedback = ref<string | null>(null)

const sortedReadings = computed(() => sortReadingsByDate(readings.value, 'desc'));
const lastReading = computed(() => getLatestReading(readings.value))

onMounted(async () => {
  isLoading.value = true

  try {
    meters.value = await fetchMeters(props.energyType)
    selectedMeter.value = meters.value[0] || null
  } finally {
    isLoading.value = false
  }
})

async function loadReadings() {
  if (!selectedMeter.value) return

  errorMessage.value = null

  try {
    isLoading.value = true
    readings.value = await fetchReadings(selectedMeter.value.id)
  } catch (err) {
    readings.value = []
    if (err instanceof Error) {
      errorMessage.value = err.message
    } else {
      errorMessage.value = 'Ein unerwarteter Fehler ist aufgetreten.'
    }
  } finally {
    isLoading.value = false
  }
}

watch(selectedMeter, async(newMeter) => {
  if(newMeter) {
    await loadReadings()
  } else {
    readings.value = []
  }
})

async function send() {
  if (!selectedMeter.value) return
  const validation = validateMeterReading(newValue.value, lastReading.value?.value)
  if (!validation.valid || validation.parsedValue === undefined) {
    errorMessage.value = validation.error ?? 'Ungültige Eingabe'
    successFeedback.value = null
    return
  }

  errorMessage.value = null

  try {
    isSubmitting.value = true
    const newReading = await sendReading(selectedMeter.value.id, validation.parsedValue)
    readings.value.push(newReading)
    newValue.value = ''
    errorMessage.value = null
    successFeedback.value = props.successMessage
  } catch (err) {
    successFeedback.value = null
    errorMessage.value = err instanceof Error ? err.message : 'Fehler beim Senden des Zählerstands.'
  } finally {
    isSubmitting.value = false
  }

}

</script>

<style scoped>
  .meter-widget {
    font-family: Arial,serif;
    max-width: 600px
  }

  .meter-widget__title {
    color: #004b87
  }

.meter-widget__select{
  width: 100%;
  padding: 8px;
  margin-bottom: 10px
}

.meter-widget__input {
  padding: 8px;
  width: 200px
}

.meter-widget__submit {
  background: #004b87;
  color: white;
  padding: 8px 16px;
  border: none;
  margin-left: 8px
}

.meter-widget__submit:hover {
  cursor: pointer;
  background: #006387;
}

.meter-widget__message {
  margin-top: 10px; color: #666; display:flex; justify-content: center
}

.meter-widget__message--error{
  color: #c00;
}

.meter-widget__table {
  margin-top: 20px;
  width: 100%
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
