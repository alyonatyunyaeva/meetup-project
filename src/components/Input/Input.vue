<template>
  <div class="form-group">
    <label class="form-label">{{ label }}</label>
    <input
      v-if="!textarea"
      class="form-control"
      :value="value"
      v-on:change="$emit('change', $event.target.value)"
    />
    <textarea
      v-else
      class="form-control"
      :value="value"
      v-on:change="$emit('change', $event.target.value)"
      style="min-height: 150px"
    />
    <div style="color: red" v-show="showError">
      Поле обязательно
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: String,
    showError: Boolean,
    textarea: Boolean,
  },
  model: {
    prop: "value",
    event: "change",
  },
  methods: {
    // onChange(e) {
    //   this.$emit("change", e.target.value);
    // },
  },
};
</script>

<style src="./Input.scss" lang="scss" scoped></style>
