export const API_URL = "https://course-vue.javascript.ru/api";

//Возвращает ссылку на изображение митапа для митапа

export function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

// Словарь заголовков по умолчанию для всех типов элементов программы

export const agendaItemTitles = {
  registration: "Регистрация",
  opening: "Открытие",
  break: "Перерыв",
  coffee: "Coffee Break",
  closing: "Закрытие",
  afterparty: "Afterparty",
  talk: "Доклад",
  other: "Другое",
};

//Словарь иконок для для всех типов элементов программы.

export const agendaItemIcons = {
  registration: "key",
  opening: "cal-sm",
  talk: "tv",
  break: "clock",
  coffee: "coffee",
  closing: "key",
  afterparty: "cal-sm",
  other: "cal-sm",
};

//Доступные языки
export const languages = [
  {
    value: "RU",
    title: "Ru",
  },
  {
    value: "EN",
    title: "En",
  },
];
