const express = require('express');
const router = express.Router();
const ajax = require('../requester');
const servers = require('../servers');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'coffee-on-me' });
});

router.get('/data', (req, res, next) => {
  const queryProject = Object.assign({ path: '/project/1' }, servers.project);
  const requests = [];

  ajax.getAsyncJSON(queryProject)
    .then((data) => {
      const statusCode = data.statusCode;
      const result = data.result;
      const queryUsers = Object.assign({ path: `/user/${result.user_id}` }, servers.user);
      const queryParts = Object.assign({ path: `/part/${result.parts[0]}` }, servers.part);

      requests.push(ajax.getAsyncJSON(queryUsers));
      requests.push(ajax.getAsyncJSON(queryParts));

      Promise.all(requests).then(values => {      
        console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
        res.statusCode = statusCode;
        res.json(values);
      });
  });
});


module.exports = router;
