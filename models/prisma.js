// models/prisma.js
const { PrismaClient } = require('@prisma/client');

let prisma;

if (!prisma) {
  prisma = new PrismaClient();
}

module.exports = prisma;
