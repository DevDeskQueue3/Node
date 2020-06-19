# DevDesk Node Backend

## Schema
[![DevDesk Schema](./devdesk-schema.png)](https://dbdesigner.page.link/HWd9oM44iNGwjuH88)
[View on DB Designer](https://dbdesigner.page.link/HWd9oM44iNGwjuH88)

## API Endpoints
API deployed to Heroku: https://devdeskqueue3-pt.herokuapp.com/

All endpoints receive and return JSON

### Auth
| Method | URL                | Description                         | Receives                            | Returns                                   |
| ------ | ------------------ | ----------------------------------- | ----------------------------------- | ----------------------------------------- |
| POST   | /api/auth/login    | Login endpoint for registered users | `email`, `password`                 | `id`, `name`, `email`, [`roles`], `token` |
| POST   | /api/auth/register | Register endpoint for new users     | `name`, `email`, `password`, `role` | `id`, `name`, `email`, [`roles`], `token` |
