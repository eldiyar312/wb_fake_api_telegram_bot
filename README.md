# Telegram BOT

## 1) Установка инструметов

Нужно установить [Node.js](https://nodejs.org/) LTS и [PostgreSql](https://www.postgresql.org/)

Конфигурация env file:
1) создать .env и скопировать с .env.example
2) В файле .env надо вставить нужные данные, например токен телеграм бота и конфиги postgresql базы (пароль, имя пользователя, порт, имя базы, хост)

##  2) Установка зависимостей и запуск сервера
```sh
npm install
npm run build
cp .env ./build
cd build
npm ci --production
node server.js
```
