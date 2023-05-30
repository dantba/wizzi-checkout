<template>
  <transition name="fade">
    <div v-if="toast.opened" class="toast-modal" :class="toast.color">
      <v-row no-gutters align="center">
        <v-col sm="10">
          {{ toast.message }}
        </v-col>
        <v-col sm="2">
          <mdicon
            name="close"
            @click="closeToast"
          />
        </v-col>
      </v-row>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ToastComponent",
  data() {
    return {};
  },
  watch: {
    "toast.message": {
      handler() {
        setTimeout(() => {
          this.closeToast();
        }, this.toast.timeout);
      },
    },
  },
  computed: {
    toast() {
      return this.$store.getters.toast;
    },
  },
  methods: {
    closeToast() {
      this.$store.commit("closeToast");
    },
  },
};
</script>

<style lang="scss" scoped>
.toast-modal {
  @media (max-width: 768px) {
    width: 100%;
    left: 0;
  }

  height: auto;
  bottom: 0;
  padding: 16px;
  position: absolute;
  border-radius: 5px;
  color: white;
  transition: all 2s ease;
  z-index: 1;
  width: 400px;
  left: calc(50% - 200px);
}
.success {
  background-color: #239f28;
}
.error {
  background-color: #c6504e;
}

</style>
