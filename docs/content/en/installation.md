---
title: Getting started
description: Simple yet advanced NodeJS, MongoDB and Express based uploader.
position: 2
category: Getting started
---

### Download

You can now download the release [here](https://github.com/MrDemonWolf/share/releases/)

You can also fork,clone,download from github for pre release builds and development.

- Clone the repo: `git clone https://github.com/MrDemonWolf/wolfpal.git`
- [Fork, Clone, or Download on GitHub](https://github.com/MrDemonWolf/share)

### Installation

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Then copy the example .env file to .env for `server` and `client` folders.

```bash
$ cp .env.example .env
```

After you are sure Node.js is installed you can go to each folder (`server` and `client`) and run the command below

```bash
$ npm i
```

if your using yarn use this

```bash
$ yarn i
```

### Database

This project requires the use of [MongoDB](https://www.mongodb.com/) for how to install MongoDB you can go [here](https://docs.mongodb.com/manual/installation) depending on your OS it might differ. Make sure you do the community edtion unless you already have paid for the enterprise version. If you don't want to have to do this you can also follow the docker guide [here](/docker) or signup for MongoDB Cloud [here](https://www.mongodb.com/cloud).

### Configuration

- [See configuration options](/configuration)

## Testing

```bash
$ npm test
```
