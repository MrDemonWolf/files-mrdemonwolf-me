---
title: API
description: Simple yet advanced NodeJS, MongoDB and Express based uploader.
position: 3
category: ''
---

## Upload File

Uploads a file to the server.

#### Headers

| Field         | Type   | Description                                                     |
| :------------ | :----- | :-------------------------------------------------------------- |
| Authorization | string | A token generated from the app tokens paged on a users account. |
| Content-Type  | string | application/x-www-form-urlencoded                               |

#### Body

| Field | Type   | Description                                             |
| :---- | :----- | :------------------------------------------------------ |
| file  | file   | File to upload to the server.                           |
| name  | string | Name of the file uploaded. _This is not required_       |
| tags  | string | string that is formated like this (exmaple, test, test) |

```sh
curl --location --request POST 'https://www.example.com/api/v2/upload' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE3ODgyNTUsImV4cCI6NDczNTM4ODI1NSwiaXNzIjoiU2hhcmUiLCJzdWIiOiI1ZTQwYjZiMmQyMjZlNTQxMmEyN2ZjYWYifQ.mvOQCoLIKhK-D2X4gedBnNGHJa5G8F9WjY4VTAEr4CI' \
--form 'file=@/C:/Users/share/Downloads/example.png' \
--form 'name=google_chrome-example'\
--form 'tags=example, example2, example3'
```

## Create Link

Create a shorted link which will return the og url and the shorted code + link.

#### Headers

| Field         | Type   | Description                                                     |
| :------------ | :----- | :-------------------------------------------------------------- |
| Authorization | string | A token generated from the app tokens paged on a users account. |
| Content-Type  | string | application/x-www-form-urlencoded                               |

#### Body

| Field | Type   | Description                                                 |
| :---- | :----- | :---------------------------------------------------------- |
| url   | string | URL to redirect to/shorted                                  |
| code  | string | Custom code or a random one.                                |
| limit | number | limit of clicks of the link 0/undefined is unlimited click. |
| tags  | number | tags to add to the link                                     |

```sh
curl --location --request POST 'https://www.example.com/api/v2/link' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE3ODgyNTUsImV4cCI6NDczNTM4ODI1NSwiaXNzIjoiU2hhcmUiLCJzdWIiOiI1ZTQwYjZiMmQyMjZlNTQxMmEyN2ZjYWYifQ.mvOQCoLIKhK-D2X4gedBnNGHJa5G8F9WjY4VTAEr4CI' \
--form 'url=https://www.example.com' \
--form 'code=example' \
--form 'limit=69'
```

## Get Link

Get's data about the link via the short code.

#### Query Params

| Field         | Type   | Description                                                     |
| :------------ | :----- | :-------------------------------------------------------------- |
| authorization | string | A token generated from the app tokens paged on a users account. |

#### Params

| Field | Type   | Description     |
| :---- | :----- | :-------------- |
| code  | string | Link Short Code |

```sh
curl --location --request GET 'https://www.example.com/api/v2/link/:code?authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE3ODgyNTUsImV4cCI6NDczNTM4ODI1NSwiaXNzIjoiU2hhcmUiLCJzdWIiOiI1ZTQwYjZiMmQyMjZlNTQxMmEyN2ZjYWYifQ.mvOQCoLIKhK-D2X4gedBnNGHJa5G8F9WjY4VTAEr4CI'
```

## Get all links

Get's data about the link via the short code.

#### Query Params

| Field         | Type   | Description                                                     |
| :------------ | :----- | :-------------------------------------------------------------- |
| authorization | string | A token generated from the app tokens paged on a users account. |

```sh
curl --location --request GET 'https://www.example.com/api/v2/link?authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE3ODgyNTUsImV4cCI6NDczNTM4ODI1NSwiaXNzIjoiU2hhcmUiLCJzdWIiOiI1ZTQwYjZiMmQyMjZlNTQxMmEyN2ZjYWYifQ.mvOQCoLIKhK-D2X4gedBnNGHJa5G8F9WjY4VTAEr4C'
```

## Delete uploaded file or link

Delete a uploaded file with the delete key sent on upload.

#### Query Params

| Field | Type   | Description                                              |
| :---- | :----- | :------------------------------------------------------- |
| key   | string | Delete key linked to a uploaded file                     |
| type  | string | Type of share to delete. Currently supports(link,upload) |

```sh
curl --location --request GET 'https://www.example.com/api/v2/delete?key=&type='
```
