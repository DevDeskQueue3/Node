# Node

# EndPoints

## AUTH

### POST /api/auth/register

In order to register, a user needs to provide **name**, **email address**, **role** (that includes Admin, Student, Helper) and **password**.

If any of the required data is missing, it returns HTTP 400 (Bad Request) error.

### POST /api/auth/login

In order to register, a user needs to provide valid email and password.

If any of the required data is missing, it returns HTTP 400 (Bad Request) error.

If user is not found in the database, it should return HTTP 404 (Not Found) error.
