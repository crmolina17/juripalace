var sitemap = require('express-sitemap');
var express = require('express');
var router = express.Router();

/* GET home page. */ 
router.get('/', function (req, res, next) {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.render('index', { title: 'Express' });
});

router.get('/:lang', (req, res) => {
  req.session.ulang = req.params.lang;
  res.redirect('back');
}); 

/*
 * sitemap
*/ 
sitemap({
  sitemap: 'public/sitemap.xml', // path for .XMLtoFile
  robots: 'public/robots.txt', // path for .TXTtoFile
  http: 'https',
  url: 'www.juripalace.com',
  generate: router, // option or function, is the same
  cache: 600000, // 600 sec - cache purge period
  sitemapSubmission: '/sitemap.xml', // path of sitemap into robots
  route: { // specific option for some route
    '/': {
      lastmod: '2019-02-08',
      changefreq: 'always',
      priority: 1.0,
    },
    '/admin': {
      disallow: true, // write this route to robots.txt
    },
    '/nooo': {
      lastmod: '2018-02-08',
      changefreq: 'never',
    }
  },
}).toFile(); // write sitemap.xml and robots.txt


module.exports = router;
