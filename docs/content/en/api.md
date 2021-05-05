---
title: Introduction
description: Simple yet advanced NodeJS, MongoDB and Express based uploader.
position: 2
category: API
---

We have language bindings in Shell! You can view code examples in the the bottom of each request page.

## JSON Web Tokens

WolfPal uses JSON web token to allow access to the API. You can retrieve a JWT by logging a user in against our login endpoint.

WolfPal expects for the JSON web token to be included in all API requests - except for the Auth ones - to the server in a header that looks like the following:

Authorization: Bearer jsonwebtoken

```shell
# With shell, you can just pass the correct header with each request
curl "api_endpoint_here" \
  -H "Authorization: Bearer jsonwebtoken"
```

_Make sure to replace `Bearer jsonwebtoken` with your personal access token. And api_endpoint_here with the endpoint your trying to request._

<alert type="info">

You must replace `Bearer jsonwebtoken` with your personal access token.
</alert>
