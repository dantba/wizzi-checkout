import { createStore } from "vuex";

const TIMEOUT = 3000;

export default createStore({
  state: {
    toast: {
      opened: false,
      timeout: TIMEOUT,
      message: "",
      color: "error",
    },
  },
  getters: {
    toast(state) {
      return state.toast;
    },
  },
  mutations: {
    toast(state, data) {
      state.toast.opened = true
      state.toast.timeout = data.timeout || TIMEOUT
      state.toast.message = data.message;
      state.toast.color = data.color;
    },
    closeToast (state) {
      state.toast.opened = false
      state.toast.message = ''
      state.toast.color = ''
    }
  },
  actions: {},
  modules: {},
});
