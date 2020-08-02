---
title: Introduction
description: "Simple yet advanced uploader. Built-in tools for content moderation tools for admins, and with integration in mind."
position: 4
category: API
---

## Introduction

Welcome to the Share API!

We have language bindings in Shell! You can view code examples in the dark area to the right, and you can switch the programming language of the examples with the tabs in the top right in the future when other language bindings become availabe.

## JSON Web Tokens

Share uses JSON web token to allow access to the API. You can retrieve a JWT by logging a user in against our login endpoint.

Share expects for the JSON web token to be included in all API requests - except for the Auth ones - to the server in a header that looks like the following:

Authorization: Bearer jsonwebtoken

```shell
# With shell, you can just pass the correct header with each request
curl "api_endpoint_here" \
  -H "Authorization: Bearer jsonwebtoken"
```

_Make sure to replace `Bearer jsonwebtoken` with your API key. And api_endpoint_here with the endpoint your trying to request._

::: tip
You must replace <code>Bearer jsonwebtoken</code> with your personal API key. If the route is `/client/` then you will have to use a token generated from your accounts token page.
:::
