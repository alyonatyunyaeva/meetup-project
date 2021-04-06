<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <app-icon icon="trash" />
    </button>

    <div>{{ agendaTitles }}</div>

    <div class="form-group">
      <select v-model="agendaItem_.type" title="Тип">
        <option v-for="(value, key) in agendaTitles" :value="key" :key="key">{{
          value
        }}</option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            class="form-control"
            v-model="agendaItem_.startsAt"
            type="time"
            placeholder="00:00"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input
            class="form-control"
            v-model="agendaItem_.endsAt"
            type="time"
            placeholder="00:00"
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Заголовок</label>
      <input class="form-control" v-model="agendaItem_.title" />
    </div>
    <div class="form-group">
      <label class="form-label">Описание</label>
      <textarea
        class="form-control"
        v-model="agendaItem_.description"
      ></textarea>
    </div>
  </div>
</template>

<script>
import AppIcon from "@/components/AppIcon";
import { deepClone, deepEqual } from "@/utils";
import { agendaItemTitles } from "@/utils/data.js";

export default {
  name: "AgendaItemForm",

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  components: {
    AppIcon,
  },

  data() {
    return {
      agendaItem_: null,
    };
  },

  watch: {
    agendaItem: {
      deep: true,
      immediate: true,
      handler(newValue) {
        if (!deepEqual(newValue, this.agendaItem_)) {
          this.agendaItem_ = deepClone(this.agendaItem);
        }
      },
    },

    agendaItem_: {
      deep: true,
      handler(newValue) {
        this.$emit("update:agendaItem", deepClone(newValue));
      },
    },
  },
  computed: {
    agendaTitles() {
      return agendaItemTitles;
    },
  },
};
</script>

<style scoped>
.form-section {
  border: none;
  position: relative;
}
.form-section.form-section_inner {
  padding: 20px 10% 0 16px;
  border: 2px solid var(--blue-light);
  border-radius: 8px;
}
.form-section_inner .remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s all;
}

.form-section_inner .remove-button:hover {
  opacity: 0.6;
}

.form-group {
  position: relative;
  margin-bottom: 24px;
}
.form-label {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  margin-bottom: 10px;
  display: block;
}

.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s all;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form__row {
  display: flex;
  flex-direction: column;
}

.form__col + .form-col {
  margin-top: 16px;
}

.form__col:first-child {
  margin-left: 0;
}
@media all and (min-width: 992px) {
  .form-section.form-section_inner {
    padding: 28px 25% 4px 24px;
  }

  .form-section_inner .remove-button {
    top: 20px;
    right: 20px;
  }

  .form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .form__col {
    flex: 1 1 auto;
    padding: 0 12px;
    margin-top: 0;
  }

  .form__col:first-child {
    margin-left: 0;
  }
}
</style>
