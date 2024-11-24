// reducing the number of PrismaClient instances to ensure optimal resource usage, a singleton will guarantee a shared instance
const { PrismaClient } = require('@prisma/client');

let prisma;

if (!prisma) {
  prisma = new PrismaClient();
}

module.exports = prisma;
