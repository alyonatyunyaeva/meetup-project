<template>
  <div class="wrapper bg-grey">
    <Header />
    <main>
      <slot></slot>
    </main>
    <the-footer />
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import TheFooter from "@/components/Footer/Footer";
export default {
  name: "BaseLayout",
  components: {
    Header,
    TheFooter,
  },
};
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.bg-grey {
  background-color: var(--grey-light);
}
main {
  flex: 1 0 auto;
}
</style>
