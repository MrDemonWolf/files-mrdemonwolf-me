---
title: Account
description: "Simple yet advanced uploader. Built-in tools for content moderation tools for admins, and with integration in mind."
position: 6
category: API
---

## Get Account Details

Allows a logged in user to get their account details.

#### Path

`GET /account`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Authorization | string | JWT token.                        |
| Content-Type  | string | application/x-www-form-urlencoded |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request GET 'https://www.example.com/api/account' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64'
```

</code-block>
<code-block label="Response">

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

</code-block>
</code-group>

## Update Account Details

Allows a logged in user to update their account details.

#### Path

`PUT /account/update`

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

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request PUT 'https://www.example.com/api/account/update' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64' \
--data-urlencode 'username=user'
```

</code-block>
<code-block label="Response">

```json
{ "code": 200, "message": "Updated user profile." }
```

</code-block>
</code-group>

## Update Account Email

Allows a logged in user to update their email address with a new one. This does require them to have to verify said new email.

#### Path

`PUT /account/update/email`

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

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request PUT 'https://www.example.com/api/account/update/email' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64' \
--data-urlencode 'newEmail=example@mrdemonwolf.github.io'
```

</code-block>
<code-block label="Response">

```json
{
  "code": 200,
  "message": "A email verificationy has been sent to your new email and needs to be verified.",
  "newEmail": "example@mrdemonwolf.github.io"
}
```

</code-block>
</code-group>

<!-- ## Verify new email

Allows a logged in user to update their account details.

#### Path

`POST/account/update/email`

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

``` -->

## Update Two Factor Status

Allows a logged in user to update their two factor status.

#### Path

`PUT /update/two-factor`

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

##### Enable

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request PUT 'https://www.example.com/api/account/update/two-factor/true' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64'
```

</code-block>
<code-block label="Response">

```json
{
  "code": 200,
  "secret": "IJVEM2K6CZJEQZKO",
  "qrCode": "",
  "message": "You must verify your two factor code before it will be enabled."
}
```

</code-block>
</code-group>

##### Disable

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request PUT 'https://www.example.com/api/account/update/two-factor/false' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64' \
--data-urlencode 'code=171918'
```

</code-block>
<code-block label="Response">

```json
{
  "code": 200,
  "message": "Two factor has been disabled."
}
```

</code-block>
</code-group>

## Verify Two Factor

Allows a logged in user verify two factor before enabling.

#### Path

`POST /update/two-factor`

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

<code-group>
<code-block label="Request" active>

```sh
curl --location --request POST 'https://www.example.com/api/account/update/two-factor' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64' \
--data-urlencode 'code=171918'
```

</code-block>
<code-block label="Response">

```json
{
  "code": 200,
  "message": "Verified.  Two Factor has been enabled."
}
```

</code-block>
</code-group>
