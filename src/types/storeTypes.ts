export enum LocationStatusMessage {
    NotPermission = 'Нет доступа к локации',
    NoData = 'Нет данных',
    AwaitData = 'Определение местоположения',
    DataReady = 'Местоположение определено',
    AwaitWorkBase = 'Получаем вакансии',
    FullDataReady = 'Вакансии загружены',
    ErrorLocation = 'Не удалось получить данные',
    ErrorData = 'Ошибка получения вакансий'
}

/**
 * Нумерованные статусы для работы с геолокацией
 *
 * @enum {number}
 */
export enum LocationStatus {
    /**
     * Отсутствие данных о местоположении
     */
    NoData = 0,
    /**
     * Доступ к геолокации запрещен пользователем
     */
    NoPermission = 1,
    /**
     * В процессе получения координат
     */
    AwaitData = 2,
    /**
     * Геолокация успешно определена
     */
    DataReady = 3,
    /**
     * Ожидаем данные о работе
     */
    AwaitWorkBase = 4,
    /**
     * Все готово
     */
    FullDataReady = 5,
    /**
     * Ошибка получения данных о местоположении
     */
    ErrorLocation = 6,
    /**
     * Ошибка получения данных от сервера
     */
    ErrorData = 7
}