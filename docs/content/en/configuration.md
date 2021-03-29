---
title: Configuration
description: Simple yet advanced NodeJS, MongoDB and Express based uploader.
position: 3
category: Getting started
---

All of Share configuration is saved in the .env and the database as well.

View [.env.example](https://github.com/MrDemonWolf/share/blob/master/server/.env.example) file as an example for server.

View [.env.example](https://github.com/MrDemonWolf/share/blob/master/client/.env.example) file as an example for client.

## Server

### Sendgrid API Key

<alert type="danger">

This is required for this project to work. [Sendgrid Help](/sendgrid)

</alert>

```yaml
# Set the API key for sendgrid
# This is used for sending emails for account activation, password resets, and much more.
# This is required.
SENDGRID_API_KEY=sg......
```

### Sendgrid Domain

<alert type="danger">

This is required for this project to work. [Sendgrid Help](/sendgrid)

</alert>

```yaml
# Set the domain sendgrid will send emails from.
# This is the domain emails will be sent from (noreply@yourdomain.com)
EMAIL_DOMAIN=m.example.com
```

### Email From

<alert type="danger">

This is required for this project to work. [Sendgrid Help](/sendgrid)

</alert>

```yaml
# What domain should emails be sent from
EMAIL_FROM='Share'
```

### JWT Secret

```yaml
# Set signing key for JWT (jsonwebtokens)
# Which is used for making sure the API tokens are created from this app it self and
# they can't be modifyed.
JWT_SECRET=example
```

### Database URIs

```yaml
# Set the database connection URI
# This is where all the user data will be stored. (Only MongoDB is supported)
DATABASE_URI=mongodb://localhost:27017/share
```

### Site Title

```yaml
# Set the site title
# This is used for title on pages and also for sending of emails
SITE_TITLE=Share
```

### Website

```yaml
#This is whater the access to the front-end would be.  This is used on the back-end for sending the emails to users.
WEBSITE=http://localhost:3000
```

### Registration

```yaml
# Enable/Disable registration
REGISTRATION=true
```

### NodeJS Env

```yaml
# Set nodejs env.  Make sure to set this to production if your hosing it.   If your helping development then change to development
NODE_ENV=production
```

### IP

```yaml
# Sets the IP that the site/app will run on.
IP=127.0.0.1
```

### Port

```yaml
# Sets the PORT that the site/app will run on.
PORT=8080
```

## Client

### Site Title

```yaml
# Set the site title
# This is used for title on pages and also for sending of emails
SITE_TITLE=Share
```

### Site Description

```yaml
# Set the description of the site for SEO reasons
SITE_DESCRIPTION=Simple yet advanced NodeJS, MongoDB and Express based uploader.
```

### Copyright

```yaml
# Set the footer text
# This is the copuyright name of who is running the site.
COPYRIGHT=Share
```

### Copyright Link

```yaml
# Set the footer text link
# This is the copuyright text URL which it should link to.
COPYRIGHT_LINK=http://localhost:3000
```

### Landing Description

```yaml
LANDING_DESCRIPTION=Simple yet advanced NodeJS, MongoDB and Express based uploader.
```

### Registration

```yaml
# Enable/Disable registration
REGISTRATION=true
```

### NodeJS Env

```yaml
# Set nodejs env.  Make sure to set this to production if your hosing it.   If your helping development then change to development
NODE_ENV=production
```

### IP

```yaml
# Sets the IP that the site/app will run on.
IP=127.0.0.1
```

### Port

```yaml
# Sets the PORT that the site/app will run on.
PORT=3000
```
