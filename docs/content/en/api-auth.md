---
title: Auth
description: Simple yet advanced NodeJS, MongoDB and Express based uploader.
position: 5
category: API
---

## Register

Allows a user to register for a account.

#### Path

`POST /auth/register`

#### Headers

| Field        | Type   | Description                       |
| :----------- | :----- | :-------------------------------- |
| Content-Type | string | application/x-www-form-urlencoded |

#### Body

| Field    | Type   | Description                  |
| :------- | :----- | :--------------------------- |
| username | string | Username of the new account. |
| email    | string | Email of the new account.    |
| password | string | Password of the new account. |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request POST 'https://www.example.com/api/auth/register' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username=usermrdemonwolfgithubio' \
--data-urlencode 'email=user@mrdemonwolf.github.io' \
--data-urlencode 'password=user@mrdemonwolf.github.io'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "PENDING_CONFIRMATION",
  "error": "Please confirm your email address to complete the registration."
}
```

  </code-block>
</code-group>

## Login

Allows a user to login with their account.

#### Path

`POST /auth/login`

#### Headers

| Field        | Type   | Description                       |
| :----------- | :----- | :-------------------------------- |
| Content-Type | string | application/x-www-form-urlencoded |

#### Body

| Field    | Type   | Description                      |
| :------- | :----- | :------------------------------- |
| email    | string | Email of the current account.    |
| password | string | Password of the current account. |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request POST 'https://www.example.com/api/auth/login' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'email=user@mrdemonwolf.github.io' \
--data-urlencode 'password=uuser@mrdemonwolf.github.io'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjRiZmYxMjEwMzdlNDI0YTE3YTNlYmMiLCJpYXQiOjE1OTkyNDE1OTMsImV4cCI6MTU5OTI0MzM5M30.FuLUNEc_lE8jI2KEur0KsQzZFjIh5kymnLdR0Udycxk",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjRiZmYxMjEwMzdlNDI0YTE3YTNlYmMiLCJpYXQiOjE1OTkyNDE1OTMsImV4cCI6MTU5OTMyNzk5M30.QtOrs1kJyh7sWDt2Y0_VpPRyXYZcfK9W4SR-YsxCrHk",
  "twoFactor": false
}
```

  </code-block>
</code-group>

## Login with Two Factor

Allows a user to login with their account if two factor is enabled.

#### Path

`POST /auth/two-factor`

#### Headers

| Field        | Type   | Description                       |
| :----------- | :----- | :-------------------------------- |
| Content-Type | string | application/x-www-form-urlencoded |

#### Body

| Field | Type   | Description                        |
| :---- | :----- | :--------------------------------- |
| Token | string | Login initialize two factor token. |
| Code  | string | Code from the Two Factor from app. |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request POST 'https://www.example.com/api/auth/two-factor' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'token=qh8C0G8azJRUJmdn9jCiZNJ0pTLmBldoChcRvPgt31GEOD5sShmHzqn7ROCzqwU2' \
--data-urlencode 'code=110450'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjRiZmYxMjEwMzdlNDI0YTE3YTNlYmMiLCJpYXQiOjE1OTkyNDE1OTMsImV4cCI6MTU5OTI0MzM5M30.FuLUNEc_lE8jI2KEur0KsQzZFjIh5kymnLdR0Udycxk",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjRiZmYxMjEwMzdlNDI0YTE3YTNlYmMiLCJpYXQiOjE1OTkyNDE1OTMsImV4cCI6MTU5OTMyNzk5M30.QtOrs1kJyh7sWDt2Y0_VpPRyXYZcfK9W4SR-YsxCrHk",
  "twoFactor": true
}
```

  </code-block>
</code-group>

## Login Refresh

Allows a user to refresh their login token with a new one

#### Path

`POST /auth/refresh`

#### Headers

| Field        | Type   | Description                       |
| :----------- | :----- | :-------------------------------- |
| Content-Type | string | application/x-www-form-urlencoded |

#### Body

| Field         | Type   | Description        |
| :------------ | :----- | :----------------- |
| refresh_token | string | JWT refresh token. |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request POST 'https://www.example.com/api/auth/refresh' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjRiZmYxMjEwMzdlNDI0YTE3YTNlYmMiLCJpYXQiOjE1OTkyNDE1OTMsImV4cCI6MTU5OTMyNzk5M30.QtOrs1kJyh7sWDt2Y0_VpPRyXYZcfK9W4SR-YsxCrHk' \
```

  </code-block>
  <code-block label="Response
">

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjRiZmYxMjEwMzdlNDI0YTE3YTNlYmMiLCJpYXQiOjE1OTkyNDE3MjIsImV4cCI6MTU5OTI0MzUyMn0.OUiiTCNHlwRkbLjjtRtkD2I90-vcTKGvjlOlTcdg_Og",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjRiZmYxMjEwMzdlNDI0YTE3YTNlYmMiLCJpYXQiOjE1OTkyNDE3MjIsImV4cCI6MTU5OTMyODEyMn0.vWp-l7WGCPWS1zTUeldd_8arjG5KC4YDVhFU0b-E6As"
}
```

  </code-block>
</code-group>

## Logout

Allows a user logout of their account which revokes the current login token.

#### Path

`POST /auth/logout`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Authorization | string | JWT token.                        |
| Content-Type  | string | application/x-www-form-urlencoded |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request POST 'https://www.example.com/api/auth/logout' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "LOGGED_OUT",
  "error": "You are now logged out."
}
```

  </code-block>
</code-group
