<template>
  <button
    type="button"
    class="button"
    :class="[
      'button',
      {
        button_primary: primary,
        button_secondary: secondary,
        button_danger: danger,
      },
    ]"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    primary: Boolean,
    secondary: Boolean,
    danger: Boolean,
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style src="./Button.scss" lang="scss" scoped></style>
