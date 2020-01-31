import cheerio from 'cheerio';
import { ConfigLogger } from '../config';

const logger = new ConfigLogger('articleParser');

export default async function articleParser(html, link) {
  logger.trace(`Beginning parsing result from url: ${link}`);

  const $ = cheerio.load(html);
  const what = [];
  $('.article > p').each((i, el) => {
    const text = $(el)
      .text()
      .trim();
    if (text.length) {
      what.push(`> ${text}`);
    }
  });
  what.pop();

  return what.join('\n>\n');
}
