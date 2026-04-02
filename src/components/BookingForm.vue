<template>
  <div class="booking-form" :class="{ 'booking-form--compact': compact }">
    <div v-if="!compact" class="booking-form__header">
      <span class="booking-form__eyebrow">Reserve</span>
      <h2 class="booking-form__title">Your Stay</h2>
      <div class="divider-gold"></div>
    </div>

    <form class="booking-form__form" @submit.prevent="onSubmit">
      <div class="booking-form__grid">
        <!-- Room selection -->
        <div class="booking-form__field" :class="{ 'booking-form__field--full': !compact }">
          <label class="booking-form__label">Room / Suite</label>
          <div class="booking-form__select-wrap">
            <select v-model="form.room" class="booking-form__select" @change="updatePrice">
              <option value="">Select a room</option>
              <option v-for="room in rooms" :key="room.id" :value="room.id">
                {{ room.name }} — ₦{{ Number(room.price).toLocaleString() }}/night
              </option>
            </select>
            <svg class="booking-form__select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6"/></svg>
          </div>
        </div>

        <!-- Check-in -->
        <div class="booking-form__field">
          <label class="booking-form__label">Check-in</label>
          <input
            v-model="form.checkin"
            type="date"
            class="booking-form__input"
            :min="today"
            @change="updatePrice"
          />
        </div>

        <!-- Check-out -->
        <div class="booking-form__field">
          <label class="booking-form__label">Check-out</label>
          <input
            v-model="form.checkout"
            type="date"
            class="booking-form__input"
            :min="form.checkin || today"
            @change="updatePrice"
          />
        </div>

        <!-- Guests -->
        <div class="booking-form__field">
          <label class="booking-form__label">Guests</label>
          <div class="booking-form__select-wrap">
            <select v-model="form.guests" class="booking-form__select">
              <option v-for="n in 8" :key="n" :value="n">{{ n }} {{ n === 1 ? 'Guest' : 'Guests' }}</option>
            </select>
            <svg class="booking-form__select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6"/></svg>
          </div>
        </div>
      </div>

      <!-- Price summary -->
      <Transition name="fade-up">
        <div v-if="priceBreakdown.nights > 0 && priceBreakdown.roomPrice > 0" class="booking-form__summary">
          <div class="booking-form__summary-row">
            <span>₦{{ Number(priceBreakdown.roomPrice).toLocaleString() }} × {{ priceBreakdown.nights }} nights</span>
            <span>₦{{ Number(priceBreakdown.subtotal).toLocaleString() }}</span>
          </div>
          <div class="booking-form__summary-row">
            <span>Taxes & Service ({{ TAX_RATE * 100 }}%)</span>
            <span>₦{{ Number(priceBreakdown.taxes).toLocaleString() }}</span>
          </div>
          <div class="booking-form__summary-total">
            <span>Total</span>
            <span>₦{{ Number(priceBreakdown.total).toLocaleString() }}</span>
          </div>
        </div>
      </Transition>

      <!-- Name & email (full booking only) -->
      <template v-if="!compact">
        <div class="booking-form__grid booking-form__grid--2">
          <div class="booking-form__field">
            <label class="booking-form__label">First Name</label>
            <input v-model="form.firstName" type="text" class="booking-form__input" placeholder="Adaeze" />
          </div>
          <div class="booking-form__field">
            <label class="booking-form__label">Last Name</label>
            <input v-model="form.lastName" type="text" class="booking-form__input" placeholder="Okonkwo" />
          </div>
        </div>

        <div class="booking-form__grid booking-form__grid--2">
          <div class="booking-form__field">
            <label class="booking-form__label">Email</label>
            <input v-model="form.email" type="email" class="booking-form__input" placeholder="adaeze@example.com" />
          </div>
          <div class="booking-form__field">
            <label class="booking-form__label">Phone</label>
            <input v-model="form.phone" type="tel" class="booking-form__input" placeholder="+234 801 234 5678" />
          </div>
        </div>

        <div class="booking-form__field booking-form__field--full">
          <label class="booking-form__label">Special Requests</label>
          <textarea
            v-model="form.requests"
            class="booking-form__input booking-form__textarea"
            rows="3"
            placeholder="Let us know how we can make your stay exceptional..."
          ></textarea>
        </div>
      </template>

      <!-- Submit -->
      <button type="submit" class="booking-form__submit" :disabled="!canSubmit">
        <span v-if="!submitted">
          {{ compact ? 'Check Availability' : 'Confirm Reservation' }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
        <span v-else class="booking-form__success">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 6L9 17l-5-5"/></svg>
          Reservation Confirmed
        </span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { rooms as allRooms } from '@/data/rooms'

const props = defineProps({
  compact: { type: Boolean, default: false },
  preselectedRoom: { type: Number, default: null },
})

const TAX_RATE = 0.075
const rooms = allRooms
const submitted = ref(false)

const today = new Date().toISOString().split('T')[0]

const form = reactive({
  room: props.preselectedRoom || '',
  checkin: '',
  checkout: '',
  guests: 2,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  requests: '',
})

const priceBreakdown = reactive({
  nights: 0,
  roomPrice: 0,
  subtotal: 0,
  taxes: 0,
  total: 0,
})

const canSubmit = computed(() => {
  if (props.compact) return form.room && form.checkin && form.checkout
  return form.room && form.checkin && form.checkout && form.firstName && form.email
})

const updatePrice = () => {
  const room = rooms.find(r => r.id === Number(form.room))
  if (!room) { priceBreakdown.nights = 0; return }
  if (!form.checkin || !form.checkout) return

  const d1 = new Date(form.checkin)
  const d2 = new Date(form.checkout)
  const nights = Math.max(0, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)))

  priceBreakdown.nights = nights
  priceBreakdown.roomPrice = room.price
  priceBreakdown.subtotal = room.price * nights
  priceBreakdown.taxes = Math.round(priceBreakdown.subtotal * TAX_RATE)
  priceBreakdown.total = priceBreakdown.subtotal + priceBreakdown.taxes
}

const onSubmit = () => {
  if (!canSubmit.value) return
  submitted.value = true
  setTimeout(() => { submitted.value = false }, 4000)
}
</script>

<style scoped>
.booking-form {
  background: #FAF7F2;
  padding: 3rem;
}

.booking-form--compact {
  padding: 1.5rem 2rem;
  background: rgba(10, 9, 8, 0.85);
  backdrop-filter: blur(20px);
}

.booking-form__header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.booking-form__eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #C9A96E;
  display: block;
  margin-bottom: 0.5rem;
}

.booking-form__title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  font-weight: 400;
  color: #0A0908;
}

/* Grid */
.booking-form__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

.booking-form__grid--2 {
  grid-template-columns: 1fr 1fr;
}

.booking-form__field--full {
  grid-column: 1 / -1;
}

/* Label */
.booking-form__label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #6B6560;
  margin-bottom: 0.5rem;
}

.booking-form--compact .booking-form__label {
  color: rgba(250,247,242,0.5);
}

/* Input */
.booking-form__input {
  width: 100%;
  padding: 0.875rem 1rem;
  background: transparent;
  border: 1px solid rgba(201, 169, 110, 0.25);
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 300;
  color: #1C1A18;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  appearance: none;
  -webkit-appearance: none;
}

.booking-form--compact .booking-form__input {
  color: #FAF7F2;
  border-color: rgba(201, 169, 110, 0.2);
  background: rgba(255,255,255,0.05);
}

.booking-form--compact .booking-form__input::placeholder {
  color: rgba(250,247,242,0.3);
}

.booking-form__input::placeholder {
  color: #C5BFBA;
}

.booking-form__input:focus {
  border-color: #C9A96E;
  box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.08);
}

/* Date input color fix */
.booking-form__input[type="date"] {
  color: inherit;
}

.booking-form__input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0.4;
  cursor: pointer;
}

/* Select */
.booking-form__select-wrap {
  position: relative;
}

.booking-form__select {
  width: 100%;
  padding: 0.875rem 2.5rem 0.875rem 1rem;
  background: transparent;
  border: 1px solid rgba(201, 169, 110, 0.25);
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 300;
  color: #1C1A18;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition: border-color 0.3s ease;
}

.booking-form--compact .booking-form__select {
  color: #FAF7F2;
  background: rgba(255,255,255,0.05);
  border-color: rgba(201,169,110,0.2);
}

.booking-form--compact .booking-form__select option {
  color: #1C1A18;
  background: #FAF7F2;
}

.booking-form__select:focus {
  border-color: #C9A96E;
}

.booking-form__select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #C9A96E;
  pointer-events: none;
}

/* Textarea */
.booking-form__textarea {
  resize: vertical;
  min-height: 80px;
}

/* Price summary */
.booking-form__summary {
  padding: 1rem 1.25rem;
  background: rgba(201,169,110,0.06);
  border: 1px solid rgba(201,169,110,0.2);
  margin-bottom: 1.25rem;
}

.booking-form--compact .booking-form__summary {
  background: rgba(201,169,110,0.1);
}

.booking-form__summary-row {
  display: flex;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 300;
  color: #6B6560;
  padding: 0.3rem 0;
}

.booking-form--compact .booking-form__summary-row {
  color: rgba(250,247,242,0.55);
}

.booking-form__summary-total {
  display: flex;
  justify-content: space-between;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  font-weight: 500;
  color: #0A0908;
  border-top: 1px solid rgba(201,169,110,0.2);
  padding-top: 0.5rem;
  margin-top: 0.4rem;
}

.booking-form--compact .booking-form__summary-total {
  color: #FAF7F2;
}

/* Submit */
.booking-form__submit {
  width: 100%;
  padding: 1rem;
  background: #C9A96E;
  color: #FAF7F2;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.3s ease, transform 0.2s ease;
  margin-top: 0.5rem;
}

.booking-form__submit:hover:not(:disabled) {
  background: #A07840;
  transform: translateY(-1px);
}

.booking-form__submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.booking-form__success {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #FAF7F2;
}

/* Transitions */
.fade-up-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 768px) {
  .booking-form { padding: 2rem 1.5rem; }
  .booking-form__grid--2 { grid-template-columns: 1fr; }
}
</style>
