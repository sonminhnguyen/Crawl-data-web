var express = require('express');
var router = express.Router();


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/',async (req, res) => {
  // const url = 'https://genk.vn'
  // const string = 'h4.knswli-title > a'
  // crawlTitleAndLinks(url, string, (error, articles) => {
  //   if(error) {
  //     throw new Error(error)
  //   }

  //   // console.log(articles)
  // })
  res.render('index', {
    title: "crawling app",
    name: "me"
  })
})

module.exports = router;
