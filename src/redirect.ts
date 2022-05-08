import { Application } from 'express';
import { PrismaClient } from '@prisma/client';

module.exports = (app: Application, prisma: PrismaClient) => {
  app.get('/:id', async (req, res) => {
    const url = await prisma.url.findUnique({
      where: {
        redirect_id: req.params.id,
      }
    });

    if (url == null) {
      res.json({
        status: "error",
        message: "The requested URL does not exist."
      }).status(500);
      return;
    }
    let redirectUrl: string = url.long_url;
    // this is a pretty wacky way to check for HTTPS
    // TODO: improve this
    if (redirectUrl.slice(0, 8) != "https://") {
      redirectUrl = 'https://' + redirectUrl
    } 

    res.redirect(redirectUrl);
    await prisma.url.update({
      where: {
        redirect_id: req.params.id 
      },
      data: {
        count: url.count + 1,
      },
    });
  });
}


