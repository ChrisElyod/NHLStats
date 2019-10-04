var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('https://statsapi.web.nhl.com/api/v1/teams')
    .then(response => {
      console.log(response.data.teams);
      res.status(200).json(response.data.teams);
    });
  
});

module.exports = router;
