# Cody Server
Cody Server implementation.

Learn more about Cody in our [prooph board wiki](https://wiki.prooph-board.com/cody/Cody-Server.html)

*Please Note: We assume that you're using TypeScript. If not, please ask in the [chat](https://gitter.im/proophboard/community) for help with a plain JS set up!*

## Installation

```bash
npm i --save-dev @proophboard/cody-server
```

## Initialize Cody

```bash
npx proophboard init
```

This will create a `codyconfig.js` in the project root. Further instructions can be found in the file!

## Start Cody Server

```bash
npx proophboard start
```
By default the server will listen at port `3311`. Start it with a different port like this:

```bash
PORT=3333 npx proophboard start
```

If you're working on Cody hooks it makes sense to let the Cody server restart automatically after hook changes.
Let's assume you save your hooks in a directory called `.codyhooks` (recommended). You can use `nodemon` to watch for file changes
and restart the server:

```bash
npm i --save-dev nodemon
nodemon --watch .codyhooks/** --ext ts,json --exec 'npx proophboard start'
```

## What's next?

If you're new to prooph board and Cody, please check out the [tutorial](https://wiki.prooph-board.com/cody/nodejs-cody-tutorial.html) to get started.
