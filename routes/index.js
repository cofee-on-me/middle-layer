const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'coffee-on-me' });
});

router.get('/data', (req, res, next) => {
  res.json({ a: 1 });
});


module.exports = router;
