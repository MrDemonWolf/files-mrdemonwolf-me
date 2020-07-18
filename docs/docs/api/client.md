# Client

## Upload

Uploads a file to the server.

#### Path

`/api/client/upload`

#### Method

`POST`

#### Headers

| Field         | Type   | Description                                                     |
| :------------ | :----- | :-------------------------------------------------------------- |
| Authorization | string | A token generated from the app tokens paged on a users account. |
| Content-Type  | string | application/x-www-form-urlencoded                               |

#### Body

| Field | Type | Description                   |
| :---- | :--- | :---------------------------- |
| file  | file | File to upload to the server. |

#### Example

Request

```sh
curl --location --request POST 'https://www.example.com/api/v1/upload' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE3ODgyNTUsImV4cCI6NDczNTM4ODI1NSwiaXNzIjoiU2hhcmUiLCJzdWIiOiI1ZTQwYjZiMmQyMjZlNTQxMmEyN2ZjYWYifQ.mvOQCoLIKhK-D2X4gedBnNGHJa5G8F9WjY4VTAEr4CI' \
--form 'file=@/C:/Users/share/file.png'
```

Response

```json
{
  "success": true,
  "message": "File uploaded successfully!",
  "upload": {
    "fileType": "file",
    "storage": "local",
    "tags": [],
    "uploadedAt": "2020-07-18T15:29:59.358Z",
    "_id": "5f1317221ec8ae275af9aff8",
    "uploader": "5f131400dfc73f0a71dbd929",
    "name": "index.html",
    "fileName": "index.html",
    "fileExtension": ".html",
    "fileMimeType": "text/html",
    "fileSize": "8679",
    "hashes": {
      "md5": "5d4b76e4727d295d1104f681406c2038",
      "sha256": "932d114496a9897acba8bfd1bc80760eeeac36265e61d8764dfe934ce5077d53",
      "sha512": "4585db8f86a27a447aca3abc2842191821ee88f4ee3cb35fdb0cdac4fc035f0097aca150704fa1d6f703f216fe0277708dce2585dddab9e47f6d9c04c75d159e"
    },
    "deleteToken": "gcnOPUvr4fNh5KcNUQk8PZjQPG5ifeWl",
    "__v": 0
  },
  "url": "https://www.example.com/u/",
  "deleteUrl": "https://www.example.com/delete/token=gcnOPUvr4fNh5KcNUQk8PZjQPG5ifeWl"
}
```

## Delete

Delete a uploaded file with the delete key sent on upload.

#### Path

`/api/client/delete`

#### Method

`DELETE`

#### Headers

#### Query Params

| Field | Type   | Description                          |
| :---- | :----- | :----------------------------------- |
| key   | string | Delete key linked to a uploaded file |

#### Example

Request

```sh
curl --location --request DELETE 'https://www.example.com/api/v1/delete?key='
```

Response

```json
```
