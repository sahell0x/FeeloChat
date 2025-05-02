import fs from 'fs';
import path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  "/",
  "/chat",
  "/profile",
];

console.log('Generating sitemap for the following routes:', routes);

const sitemap = new SitemapStream({ hostname: 'https://feelochat.sahellx.site' });

(async () => {
  try {
    const writeStream =  fs.createWriteStream(path.resolve(__dirname, 'public/sitemap.xml'));

    routes.forEach(route => {
      console.log(`Writing route: ${route}`);  
      sitemap.write({ url: route, changefreq: 'weekly', priority: 0.8 });
    });

    sitemap.end();

    await streamToPromise(sitemap);

    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error writing the sitemap:', error);
  }
})();
