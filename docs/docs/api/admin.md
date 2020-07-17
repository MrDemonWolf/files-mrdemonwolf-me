# Admin

## List Users

Allow a admin to get a list all the users.

#### Path

`/admin/users`

#### Method

`GET`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Authorization | string | JWT token.                        |
| Content-Type  | string | application/x-www-form-urlencoded |

#### Example

Request

```sh
curl --location --request GET 'https://www.example.com/api/admin/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64'
```

Response

```json

```
