# passport-easydb

[![Build Status](https://travis-ci.com/gbv/passport-easydb.svg?branch=master)](https://travis-ci.com/gbv/passport-easydb)
[![GitHub package version](https://img.shields.io/github/package-json/v/gbv/passport-easydb.svg?label=version)](https://github.com/gbv/passport-easydb)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)
<!-- [![NPM package name](https://img.shields.io/badge/npm-passport--easydb-blue.svg)](https://www.npmjs.com/package/passport-easydb) -->

> easydb authentication strategy for Passport.

This repository contains a [Passport](http://passportjs.org/) strategy for authenticating with [easydb](https://www.programmfabrik.de/easydb/).

This module lets you authenticate using easydb in your Node.js applications.
By plugging into Passport, easydb authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

This module was roughly based on [passport-github](https://github.com/jaredhanson/passport-github).

**Note: This is a very early version of this strategy, without tests or proper error handling. Use on your own risk!**

## Table of Contents

- [Install](#install)
- [Usage](#usage)
  - [Prerequisites](#prerequisites)
  - [Configure Strategy](#configure-strategy)
  - [Authenticate Requests](#authenticate-requests)
- [Test](#test)
- [Maintainers](#maintainers)
- [Publish](#publish)
- [Contribute](#contribute)
- [TODOs](#todos)
- [License](#license)

## Install

```bash
npm install gbv/passport-easydb
```

## Usage

### Prerequisites

You need to have access to an easydb instance.

### Configure Strategy

The only required option is `url` (API URL of your easydb instance with trailing slash).

```js
const Strategy = require('passport-easydb');

passport.use(new Strategy({
    url: "https://easydb5-test.example.com/api/v1/"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ easydbId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

### Authenticate Requests

Use `passport.authenticate()`, specifying the `"easydb"` strategy, to authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/) application:

```js
app.get("/login/easydb", (req, res) => {
  res.render("loginEasydb")
})

app.post("/login/easydb",
  passport.authenticate("easydb", {
    successRedirect: "/account",
    failureRedirect: `/login/easydb`,
    failureFlash: "Could not verify credentials."
  })
)
```

## Test

TODO

## Maintainers

- [@stefandesu](https://github.com/stefandesu)

## Publish

TODO

## Contribute

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## TODOs

- [ ] Provide examples.
- [ ] Add testing.
- [ ] Handle errors.
- [ ] Improve documentation.

## License

MIT © 2019 Verbundzentrale des GBV (VZG)
