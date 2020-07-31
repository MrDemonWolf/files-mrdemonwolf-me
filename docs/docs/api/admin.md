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

#### Example

Request

```sh
curl --location --request GET 'https://www.example.com/api/admin/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64'
```

Response

```json
{
  "code": 200,
  "users": [
    {
      "emailVerified": true,
      "twoFactor": false,
      "isBanned": false,
      "isSuspended": false,
      "streamerMode": false,
      "role": "user",
      "isVerified": false,
      "_id": "5f11c79aef4efb1dcb8b1719",
      "username": "user",
      "email": "user@mrdemonwolf.github.io",
      "createdAt": "2020-07-17T15:45:30.270Z",
      "updatedAt": "2020-07-17T19:21:39.204Z",
      "slug": "usermrdemonwolfgithubio",
      "newEmail": "example@mrdemonwolf.github.io"
    },
    {
      "emailVerified": true,
      "twoFactor": false,
      "isBanned": false,
      "isSuspended": false,
      "streamerMode": false,
      "role": "user",
      "isVerified": false,
      "_id": "5f1313d7dfc73f0a71dbd927",
      "username": "adminmrdemonwolfgithubio",
      "email": "admin@mrdemonwolf.github.io",
      "createdAt": "2020-07-18T15:23:03.776Z",
      "updatedAt": "2020-07-18T15:23:03.776Z",
      "slug": "adminmrdemonwolfgithubio"
    },
    {
      "emailVerified": true,
      "twoFactor": false,
      "isBanned": false,
      "isSuspended": false,
      "streamerMode": false,
      "role": "user",
      "isVerified": false,
      "_id": "5f1313f6dfc73f0a71dbd928",
      "username": "ownermrdemonwolfgithubio",
      "email": "owner@mrdemonwolf.github.io",
      "createdAt": "2020-07-18T15:23:34.243Z",
      "updatedAt": "2020-07-18T15:23:34.243Z",
      "slug": "ownermrdemonwolfgithubio"
    },
    {
      "emailVerified": true,
      "twoFactor": false,
      "isBanned": false,
      "isSuspended": false,
      "streamerMode": false,
      "role": "admin",
      "isVerified": false,
      "_id": "5f131400dfc73f0a71dbd929",
      "username": "MrDemonWolf",
      "email": "demonwolf@demonwofdev.com",
      "createdAt": "2020-07-18T15:23:44.956Z",
      "updatedAt": "2020-07-18T15:23:44.956Z",
      "slug": "mrdemonwolf"
    }
  ]
}
```

## List Uploads

Allow a admin to get a list uploads.

#### Path

`/admin/uploads`

#### Method

`GET`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Authorization | string | JWT token.                        |

#### Example

Request

```sh
curl --location --request GET 'https://www.example.com/api/admin/uploads' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64'
```

Response

```json
{
  "code": 200,
  "uploads": [
    {
      "hashes": {
        "md5": "5d4b76e4727d295d1104f681406c2038",
        "sha256": "932d114496a9897acba8bfd1bc80760eeeac36265e61d8764dfe934ce5077d53",
        "sha512": "4585db8f86a27a447aca3abc2842191821ee88f4ee3cb35fdb0cdac4fc035f0097aca150704fa1d6f703f216fe0277708dce2585dddab9e47f6d9c04c75d159e"
      },
      "fileType": "file",
      "storage": "local",
      "tags": [],
      "uploadedAt": "2020-07-18T15:54:03.256Z",
      "_id": "5f131b434d3200322786b460",
      "uploader": "5f131400dfc73f0a71dbd929",
      "name": "mrdemonwolf",
      "fileOriginalName": "mrdemonwolf",
      "fileName": "9u9uMwhlFTgce34Ts4QKjsqS4sgkbIcz",
      "fileExtension": ".png",
      "fileMimeType": "image/png",
      "fileSize": "8679",
      "deleteToken": "IunEb97BE1roanu77xHj9FK3y3Tj9U8c",
      "__v": 0
    },
    {
      "hashes": {
        "md5": "cc35c4e5e26ffd832fb22f4108fd0c9f",
        "sha256": "d86e19ed2246a2101aeaa981919d46b86cc4e4713123f6642353a0cfd8e9e4cc",
        "sha512": "09f8a08cc5fad47b6684a0674c3d2969969242534b7f25ba81f2420e9df65a583b5621abd1e7d60a5aa6b794348ca0be25a33c024e7b2f0127591e4dd652cea5"
      },
      "fileType": "image",
      "storage": "local",
      "tags": [],
      "uploadedAt": "2020-07-18T15:54:03.256Z",
      "_id": "5f131be24d3200322786b462",
      "uploader": "5f131400dfc73f0a71dbd929",
      "name": "logo",
      "fileOriginalName": "logo",
      "fileName": "DE3CnkJMayu24Q1H7N1B1fgA8oU2recH",
      "fileExtension": ".png",
      "fileMimeType": "image/png",
      "fileSize": "15737",
      "deleteToken": "5UCWH2Vw7URmV9o9Q8XnJpmzzyL8IORB",
      "__v": 0
    }
  ]
}
```

## Upload by ID

Allows admin to get upload details by it's ID.

#### Path

`/admin/uploads`

#### Method

`GET`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Authorization | string | JWT token.                        |

#### URL Params

| Field     | Type   | Description          |
| :-------- | :----- | :------------------- |
| upload_id | string | ID of uploaded file. |

#### Example

Request

```sh
curl --location --request GET 'https://www.example.com/api/admin/uploads/:upload_id' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64'
```

Response

```json
{
  "code": 200,
  "upload": {
    "hashes": {
      "md5": "5d4b76e4727d295d1104f681406c2038",
      "sha256": "932d114496a9897acba8bfd1bc80760eeeac36265e61d8764dfe934ce5077d53",
      "sha512": "4585db8f86a27a447aca3abc2842191821ee88f4ee3cb35fdb0cdac4fc035f0097aca150704fa1d6f703f216fe0277708dce2585dddab9e47f6d9c04c75d159e"
    },
    "fileType": "file",
    "storage": "local",
    "tags": [],
    "uploadedAt": "2020-07-18T15:54:03.256Z",
    "_id": "5f131b434d3200322786b460",
    "uploader": "5f131400dfc73f0a71dbd929",
    "name": "mrdemonwolf",
    "fileOriginalName": "mrdemonwolf",
    "fileName": "9u9uMwhlFTgce34Ts4QKjsqS4sgkbIcz",
    "fileExtension": ".png",
    "fileMimeType": "image/png",
    "fileSize": "8679",
    "deleteToken": "IunEb97BE1roanu77xHj9FK3y3Tj9U8c",
    "__v": 0
  }
}
```

## List Links

Allow a admin to get a list shorten links

#### Path

`/admin/links`

#### Method

`GET`

#### Headers

| Field         | Type   | Description                       |
| :------------ | :----- | :-------------------------------- |
| Authorization | string | JWT token.                        |

#### Example

Request

```sh
curl --location --request GET 'https://www.example.com/api/admin/links' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjEwYjBkMjEwZDZhNzBiZTE0OTdkZTEiLCJpc3MiOiJodHRwczovL2ZlZmE0M2RkZDVjYi5uZ3Jvay5pbyIsImlhdCI6MTU5NDkyOTQzNSwiZXhwIjoxNTk0OTMxMjM1fQ.U5pH17a88I0LSSLzlA4N4pnelgbB3P8358rc_3CKh64'
```

Response

```json
{
  "code": 200,
  "links": []
}
```
