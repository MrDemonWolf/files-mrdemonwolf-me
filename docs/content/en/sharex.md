---
title: ShareX
description: Simple yet advanced NodeJS, MongoDB and Express based uploader.
position: 3
category: ''
---

| Field       | Type   | Description                                           |
| :---------- | :----- | :---------------------------------------------------- |
| YOUR_DOMAIN | string | The APPs running domain.                              |
| VERSION     | string | API Version you want to use                           |
| YOUR_TOKEN  | string | Token created from your account. On the /tokens page. |

```json
{
  "Name": "Share",
  "DestinationType": "ImageUploader, FileUploader,TextUploader",
  "RequestMethod": "POST",
  "RequestURL": "https://[YOUR_DOMAIN]/api/[VERSION]upload/",
  "Headers": {
    "Authorization": "Bearer [YOUR_TOKEN]"
  },
  "Body": "MultipartFormData",
  "FileFormName": "file",
  "URL": "$json:file.url$",
  "DeletionURL": "$json:file.delete$"
}
```
