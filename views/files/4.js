import express from 'express';

const router = express.Router();

router.get('/', function(req, res, next) {
  // Partager des variables à vos vus en affectant la variables aux locals.
  res.locals.renderingHome = true

  res.render('index');
});

export default router;
