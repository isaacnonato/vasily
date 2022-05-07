import { PrismaClient } from '@prisma/client';
import { Application } from 'express'; 
import express from 'express';

const app: Application = express();
const prisma: PrismaClient = new PrismaClient();

require('./redirect.ts')(app, prisma);
require('./api/routes.ts')(app, prisma);

const port: number = 8000;
app.listen(port, () => {
  console.log(`listening to ${port}`);
});
