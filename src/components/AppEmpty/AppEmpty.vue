<template>
  <div class="meetup__empty">
    <slot>Нет данных</slot>
  </div>
</template>

<script>
export default {
  name: "AppEmpty",
};
</script>

<style scoped>
.meetup__empty {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 28px;
  color: var(--blue-2);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  margin: 32px 0;
}
</style>
