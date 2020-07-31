# Account

## Get Account Details

Allows a logged in user to get their account details.

#### Path

`/account`

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
curl --location --request GET 'https://www.example.com/api/account' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64'
```

Response

```json
{
  "code": 200,
  "user": {
    "emailVerified": true,
    "twoFactor": false,
    "isBanned": false,
    "isSuspended": false,
    "streamerMode": false,
    "role": "user",
    "isVerified": false,
    "_id": "5f11c79aef4efb1dcb8b1719",
    "username": "usermrdemonwolfgithubio",
    "email": "user@mrdemonwolf.github.io",
    "createdAt": "2020-07-17T15:45:30.270Z",
    "updatedAt": "2020-07-17T15:45:30.270Z",
    "slug": "usermrdemonwolfgithubio"
  }
}
```

## Update Account Details

Allows a logged in user to update their account details.

#### Path

`/account/update`

#### Method

`PUT`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Authorization | string | JWT token.                        |
| Content-Type  | string | application/x-www-form-urlencoded |

#### Body

| Field    | Type   | Description                          |
| :------- | :----- | :----------------------------------- |
| username | string | New Username for the current account |

#### Example

Request

```sh
curl --location --request PUT 'https://www.example.com/api/account/update' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64' \
--data-urlencode 'username=user'
```

Response

```json
{ "code": 200, "message": "Updated user profile." }
```

## Update Account Email

Allows a logged in user to update their email address with a new one. This does require them to have to verify said new email.

#### Path

`/account/update/email`

#### Method

`POST`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Authorization | string | JWT token.                        |
| Content-Type  | string | application/x-www-form-urlencoded |

#### Body

| Field    | Type   | Description                       |
| :------- | :----- | :-------------------------------- |
| newEmail | string | New email for the current account |

#### Example

Request

```sh
curl --location --request PUT 'https://www.example.com/api/account/update/email' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64' \
--data-urlencode 'newEmail=example@mrdemonwolf.github.io'
```

Response

```json
{
  "code": 200,
  "message": "A email verificationy has been sent to your new email and needs to be verified.",
  "newEmail": "example@mrdemonwolf.github.io"
}
```

<!-- ## Verify new email

Allows a logged in user to update their account details.

#### Path

`/account/update/email`

#### Method

`POST`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Authorization | string | JWT token.                        |
| Content-Type  | string | application/x-www-form-urlencoded |

#### Body

| Field    | Type   | Description                       |
| :------- | :----- | :-------------------------------- |
| newEmail | string | New email for the current account |

#### Example

Request

```sh
curl --location --request PUT 'https://www.example.com/api/account/update/email' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64' \
--data-urlencode 'newEmail=example@mrdemonwolf.github.io'
```

Response

```json

``` -->

## Update Two Factor Status

Allows a logged in user to update their two factor status.

#### Path

`/update/two-factor`

#### Method

`PUT`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Authorization | string | JWT token.                        |
| Content-Type  | string | application/x-www-form-urlencoded |

#### URL Params

| Field   | Type    | Description                              |
| :------ | :------ | :--------------------------------------- |
| boolean | boolean | true/false Enable or disable two factor. |

#### Body

| Field | Type   | Description             |
| :---- | :----- | :---------------------- |
| code  | string | Current Two Factor Code |

#### Examples

Request

```sh
curl --location --request PUT 'https://www.example.com/api/account/update/two-factor/true' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64'
```

Response

```json
{
  "code": 200,
  "secret": "IJVEM2K6CZJEQZKO",
  "qrCode": "",
  "message": "You must verify your two factor code before it will be enabled."
}
```

Request

```sh
curl --location --request PUT 'https://www.example.com/api/account/update/two-factor/false' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64' \
--data-urlencode 'code=171918'
```

Response

```json
{
  "code": 200,
  "message": "Two factor has been disabled."
}
```

## Verify Two Factor

Allows a logged in user verify two factor before enabling.

#### Path

`/update/two-factor`

#### Method

`POST`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Authorization | string | JWT token.                        |
| Content-Type  | string | application/x-www-form-urlencoded |

#### Body

| Field | Type   | Description     |
| :---- | :----- | :-------------- |
| code  | string | Two Factor Code |

#### Examples

Request

```sh
curl --location --request POST 'https://www.example.com/api/account/update/two-factor' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64' \
--data-urlencode 'code=171918'
```

Response

```json
{
  "code": 200,
  "message": "Verifyed.  Two Factor has been enabled."
}
```
