import express from 'express';

const router = express.Router();

router.get('/:page', function(req, res, next) {
  res.render(parseInt(req.params.page, 10).toString());
});

router.get('/', function(req, res, next) {
  res.render('index');
});

export default router;
