<template>
  <div class="page-tabs">
    <button
      type="button"
      class="page-tabs__tab"
      :class="{ 'page-tabs__tab_active': selected === 'list' }"
      @click="$emit('update:selected', 'list')"
    >
      <AppIcon icon="burger" />
    </button>
    <button
      type="button"
      class="page-tabs__tab"
      :class="{ 'page-tabs__tab_active': selected === 'calendar' }"
      @click="$emit('update:selected', 'calendar')"
    >
      <AppIcon icon="calendar" />
    </button>
  </div>
</template>

<script>
import AppIcon from "@/components/AppIcon/AppIcon";
export default {
  name: "PageTabs",
  components: {
    AppIcon,
  },
  props: {
    selected: {
      type: String,
      default: "list",
      validator: (value) => ["list", "calendar"].includes(value),
    },
  },
};
</script>

<style>
.page-tabs {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
  width: 96px;
}

.page-tabs__tab {
  height: 44px;
  width: 48px;
  border: 2px solid var(--blue);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.2s all;
  background-color: var(--white);
  box-shadow: none;
  outline: none;
  cursor: pointer;
}

.page-tabs__tab:first-child {
  border-radius: 22px 0 0 22px;
  padding-left: 2px;
}

.page-tabs__tab:last-child {
  border-radius: 0 22px 22px 0;
  padding-right: 2px;
}

.page-tabs__tab.page-tabs__tab_active {
  background-color: var(--blue);
}

.page-tabs__tab svg,
.page-tabs__tab svg {
  fill: var(--blue);
}

.page-tabs__tab:hover,
.page-tabs__tab.page-tabs__tab_active {
  background-color: var(--blue);
}

.page-tabs__tab:hover svg,
.page-tabs__tab.page-tabs__tab_active svg {
  fill: var(--white);
}
</style>
