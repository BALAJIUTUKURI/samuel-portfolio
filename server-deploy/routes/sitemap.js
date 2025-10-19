const express = require('express');
const router = express.Router();

router.get('/sitemap.xml', (req, res) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://samuelpaul.com/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://samuelpaul.com/#about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://samuelpaul.com/#portfolio</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://samuelpaul.com/#contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

  res.set('Content-Type', 'text/xml');
  res.send(sitemap);
});

router.get('/robots.txt', (req, res) => {
  const robots = `User-agent: *
Allow: /
Sitemap: https://samuelpaul.com/sitemap.xml`;

  res.set('Content-Type', 'text/plain');
  res.send(robots);
});

module.exports = router;