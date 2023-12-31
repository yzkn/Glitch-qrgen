// Copyright (c) 2023 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.


const path = require("path");
const QRCode = require('qrcode'); // https://www.npmjs.com/package/qrcode
const fastify = require("fastify")({
  logger: false,
});


fastify.get("/", async (request, reply) => {
  if (request.query.msg) {
    const url = await QRCode.toDataURL(request.query.msg)
    console.log(url)
    return url
  }
});

fastify.get("/svg", async (request, reply) => {
  if (request.query.msg) {
    const svg = await QRCode.toString(request.query.msg, { type: 'svg' })
    reply.type(' image/svg+xml').code(200)
    return svg
  }
});


fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
