---
title: Account
description: "Simple yet advanced uploader. Built-in tools for content moderation tools for admins, and with integration in mind."
position: 6
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
  "code": 200,
  "user": {
    "emailVerified": false,
    "isBanned": false,
    "streamerMode": false,
    "role": "user",
    "_id": "5f566fdd853a10598b553a24",
    "username": "MrDemonWolf",
    "email": "mrdemonwolf@example.com",
    "createdAt": "2020-09-07T17:37:33.526Z",
    "updatedAt": "2020-09-07T17:37:33.526Z",
    "slug": "mrdemonwolf"
  }
}
```

  </code-block>
</code-group>

## Email Change

Allows a logged in user to change their email

#### Path

`POST /account/email-change`

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
curl --location --request POST 'https://www.example.com/api/account/email-change' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjdiMmMwYjMwNmI2NTE4MGQyYjAyZGYiLCJpYXQiOjE2MDE5MDg4NjAsImV4cCI6MTYwMTkwOTE2MH0.5fhqZJH_29mpFneOySnAmOQsZj0nI7Su9-zJ1fNQZuM' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'email=nathan@example.com'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": 200,
  "message": "Please check your new email address to complate the email change."
}
```

  </code-block>
</code-group>

## Email Change resend

Allows a logged in user to resend email change confirmation.

#### Path

`POST /account/email-change/resend`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Content-Type  | string | application/x-www-form-urlencoded |
| Authorization | string | JWT access token.                 |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request POST 'https://www.example.com/api/account/email-change/resend' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjdiMmMwYjMwNmI2NTE4MGQyYjAyZGYiLCJpYXQiOjE2MDE5MDg4NjAsImV4cCI6MTYwMTkwOTE2MH0.5fhqZJH_29mpFneOySnAmOQsZj0nI7Su9-zJ1fNQZuM' \
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": 200,
  "message": "Please check your new email address to complate the email change."
}
```

  </code-block>
</code-group>

## Email Change with Token

Allow a logged in user to change their email with email verify token.

#### Path

`PUT /account/email-change/:email_token`

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
curl --location --request PUT 'https://www.example.com/api/account/email-change/:email_token' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjdiMmMwYjMwNmI2NTE4MGQyYjAyZGYiLCJpYXQiOjE2MDE5MDg4NjAsImV4cCI6MTYwMTkwOTE2MH0.5fhqZJH_29mpFneOySnAmOQsZj0nI7Su9-zJ1fNQZuM'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": 200,
  "message": "Please check your new email address to complate the email change."
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
curl --location --request PUT 'https://www.example.com/api//account/change-password' \
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
  "code": 200,
  "message": "Your password has been changed."
}
```

  </code-block>
</code-group>
