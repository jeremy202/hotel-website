<template>
  <section class="section-shell">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-3xl font-semibold text-white">Complete Your Booking</h1>
      <p class="mt-2 text-zinc-300">
        Reserve your stay at Grand Comodores with secure checkout.
      </p>

      <form class="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6" @submit.prevent="submitBooking">
        <div class="grid gap-4 md:grid-cols-2">
          <label class="text-sm text-zinc-200">
            Full Name
            <input
              v-model="form.guestName"
              required
              class="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </label>
          <label class="text-sm text-zinc-200">
            Email
            <input
              v-model="form.guestEmail"
              type="email"
              required
              class="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </label>
          <label class="text-sm text-zinc-200">
            Phone
            <input
              v-model="form.guestPhone"
              required
              class="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </label>
          <label class="text-sm text-zinc-200">
            Guests
            <input
              v-model.number="form.guests"
              type="number"
              min="1"
              required
              class="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </label>
          <label class="text-sm text-zinc-200">
            Check In
            <input
              v-model="form.checkInDate"
              type="date"
              required
              class="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </label>
          <label class="text-sm text-zinc-200">
            Check Out
            <input
              v-model="form.checkOutDate"
              type="date"
              required
              class="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </label>
        </div>

        <label class="block text-sm text-zinc-200">
          Special requests
          <textarea
            v-model="form.specialRequests"
            rows="3"
            class="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </label>

        <div class="rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-sm text-amber-100">
          {{ totalLabel }}
        </div>

        <BaseButton type="submit" class="w-full" :disabled="loading">
          {{ loading ? "Processing..." : "Reserve & Continue to Payment" }}
        </BaseButton>
      </form>

      <p v-if="error" class="mt-4 text-sm text-red-300">{{ error }}</p>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import BaseButton from "../../components/common/BaseButton.vue";
import { createBooking, initializePayment } from "../../services/publicApi";

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const error = ref("");

const roomId = Number(route.params.roomId || 0);
const roomPrice = Number(route.query.price || 0);

const form = reactive({
  guestName: "",
  guestEmail: "",
  guestPhone: "",
  checkInDate: "",
  checkOutDate: "",
  guests: 1,
  specialRequests: "",
});

const totalLabel = computed(() => {
  if (!form.checkInDate || !form.checkOutDate || !roomPrice) {
    return "Select dates to calculate your estimated stay total.";
  }
  const nights = dayjs(form.checkOutDate).diff(dayjs(form.checkInDate), "day");
  if (nights <= 0) {
    return "Check-out date must be after check-in date.";
  }
  const total = nights * roomPrice;
  return `Estimated total for ${nights} night(s): ₦${total.toLocaleString()}`;
});

async function submitBooking() {
  loading.value = true;
  error.value = "";
  try {
    const bookingRes = await createBooking({
      roomId,
      ...form,
    });
    const booking = bookingRes?.booking || bookingRes;

    if (!booking?.id) {
      throw new Error("Booking was not created correctly");
    }

    const paymentRes = await initializePayment({
      bookingId: booking.id,
      email: form.guestEmail,
      callbackUrl: `${window.location.origin}/confirmation`,
    });

    const payment = paymentRes;
    if (payment?.authorizationUrl) {
      window.location.href = payment.authorizationUrl;
      return;
    }

    router.push({
      name: "confirmation",
      query: { reference: payment?.reference || "" },
    });
  } catch (err) {
    error.value = err?.response?.data?.message || "Unable to complete booking.";
  } finally {
    loading.value = false;
  }
}
</script>
