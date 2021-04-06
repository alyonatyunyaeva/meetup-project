<template>
  <div id="app">
    <BaseLayout>
      <router-view />
    </BaseLayout>
  </div>
</template>

<script>
import BaseLayout from "./components/BaseLayout";
export default {
  name: "App",
  components: { BaseLayout }
};
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
