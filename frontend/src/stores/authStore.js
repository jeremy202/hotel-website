import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { loginAdmin } from "../services/adminApi";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("gc_token") || "");
  const user = ref(
    localStorage.getItem("gc_user") ? JSON.parse(localStorage.getItem("gc_user")) : null
  );
  const loading = ref(false);
  const error = ref("");

  const isAuthenticated = computed(() => Boolean(token.value));
  const isAdmin = computed(() => {
    if (!user.value) {
      return false;
    }
    return String(user.value.role || "").toLowerCase() === "admin";
  });

  function setSession(nextToken, nextUser) {
    token.value = nextToken;
    user.value = nextUser;
    localStorage.setItem("gc_token", nextToken);
    localStorage.setItem("gc_user", JSON.stringify(nextUser));
  }

  function clearSession() {
    token.value = "";
    user.value = null;
    localStorage.removeItem("gc_token");
    localStorage.removeItem("gc_user");
  }

  async function login(payload) {
    loading.value = true;
    error.value = "";
    try {
      const session = await loginAdmin(payload);
      setSession(session.token, session.user);
      return session.user;
    } catch (err) {
      error.value = err?.response?.data?.message || "Unable to login";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login,
    clearSession,
  };
});
