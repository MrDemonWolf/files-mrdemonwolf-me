---
title: User
description: Simple yet advanced NodeJS, MongoDB and Express based uploader.
position: 5
category: API
---

## Activate account

Allows a register user to activate their account with token.

#### Path

`PUT /user/activate-account/`

#### Headers

| Field        | Type   | Description                       |
| :----------- | :----- | :-------------------------------- |
| Content-Type | string | application/x-www-form-urlencoded |

#### Params

| Field          | Type   | Description                |
| :------------- | :----- | :------------------------- |
| activate_token | string | Token to activate account. |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request PUT 'https://www.example.com/api/user/activate-account/:activate_token' \
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "ACTIVATED",
  "message": "Good job! Your account is now activated and you can start using WolfPal."
}
```

  </code-block>
</code-group>

## Resend Activate account

Allows a register user resend account activate token to their email.

#### Path

`POST /user/activate-account/resend`

#### Headers

| Field        | Type   | Description                       |
| :----------- | :----- | :-------------------------------- |
| Content-Type | string | application/x-www-form-urlencoded |

#### Body

| Field | Type   | Description               |
| :---- | :----- | :------------------------ |
| email | string | Email of current account. |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request POST 'https://www.example.com/api/user/activate-account/:activate_token' \
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "PENDING_CONFIRMATION",
  "message": "Please check your email address to complete the registration."
}
```

  </code-block>
</code-group>

## Forgot Password

Allows a register user to request a password reset email.

#### Path

`POST /user/forgot-password`

#### Headers

| Field        | Type   | Description                       |
| :----------- | :----- | :-------------------------------- |
| Content-Type | string | application/x-www-form-urlencoded |

#### Body

| Field | Type   | Description               |
| :---- | :----- | :------------------------ |
| email | string | Email of current account. |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request POST 'https://www.example.com/api/user/forgot-password' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'email=user@mrdemonwolf.github.io' \
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "PENDING_CONFIRMATION",
  "error": "An Email has been sent to demonwolf@demonwolfdev.com with further instructions on how to reset your password. Please check your email account."
}
```

  </code-block>
</code-group>

## Reset Password

Allows a register user to use password reset token to chaneg their password.

#### Path

`POST /user/reset-password`

#### Headers

| Field        | Type   | Description                       |
| :----------- | :----- | :-------------------------------- |
| Content-Type | string | application/x-www-form-urlencoded |

#### Params

| Field       | Type   | Description              |
| :---------- | :----- | :----------------------- |
| reset_token | string | Token to reset password. |

#### Body

| Field           | Type   | Description                              |
| :-------------- | :----- | :--------------------------------------- |
| password        | string | New password of current account.         |
| comfirmPassword | string | Comfirm new password of current account. |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request POST 'https://www.example.com/api/user/reset-password/:reset_token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'password=user@mrdemonwolf.github.io' \
--data-urlencode 'comfirmPassword=user@mrdemonwolf.github.io' \
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "UPDATED",
  "error": "Your passsword has been updated.  Please try logging in with your new password."
}
```

  </code-block>
</code-group>
