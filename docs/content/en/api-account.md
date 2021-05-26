---
title: Account
description: Simple yet advanced NodeJS, MongoDB and Express based uploader.
position: 7
category: API
---

## Account

Allows a logged in user to get their account details.

#### Path

`GET /account`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Content-Type  | string | application/x-www-form-urlencoded |
| Authorization | string | JWT access token.                 |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request GET 'https://www.example.com/api/account' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjRiZmYxMjEwMzdlNDI0YTE3YTNlYmMiLCJpYXQiOjE1OTkyNDE1OTMsImV4cCI6MTU5OTI0MzM5M30.FuLUNEc_lE8jI2KEur0KsQzZFjIh5kymnLdR0Udycxk'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "user": {
    "twoFactor": false,
    "emailVerified": true,
    "isBanned": false,
    "streamerMode": false,
    "role": "user",
    "_id": "5f566fdd853a10598b553a24",
    "username": "MrDemonWolf",
    "email": "mrdemonwolf@example.com",
    "createdAt": "2020-09-07T17:37:33.526Z",
    "updatedAt": "2020-09-07T17:37:33.526Z",
    "slug": "mrdemonwolf",
    "__v": 140
  }
}
```

  </code-block>
</code-group>

## Initialize Two Factor

Allows a logged in user to initiative the enable of two factor on their account.

#### Path

`POST /account/two-factor`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Content-Type  | string | application/x-www-form-urlencoded |
| Authorization | string | JWT access token.                 |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request POST 'https://www.example.com/api/account/two-factor' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjdiMmMwYjMwNmI2NTE4MGQyYjAyZGYiLCJpYXQiOjE2MDE5MDg4NjAsImV4cCI6MTYwMTkwOTE2MH0.5fhqZJH_29mpFneOySnAmOQsZj0nI7Su9-zJ1fNQZuM'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "PENDING_VERIFICATION",
  "error": "Two Factor is pending verification.",
  "qrcode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANQAAADUCAYAAADk3g0YAAAAAklEQVR4AewaftIAAAppSURBVO3BQY4YybLgQDJR978yR0tfBZDIKKn..........",
  "twoFactorSecret": "I5TCO6QBCFIRSVRR"
}
```

  </code-block>
</code-group>

## Enable Two Factor

Allows a logged in user to enable of two factor on their account after initialize.

#### Path

`PATCH /account/two-factor`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Content-Type  | string | application/x-www-form-urlencoded |
| Authorization | string | JWT access token.                 |

#### Body

| Field | Type   | Description                     |
| :---- | :----- | :------------------------------ |
| code  | string | Two Factor code from users app. |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request PATCH 'https://www.example.com/api/account/two-factor' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjdiMmMwYjMwNmI2NTE4MGQyYjAyZGYiLCJpYXQiOjE2MDE5MDg4NjAsImV4cCI6MTYwMTkwOTE2MH0.5fhqZJH_29mpFneOySnAmOQsZj0nI7Su9-zJ1fNQZuM' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'code=123456'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "TWO_FACTOR_ENABLED",
  "message": "Two factor has been enabled."
}
```

  </code-block>
</code-group>

## Disable Two Factor

Allows a logged in user to disable two factor on their account.

#### Path

`DELETE /account/two-factor`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Content-Type  | string | application/x-www-form-urlencoded |
| Authorization | string | JWT access token.                 |

#### Query

| Field | Type   | Description                     |
| :---- | :----- | :------------------------------ |
| code  | string | Two Factor code from users app. |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request DELETE 'https://www.example.com/api/account/two-factor?code=123456' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjdiMmMwYjMwNmI2NTE4MGQyYjAyZGYiLCJpYXQiOjE2MDE5MDg4NjAsImV4cCI6MTYwMTkwOTE2MH0.5fhqZJH_29mpFneOySnAmOQsZj0nI7Su9-zJ1fNQZuM'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "TWO_FACTOR_DISABLED",
  "message": "Two factor has been disabled."
}
```

  </code-block>
</code-group>

## Two Factor Backup Codes

Allows a logged in user with two factor enabled to download their backup codes.

#### Path

`GET /account/two-factor/backup-codes`

#### Headers

| Field         | Type   | Description       |
| :------------ | :----- | :---------------- |
| Authorization | string | JWT access token. |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request GET 'https://www.example.com/api/account/two-factor/backup-codes' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjdiMmMwYjMwNmI2NTE4MGQyYjAyZGYiLCJpYXQiOjE2MDE5MDg4NjAsImV4cCI6MTYwMTkwOTE2MH0.5fhqZJH_29mpFneOySnAmOQsZj0nI7Su9-zJ1fNQZuM'
```

  </code-block>
  <code-block label="Response
">

```txt
20685098 57520049
```

  </code-block>
</code-group>

## Email Change

Allows a logged in user to change their email

#### Path

`POST /account/change-email`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Content-Type  | string | application/x-www-form-urlencoded |
| Authorization | string | JWT access token.                 |

#### Body

| Field | Type   | Description        |
| :---- | :----- | :----------------- |
| email | string | New account email. |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request POST 'https://www.example.com/api/account/change-email' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjdiMmMwYjMwNmI2NTE4MGQyYjAyZGYiLCJpYXQiOjE2MDE5MDg4NjAsImV4cCI6MTYwMTkwOTE2MH0.5fhqZJH_29mpFneOySnAmOQsZj0nI7Su9-zJ1fNQZuM' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'email=nathan@example.com'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "PENDING_CONFIRMATION",
  "message": "Please check your new email address to complate the email change."
}
```

  </code-block>
</code-group>

## Email Change resend

Allows a logged in user to resend email change confirmation.

#### Path

`POST /account/change-email/resend`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Content-Type  | string | application/x-www-form-urlencoded |
| Authorization | string | JWT access token.                 |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request POST 'https://www.example.com/api/account/change-email/resend' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjdiMmMwYjMwNmI2NTE4MGQyYjAyZGYiLCJpYXQiOjE2MDE5MDg4NjAsImV4cCI6MTYwMTkwOTE2MH0.5fhqZJH_29mpFneOySnAmOQsZj0nI7Su9-zJ1fNQZuM' \
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "PENDING_CONFIRMATION",
  "message": "Please check your new email address to complate the email change."
}
```

  </code-block>
</code-group>

## Email Change with Token

Allow a logged in user to change their email with email verify token.

#### Path

`PUT /account/change-email/:email_token`

#### Headers

| Field        | Type   | Description                       |
| :----------- | :----- | :-------------------------------- |
| Content-Type | string | application/x-www-form-urlencoded |

#### Params

| Field       | Type   | Description         |
| :---------- | :----- | :------------------ |
| email_token | string | Email change token. |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request PUT 'https://www.example.com/api/account/change-email/:email_token' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjdiMmMwYjMwNmI2NTE4MGQyYjAyZGYiLCJpYXQiOjE2MDE5MDg4NjAsImV4cCI6MTYwMTkwOTE2MH0.5fhqZJH_29mpFneOySnAmOQsZj0nI7Su9-zJ1fNQZuM'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "EMAIL_CHANGED",
  "message": "Your email has been changed successfully."
}
```

  </code-block>
</code-group>

## Password Change

Allows a logged in user to change their password.

#### Path

`PUT /account/change-password`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Content-Type  | string | application/x-www-form-urlencoded |
| Authorization | string | JWT access token.                 |

#### Body

| Field       | Type   | Description               |
| :---------- | :----- | :------------------------ |
| oldPassword | string | Old Password for account  |
| newPassword | string | New password for account. |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request PUT 'https://www.example.com/api/account/change-password' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjdiMmMwYjMwNmI2NTE4MGQyYjAyZGYiLCJpYXQiOjE2MDE5MDg4NjAsImV4cCI6MTYwMTkwOTE2MH0.5fhqZJH_29mpFneOySnAmOQsZj0nI7Su9-zJ1fNQZuM' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'oldPassword=password' \
--data-urlencode 'newPassword=password123'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "PASSWORD_CHANGED",
  "message": "Your password has been changed."
}
```

  </code-block>
</code-group>

## Username Change

Allows a logged in user to change their username.

#### Path

`PUT /account/change-username`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Content-Type  | string | application/x-www-form-urlencoded |
| Authorization | string | JWT access token.                 |

#### Body

| Field    | Type   | Description               |
| :------- | :----- | :------------------------ |
| username | string | New username for account. |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request PUT 'https://www.example.com/api/account/change-username' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjdiMmMwYjMwNmI2NTE4MGQyYjAyZGYiLCJpYXQiOjE2MDE5MDg4NjAsImV4cCI6MTYwMTkwOTE2MH0.5fhqZJH_29mpFneOySnAmOQsZj0nI7Su9-zJ1fNQZuM' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username=Example123'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "USERNAME_CHANGED",
  "message": "Your username has been changed to MrDemonWolf69"
}
```

  </code-block>
</code-group>

## Sessions

Allows a logged in user to get their current sessions.

#### Path

`GET /account/sessions`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Content-Type  | string | application/x-www-form-urlencoded |
| Authorization | string | JWT access token.                 |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request GET 'https://www.example.com/api/account/sessions' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjRiZmYxMjEwMzdlNDI0YTE3YTNlYmMiLCJpYXQiOjE1OTkyNDE1OTMsImV4cCI6MTU5OTI0MzM5M30.FuLUNEc_lE8jI2KEur0KsQzZFjIh5kymnLdR0Udycxk'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "sessions": [
    {
      "device": {
        "browser": "Chrome",
        "version": "87.0.4280.88",
        "platform": "unknown",
        "os": "Linux",
        "isDev": false
      },
      "location": "unknown",
      "_id": "5fe00728d0adc5576af8684f",
      "expireAt": "2021-01-04T02:23:36.377Z",
      "createdAt": "2020-12-21T02:23:36.380Z"
    },
    {
      "device": {
        "browser": "PostmanRuntime",
        "version": "7.26.8",
        "platform": "unknown",
        "os": "unknown",
        "isDev": true
      },
      "location": "unknown",
      "_id": "5fe3ba46faeea10f7b9fabc9",
      "expireAt": "2021-01-06T21:44:38.337Z",
      "createdAt": "2020-12-23T21:44:38.380Z"
    }
  ]
}
```

  </code-block>
</code-group>

## Revoke Session

Allows a logged in user to revoke a session.

#### Path

`DELETE /account/sessions/:session_id`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Content-Type  | string | application/x-www-form-urlencoded |
| Authorization | string | JWT access token.                 |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request DELETE 'https://www.example.com/api/account/sessions/:session_id' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjRiZmYxMjEwMzdlNDI0YTE3YTNlYmMiLCJpYXQiOjE1OTkyNDE1OTMsImV4cCI6MTU5OTI0MzM5M30.FuLUNEc_lE8jI2KEur0KsQzZFjIh5kymnLdR0Udycxk'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "SESSION_REVOKED",
  "error": "Session has been revoked."
}
```

  </code-block>
</code-group>

## Revoke Sessions

Allows a logged in user to revoke all sessions

#### Path

`DELETE /account/sessions`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Content-Type  | string | application/x-www-form-urlencoded |
| Authorization | string | JWT access token.                 |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request DELETE 'https://www.example.com/api/account/sessions' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjRiZmYxMjEwMzdlNDI0YTE3YTNlYmMiLCJpYXQiOjE1OTkyNDE1OTMsImV4cCI6MTU5OTI0MzM5M30.FuLUNEc_lE8jI2KEur0KsQzZFjIh5kymnLdR0Udycxk'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "ALL_SESSIONS_REVOKE",
  "error": "All Sessions has been revoked."
}
```

  </code-block>
</code-group>
