# DevDesk Node Backend

## Schema

[![DevDesk Schema](./devdesk-schema.png)](https://dbdesigner.page.link/HWd9oM44iNGwjuH88)
[View on DB Designer](https://dbdesigner.page.link/HWd9oM44iNGwjuH88)

## API Endpoints

Deployed to Heroku: https://devdeskqueue3-pt.herokuapp.com/

All endpoints receive and return JSON

### Auth

| Method | URL                | Description                         |
| ------ | ------------------ | ----------------------------------- |
| POST   | /api/auth/login    | Login endpoint for registered users |
| POST   | /api/auth/register | Register endpoint for new users     |

___

`POST /api/auth/login`

**Receives**
```json
{
    "email": "alice@gmail.com",
    "password": "hello"
}
```

**Returns**
```json
{
    "id": 5,
    "name": "Alice",
    "email": "alice@gmail.com",
    "roles": [
        "STUDENT"
    ],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IkFsaWNlIiwiZW1haWwiOiJhbGljZUBnbWFpbC5jb20iLCJyb2xlcyI6WyJTVFVERU5UIl0sImlhdCI6MTU5MjYxODM4MiwiZXhwIjoxNTkyNjI1NTgyfQ.JCn_0iOCptEmJ7xIKBf4tOPHZanncar719n0mGdHiI8"
}
```

___

`POST /api/auth/register`

**Receives**
```json
{
    "name": "Alice",
    "password": "hello",
    "email": "alice@gmail.com",
    "role": "STUDENT"
}
```

**Returns**
```json
{
    "id": 5,
    "name": "Alice",
    "email": "alice@gmail.com",
    "roles": [
        "STUDENT"
    ],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IkFsaWNlIiwiZW1haWwiOiJhbGljZUBnbWFpbC5jb20iLCJyb2xlcyI6WyJTVFVERU5UIl0sImlhdCI6MTU5MjYxMTQyNSwiZXhwIjoxNTkyNjE4NjI1fQ.WsufM68xVT-DcEbfyOBFwq_VC-6Xjr5wc4-ktgO3mxo"
}
```
___

### Tickets

| Method | URL              | Description                                                                    |
| ------ | ---------------- | ------------------------------------------------------------------------------ |
| GET    | /api/tickets     | Returns an array of all tickets                                                |
| POST   | /api/tickets     | Creates a new ticket for the logged in user. Returns the ticket                |
| PUT    | /api/tickets/:id | Updates an existing ticket belonging to the logged in user. Returns the ticket |
| DELETE | /api/tickets/:id | Deletes a ticket by ID                                                         |


___
`GET /api/tickets`

**Returns**
```json
[
    {
    "ticket_id": 3,
    "posted_by_id": 2,
    "posted_by_name": "testuser2",
    "posted_at": "2020-06-23T01:49:29.454Z",
    "status": "OPEN",
    "title": "Ticket 3",
    "description": "Ticket 3 description text ",
    "categories": [
        "CSS",
        "HTML",
        "React"
    ],
    "claimed_by_id": 1,
    "claimed_by_name": "testuser1"
    }
]
```
___
`POST /api/tickets`

**Receives**
```json
{
    "title": "new ticket!",
    "description": "here's the description",
    "what_ive_tried": "here's what I've tried"
}
```


**Returns**
```json
{
    "id": 6,
    "posted_at": "2020-06-23T02:52:36.742Z",
    "status": "OPEN",
    "title": "new ticket!",
    "description": "here's the description",
    "what_ive_tried": "here's what I've tried"
}
```
___

`PUT /api/tickets/:id`

**Receives**
```json
{
    "title": "updated ticket!",
    "description": "here's the description",
    "what_ive_tried": "here's what I've tried"
}
```


**Returns**
```json
{
    "id": 6,
    "posted_at": "2020-06-23T02:52:36.742Z",
    "status": "OPEN",
    "title": "updated ticket!",
    "description": "here's the description",
    "what_ive_tried": "here's what I've tried"
}
```
___