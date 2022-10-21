import express from 'express';

const router = express.Router();

router.get('/:page', function(req, res, next) {
  let p = parseInt(req.params.page, 10)
  if (isNaN(p)) {return next()}
  res.render(p.toString());
});

router.get('/', function(req, res, next) {
  res.locals.renderingHome = true
  res.render('index');
});

export default router;
