---
title: Analytics
description: "Simple yet advanced uploader. Built-in tools for content moderation tools for admins, and with integration in mind."
position: 7
category: API
---

## Analytics

Allows a logged in user to get analytics on all goals.

#### Path

`GET /analytics`

#### Headers

| Field        | Type   | Description                       |
| :----------- | :----- | :-------------------------------- |
| Content-Type | string | application/x-www-form-urlencoded |

#### Body

| Field         | Type   | Description       |
| :------------ | :----- | :---------------- |
| Authorization | string | JWT access token. |

#### Example

<code-group>
  <code-block label="Request" active>

```sh
curl --location --request GET 'https://www.example.com/api/analytics' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjRiZmYxMjEwMzdlNDI0YTE3YTNlYmMiLCJpYXQiOjE1OTkyNDE1OTMsImV4cCI6MTU5OTI0MzM5M30.FuLUNEc_lE8jI2KEur0KsQzZFjIh5kymnLdR0Udycxk'
```

  </code-block>
  <code-block label="Response
">

```json
{
  "code": 200,
}
```

  </code-block>
</code-group>
