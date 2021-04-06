<template>
  <div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="toPrevMonth"></button>
          <div>{{ dateStringify }}</div>
          <button class="rangepicker__selector-control-right" @click="toNextMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div class="rangepicker__cell" v-bind:class="{ rangepicker__cell_inactive: day.isInactive }" v-for="day in daysArray" :key="day.id">
          {{ day.dayNum }}
          <div v-if="day.todaysMeetups"> 
            <a 
              v-for="meetup in day.todaysMeetups" 
              :href="'/meetup/'+meetup.id" 
              class="rangepicker__event" 
              :key="meetup.id"
            >
              {{ meetup.title }}
            </a>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MeetupsCalendar",

  props: {
    meetups: {
      type: Array,
      required: true,
    }
  },

  data() {
    return{
      date: new Date(),
    }
  },

  computed: {
    currentMonth(){
      return this.date.getMonth()
    },
    currentFullYear(){
      return this.date.getFullYear()
    },
    dateStringify(){
      return this.date.toLocaleString(navigator.language, {year: 'numeric', month: 'long',});
    },
    daysArray(){
      let currentDate;
      let prevDays;
      let nextDays;
      let firstDay = new Date(this.currentFullYear, this.currentMonth, 1).getDay();
      let lastDay = new Date(this.currentFullYear, this.currentMonth+1, 0).getDay();
      let daysArray = [];
      let todaysMeetups = [];
      
      firstDay === 0 ? prevDays = 6 : prevDays = firstDay - 1;
      lastDay === 0 ? nextDays = 0 : nextDays = 7 - lastDay;

      let i = 1 - prevDays; 
      let total = prevDays + (new Date(this.currentFullYear, this.currentMonth+1, 0).getDate()) + nextDays;

      while (daysArray.length < total) {
        currentDate = new Date(this.currentFullYear, this.currentMonth, i);
        todaysMeetups = this.meetups.filter((meetup)=>{
          let meetupDateStr = new Date(meetup.date).toLocaleString(navigator.language, {year: 'numeric', month: 'long', day: 'numeric'});
          let currentDateStr = currentDate.toLocaleString(navigator.language, {year: 'numeric', month: 'long', day: 'numeric'});
          return meetupDateStr === currentDateStr;
        });
        daysArray.push({
          id: Math.random() * (1000 - 1) + 1,
          dayDate: currentDate,
          dayNum: currentDate.getDate(),
          isInactive: (daysArray.length < prevDays) || (daysArray.length >= (total - nextDays)),
          todaysMeetups: todaysMeetups.length ? todaysMeetups : null,
        }
        );
        i++;
      }
      return daysArray;
    }
  },

  methods: {
    toPrevMonth(){
      this.date = new Date(this.currentFullYear, this.currentMonth-1);
    },
    toNextMonth(){
      this.date = new Date(this.currentFullYear, this.currentMonth+1);
    },
  }
};

</script>

<style>
  .rangepicker {
    position: relative;
    margin: 32px 0 0;
}

.rangepicker__selector {
    display: flex;
    background-color: var(--white);
    flex-direction: row;
    justify-content: space-between;
    flex: 1 0 100%;
}

.rangepicker__calendar {
    flex-grow: 1;
}

.rangepicker__month-indicator {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 1;
    color: var(--blue);
    background-color: var(--blue-extra);
    padding: 24px;
    display: flex;
    justify-content: center;
}

.rangepicker__selector-controls {
    max-width: 325px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-transform: capitalize;
}
.rangepicker__selector-controls button {
    border: none;
    padding: 0;
}

.rangepicker__selector-control-left,
.rangepicker__selector-control-right {
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s all;
    background: url("../../assets/icons/icon-pill-active.svg") left center no-repeat;
    background-size: cover;
}

.rangepicker__selector-control-left:hover,
.rangepicker__selector-control-right:hover {
    opacity: 0.8;
}

.rangepicker__selector-control-right {
    transform: rotate(180deg);
}

.rangepicker__date-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
}

/* Dates */
.rangepicker__date-grid {
    border: 1px solid var(--grey);
    border-bottom: none;
}

.rangepicker__cell {
    position: relative;
    height: auto;
    padding: 6px 8px;
    background-color: var(--white);
    color: var(--grey-8);
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    border-bottom: 1px solid var(--grey);
    border-left: 1px solid var(--grey);
    text-align: right;
}

.rangepicker__cell.rangepicker__cell_inactive {
    background-color: var(--grey-light);
}

.rangepicker__event {
    --maxLines: 2;
    --lineHeight: 16px;
    --fontSize: 14px;

    display: block;

    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: var(--fontSize);
    line-height: var(--lineHeight);
    font-weight: 600;
    color: var(--white);
    padding: 4px 6px;
    border-radius: 2px;
    background-color: var(--blue);
    text-decoration: none;
    margin-top: 4px;
}

@media all and (max-width: 767px) {
    .rangepicker__cell:nth-child(5n + 1) {
        border-left: none;
    }
}

@media all and (min-width: 767px) {
    .rangepicker__date-grid {
        grid-template-columns: repeat(7, 1fr);
    }

    .rangepicker__cell {
        height: 144px;
    }

    .rangepicker__cell:nth-child(7n + 1) {
        border-left: none;
    }

    .rangepicker__event {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        max-height: calc(var(--maxLines) * var(--lineHeight) + 6px);
    }
}

</style>
