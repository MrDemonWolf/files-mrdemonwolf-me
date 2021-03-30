---
title: Configuration
description: Simple yet advanced NodeJS, MongoDB and Express based uploader.
position: 3
category: Getting started
---

All of Share configuration is saved in the .env and the database as well.

View [.env.example](https://github.com/MrDemonWolf/share/blob/master/.env.example) file as an example.

## Site Title

```yaml
# Set the site/app title
# This is used for title on html pages and also for sending of emails
TITLE=Share
```

## Site Description

```yaml
# Set the description of the site/app for SEO
DESC=Advanced uploader with web front-end for images,files,and text. Built with ShareX in mind. Licensed under MIT and is free to use.
```

## Email (First install ONLY)

```yaml
# Set a email to become the first owner/admin.
# This is used to convert the owner to owner role for the first time install.
EMAIL=example@example.com
```

## Footer

```yaml
# Set the footer text
# This is the branding name of who is running the site/app.
FOOTER_TEXT=Share
```

## Footer Link

```yaml
# Set the footer text link
# This is the footer text URL which it should link to.
FOOTER_LINK=Share
```

## Signups

```yaml
# Set if you want other users to be able to signup.
# If you are setting this up just for yourself.  Then keep this false
# But if you want to let anyone signup and use the site/app then set this to true.
# Only supports true or false
SIGNUPS=false
```

## Credit

```yaml
# Choose if you want to support the developer by adding a link back to the github repo.
# Only supports true or false
CREDIT=false
```

## Owner

```yaml
# Set to false to disable the /owner route for setting your self as owner.
# Only supports true or false
OWNER=true
```

## Sendgrid

[Sendgrid Help]({{ site.baseurl }}{% link docs/configuration/sendgrid.md %})

```yaml
# Set the API key for sendgrid
# This is used for sending emails for account activation, password resets, and much more.
# This is required.
SENDGRID_API_KEY=sg......
```

## Sendgrid Domain

[Sendgrid Help]({{ site.baseurl }}{% link docs/configuration/sendgrid.md %})

```yaml
# Set the domain sendgrid will send emails from.
# This is the domain emails will be sent from (noreply@yourdomain.com)
# This is required.
EMAIL_DOMAIN=example.com
```

## Logger

```yaml
# Enable or disable the logger to file.
LOGGER=true
```

## Filecheck

```yaml
# Set rather or not to check all files uploaded if they are on the safe whitelist.
# Files will be checked for images and or text rather or not you disable this.  This is for the gallery
FILE_CHECK=true
```

## Upload limit

```yaml
# Set this to a limit you feel to be the max for all users to upload.
# This is by default to 100M
UPLOAD_LIMIT=100M
```

## Session Secret

```yaml
# Set signing key cookie based sessions.
# This is to ensure the cookies are created from this app.
SESSION_SECRET=HKfUWFCeRdAaIhqHL6aQ6aX1
```

## JWT Secret

```yaml
# Set signing key for JWT (jsonwebtokens)
# Which is used for making sure the API tokens are created from this app it self and
# they can't be modifyed.
JWT_SECRET=HKfUWFCeRdAaIhqHL6aQ6aX1
```

## Database URIs

```yaml
# Set the database connection URI
# This is where all the user data will be stored. (Only MongoDB is supported)
DATABASE_URI=mongodb://localhost:27017/share
```

## Env

```yaml
# Set nodejs env.  Make sure to set this to production if your hosing it.   If your helping development then change to development
NODE_ENV=production
```

## IP

```yaml
# Sets the IP that the site/app will run on.
IP=127.0.0.1
```

## Port

```yaml
# Sets the PORT that the site/app will run on.
PORT=8080
```
