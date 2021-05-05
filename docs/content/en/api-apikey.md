---
title: API Key
description: Simple yet advanced NodeJS, MongoDB and Express based uploader.
position: 5
category: API
---

## Get APIKeys

Allows a logged in user to get their current api keys.

#### Path

`GET /apikey`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Content-Type  | string | application/x-www-form-urlencoded |
| Authorization | string | JWT access token.                 |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request GET 'https://www.example.com/api/apikey' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjRiZmYxMjEwMzdlNDI0YTE3YTNlYmMiLCJpYXQiOjE1OTkyNDE1OTMsImV4cCI6MTU5OTI0MzM5M30.FuLUNEc_lE8jI2KEur0KsQzZFjIh5kymnLdR0Udycxk'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "apiKeys": [
    {
      "label": "Test 1234",
      "isNever": true,
      "_id": "60902b70b281af121fcda4ce",
      "user": "60745fe7b57e1a058d849550",
      "hash": "07347bb350de895875ddb2b06186075be3dfd97b4ab7720c25170ff36c65a77b62d592e7ed508fdd1f6c8e59a5ed30e3d3a2ce02069ea8338905744f919e89cc",
      "expireAt": "2121-05-03T16:57:20.259Z",
      "createdAt": "2021-05-03T16:57:20.261Z",
      "updatedAt": "2021-05-03T16:57:20.261Z",
      "__v": 0
    },
    {
      "label": "Test 123",
      "isNever": false,
      "_id": "60902b80b281af121fcda4cf",
      "user": "60745fe7b57e1a058d849550",
      "hash": "bd6084557ac2fadc6bbdc3b7cc8b4547d1dd7c93b20c8f60809b1059a3380249f32287d9a48c1fd324a550b6075304f4450a3c30dfdf934342d6e7fab2e5dcbc",
      "expireAt": "2121-05-03T16:57:36.400Z",
      "createdAt": "2021-05-03T16:57:36.402Z",
      "updatedAt": "2021-05-03T16:57:36.402Z",
      "__v": 0
    }
  ],
  "total": 2
}
```

  </code-block>
</code-group>

## Get Single APIKey

Allows a logged in user to get a single a API Key.

#### Path

`GET /apikey/:apikey_id`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Content-Type  | string | application/x-www-form-urlencoded |
| Authorization | string | JWT access token.                 |

#### Params

| Field     | Type   | Description      |
| :-------- | :----- | :--------------- |
| apikey_id | string | ID of the APIKey |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request GET 'https://www.example.com/api/apikey/:apikey_id' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjRiZmYxMjEwMzdlNDI0YTE3YTNlYmMiLCJpYXQiOjE1OTkyNDE1OTMsImV4cCI6MTU5OTI0MzM5M30.FuLUNEc_lE8jI2KEur0KsQzZFjIh5kymnLdR0Udycxk'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "apiKey": {
    "label": "Test 1234",
    "isNever": true,
    "_id": "60902b70b281af121fcda4ce",
    "user": "60745fe7b57e1a058d849550",
    "hash": "07347bb350de895875ddb2b06186075be3dfd97b4ab7720c25170ff36c65a77b62d592e7ed508fdd1f6c8e59a5ed30e3d3a2ce02069ea8338905744f919e89cc",
    "expireAt": "2121-05-03T16:57:20.259Z",
    "createdAt": "2021-05-03T16:57:20.261Z",
    "updatedAt": "2021-05-03T16:57:20.261Z",
    "__v": 0
  }
}
```

  </code-block>
</code-group>

## Create API Key

Allows a logged in user to create a API Key.

#### Path

`POST /apikey`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Content-Type  | string | application/x-www-form-urlencoded |
| Authorization | string | JWT access token.                 |

#### Body

| Field   | Type   | Description                     |
| :------ | :----- | :------------------------------ |
| label   | string | A label for the API Key         |
| expires | string | When should the API Key expire. |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request POST 'https://www.example.com/api/apikey' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjdiMmMwYjMwNmI2NTE4MGQyYjAyZGYiLCJpYXQiOjE2MDE5MDg4NjAsImV4cCI6MTYwMTkwOTE2MH0.5fhqZJH_29mpFneOySnAmOQsZj0nI7Su9-zJ1fNQZuM' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'expires=One Month' \
--data-urlencode 'label=Test 123'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "ADDED",
  "message": "Added new API Key",
  "api_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDc0NWZlN2I1N2UxYTA1OGQ4NDk1NTAiLCJpc3MiOiJTaGFyZSAzcmQtcGFydHkgQVBJIiwiaWF0IjoxNjIwMTcyNjA3LCJleHAiOjE2MjI4NTEwMDd9.jmzHekhajoGP_jZM41hgvxwPYkUjkRD-Hj45pVNLUW4"
}
```

  </code-block>
</code-group>

## Edit API Key

Allows a logged in user to edit a API Key

#### Path

`PATCH /apikey/:apikey_id`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Content-Type  | string | application/x-www-form-urlencoded |
| Authorization | string | JWT access token.                 |

#### Params

| Field     | Type   | Description      |
| :-------- | :----- | :--------------- |
| apikey_id | string | ID of the APIKey |

#### Body

| Field | Type   | Description             |
| :---- | :----- | :---------------------- |
| label | string | A label for the API Key |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request PATCH 'https://www.example.com/api/apikey/:apikey_id' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjdiMmMwYjMwNmI2NTE4MGQyYjAyZGYiLCJpYXQiOjE2MDE5MDg4NjAsImV4cCI6MTYwMTkwOTE2MH0.5fhqZJH_29mpFneOySnAmOQsZj0nI7Su9-zJ1fNQZuM' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'label=Test 123'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "UPDATED",
  "message": "APIKey has been updated"
}
```

  </code-block>
</code-group>

## Delete API Key

Allows a logged in user to delete a API Key

#### Path

`DELETE /apikey/:apikey_id`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Content-Type  | string | application/x-www-form-urlencoded |
| Authorization | string | JWT access token.                 |

#### Params

| Field     | Type   | Description      |
| :-------- | :----- | :--------------- |
| apikey_id | string | ID of the APIKey |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request DELETE 'https://www.example.com/api/apikey/:apikey_id' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjdiMmMwYjMwNmI2NTE4MGQyYjAyZGYiLCJpYXQiOjE2MDE5MDg4NjAsImV4cCI6MTYwMTkwOTE2MH0.5fhqZJH_29mpFneOySnAmOQsZj0nI7Su9-zJ1fNQZuM'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": "REMOVED",
  "message": "APIKey has been removed"
}
```

  </code-block>
</code-group>
