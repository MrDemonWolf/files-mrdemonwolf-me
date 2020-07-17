# Client

## Upload

Uploads a file to the server.

#### Path

`/api/client/upload`

#### Headers

| Field         | Type   | Description                                                     |
| :------------ | :----- | :-------------------------------------------------------------- |
| Authorization | string | A token generated from the app tokens paged on a users account. |
| Content-Type  | string | application/x-www-form-urlencoded                               |

#### Body

| Field | Type | Description                   |
| :---- | :--- | :---------------------------- |
| file  | file | File to upload to the server. |

```sh
curl --location --request POST 'https://www.example.com/api/v1/upload' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE3ODgyNTUsImV4cCI6NDczNTM4ODI1NSwiaXNzIjoiU2hhcmUiLCJzdWIiOiI1ZTQwYjZiMmQyMjZlNTQxMmEyN2ZjYWYifQ.mvOQCoLIKhK-D2X4gedBnNGHJa5G8F9WjY4VTAEr4CI' \
--form 'file=@/C:/Users/share/file.png'
```

## Delete

Delete a uploaded file with the delete key sent on upload.

#### Path

`/api/client/delete`

#### Headers

#### Query Params

| Field | Type   | Description                          |
| :---- | :----- | :----------------------------------- |
| key   | string | Delete key linked to a uploaded file |

```sh
curl --location --request GET 'https://www.example.com/api/v1/delete?key='
```
