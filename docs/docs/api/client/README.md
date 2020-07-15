---
sidebar: auto
---

# Config

## foo

- Type: `string`
- Default: `/`

## bar

- Type: `string`
- Default: `/`

```sh
curl --location --request POST 'https://www.example.com/api/v1/upload' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE3ODgyNTUsImV4cCI6NDczNTM4ODI1NSwiaXNzIjoiU2hhcmUiLCJzdWIiOiI1ZTQwYjZiMmQyMjZlNTQxMmEyN2ZjYWYifQ.mvOQCoLIKhK-D2X4gedBnNGHJa5G8F9WjY4VTAEr4CI' \
--form 'file=@/C:/Users/share/file.png'
```
