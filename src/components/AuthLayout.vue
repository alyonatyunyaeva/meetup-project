<template>
  <div class="page page_onboarding">
    <div class="container">
      <div class="title">{{ title }}</div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
  props: {
    title: {
      type: String
    }
  }
};
</script>

<style scoped>
.page.page_onboarding {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
}
.title {
  font-family: Roboto,sans-serif;
  font-weight: 700;
  text-align: center;
  font-size: 32px;
  line-height: 37px;
  color: var(--body-color);
  margin: 0 0 32px;
}
</style>
