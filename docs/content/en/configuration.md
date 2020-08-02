---
title: Configuration
description: "Simple yet advanced uploader. Built-in tools for content moderation tools for admins, and with integration in mind."
position: 3
category: Getting started
---

## Server

### Database

Set the database connection URI
This is where all the user data will be stored. (Only MongoDB is supported)

```yaml
DATABASE_URI=mongodb://localhost:27017/share
```

### Sendgrid

Set the domain sendgrid will send emails from.
This is the domain emails will be sent from (noreply@example.com)

- First would need to create a account here
- Getting your API key https://sendgrid.com/docs/ui/account-and-settings/api-keys/
- To stop email from going to spam you may want to setup the domain so they know you own the domain your sending from. https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/

```yaml
SENDGRID_EMAIL_DOMAIN=example.com
SENDGRID_API_KEY=example.com
```

## Client

### Site Title

Set the site/app title
This is used for title on html pages and also for sending of emails

```yaml
SITE_TITLE=Share
```

### Site Description

```yaml
# Set the description of the site/app for SEO
SITE_Description=Advanced uploader with web front-end for images,files,and text. Built with ShareX in mind. Licensed under MIT and is free to use.
```
