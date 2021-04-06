/** URL адрес API */
export const API_URL = "https://course-vue.javascript.ru/api";

/**
 * Выполняет авторизацию по логину и паролю и возвращает результат
 * @param {string} email - email пользователя
 * @param {string} password - пароль пользователя
 * @return {Promise} - объект с данными пользователя
 */

/**
 * Выполняет авторизацию по логину и паролю и возвращает результат
 * @param {string} email - email пользователя
 * @param {string} fullname - полное имя пользователя
 * @param {string} password - пароль пользователя
 * @return {Promise} - объект с данными зарегистрированного пользователя
 */
export async function register(email, fullname, password) {
  return fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, fullname, password }),
  }).then((res) => res.json());
}

export const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
export function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Получает данные митапа по его ID с API
 * @param {Number} id
 * @return {Promise}
 */
export async function fetchMeetup(id) {
  return fetch(`${API_URL}/meetups/${id}`).then((res) => res.json());
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
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

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
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
