import { Application } from 'express';
import { PrismaClient, Url } from '@prisma/client';
import { generateId } from '../../helpers/generateId';
import express from 'express';

module.exports = (app: Application, prisma: PrismaClient): void => {
  app.get('/api/v1/', async (req, res) => {
    const data = await prisma.url.findMany().then(data => { return data; });
    res.json({
      data,
    });
  });

  app.use('/api/v1/create', express.json());
  app.post('/api/v1/create', async (req, res) => {
    await prisma.url
      .create({
        data: {
          long_url: req.body.long_url,
          tracked: req.body.tracked,
          redirect_id: generateId(),
        },
      })
      .catch((err) => {
        res.json(500);
        throw new Error(err.message);
      })
      .then((data) => {
        res.status(200).json({
          status: 'success',
          data,
        });
      });
  });
};
