<template>
  <div class="form-group">
    <FormLabel>{{ label }}</FormLabel>
    <input
      v-if="!textarea"
      class="form-control"
      :value="value"
      v-on:change="$emit('change', $event.target.value)"
      :type="type"
    />
    <textarea
      v-else
      class="form-control"
      :value="value"
      v-on:change="$emit('change', $event.target.value)"
      style="min-height: 150px"
    />
    <div style="color: red" v-show="showError">{{ errorText }}</div>
  </div>
</template>

<script>
import FormLabel from "@/components/FormLabel/FormLabel";

export default {
  components: { FormLabel },
  props: {
    label: String,
    value: String,
    showError: Boolean,
    textarea: Boolean,
    type: String,
    errorText: {
      type: String,
      default: "Поле обязательно",
    },
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
