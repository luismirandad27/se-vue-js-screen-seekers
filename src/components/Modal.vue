<template>
  <div class="modal-mask">
    <div class="modal-container">
      <div :class="['modal-header', headerClass]">
        <h3>{{ title }}</h3>
        <button @click="closeModal">X</button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { ref, computed } from "vue";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const isModalOpen = ref(false);

    function openModal() {
      isModalOpen.value = true;
    }

    function closeModal() {
      isModalOpen.value = false;
      emit("close");
    }

    const headerClass = computed(() => {
      if (props.status === "success") {
        return "modal-header-success";
      } else if (props.status === "error") {
        return "modal-header-error";
      } else if (props.status === "info") {
        return "modal-header-info";
      } else if (props.status === "confirmation") {
        return "modal-header-confirmation";
      } else {
        return "modal-header";
      }
    });

    return {
      isModalOpen,
      openModal,
      closeModal,
      headerClass,
    };
  },
};
</script>
  