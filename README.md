# phone_book_server

A Node.js app using Express.JS, TypeScript, MongoDB.

---

## Install

Make sure you have [Node.js](http://nodejs.org/) and the MongoDB installed.


### Configure app

Create .env file from example.env and edit it with your data.

Then create directory for mongoDB:

```sh
mkdir data
cd data
mkdir db
```

## Start MongoDB

For start mongoDB run command:

```sh
npm run mongoDB
```

## Start Server

Starting server in dev mode with nodemon:

```sh
npm start
```
---

Start server in production:

```sh
npm run prod
```
---

Start with pm2:

```sh
npm run pm2
```
---

