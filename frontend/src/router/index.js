import { createRouter, createWebHistory } from "vue-router";
import PublicLayout from "../layouts/PublicLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import HomePage from "../pages/public/HomePage.vue";
import RoomsPage from "../pages/public/RoomsPage.vue";
import RoomDetailsPage from "../pages/public/RoomDetailsPage.vue";
import BookingPage from "../pages/public/BookingPage.vue";
import ConfirmationPage from "../pages/public/ConfirmationPage.vue";
import AdminLoginPage from "../pages/admin/AdminLoginPage.vue";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.vue";
import AdminRoomsPage from "../pages/admin/AdminRoomsPage.vue";
import AdminBookingsPage from "../pages/admin/AdminBookingsPage.vue";
import AdminTransactionsPage from "../pages/admin/AdminTransactionsPage.vue";
import AdminCalendarPage from "../pages/admin/AdminCalendarPage.vue";
import { useAuthStore } from "../stores/authStore";

const routes = [
  {
    path: "/",
    component: PublicLayout,
    children: [
      { path: "", name: "home", component: HomePage },
      { path: "rooms", name: "rooms", component: RoomsPage },
      { path: "rooms/:id", name: "room-details", component: RoomDetailsPage, props: true },
      { path: "book/:roomId", name: "booking", component: BookingPage, props: true },
      { path: "confirmation", name: "confirmation", component: ConfirmationPage },
    ],
  },
  {
    path: "/admin/login",
    name: "admin-login",
    component: AdminLoginPage,
  },
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAdmin: true },
    children: [
      { path: "", name: "admin-dashboard", component: AdminDashboardPage },
      { path: "rooms", name: "admin-rooms", component: AdminRoomsPage },
      { path: "bookings", name: "admin-bookings", component: AdminBookingsPage },
      { path: "payments", name: "admin-payments", component: AdminTransactionsPage },
      { path: "calendar", name: "admin-calendar", component: AdminCalendarPage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAdmin && !authStore.isAuthenticated) {
    next({ name: "admin-login" });
    return;
  }
  next();
});

export default router;
