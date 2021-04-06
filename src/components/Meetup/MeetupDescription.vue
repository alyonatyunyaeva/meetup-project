<template>
  <div>
    <p class="meetup-description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    description: String
  }
};
</script>

<style>
.meetup-description {
  padding-top: 33px;
}
</style>
