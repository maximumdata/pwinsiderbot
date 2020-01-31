import cheerio from 'cheerio';
import { ConfigLogger } from '../config';
import articleRetriever from './articleRetriever';

const logger = new ConfigLogger('articleParser');

export default async function articleParser(link) {
  logger.trace(`Beginning parsing result from url: ${link}`);
  const html = await articleRetriever(link);
  const $ = cheerio.load(html);
  const paragraphs = [];
  $('.article > p').each((i, el) => {
    const text = $(el)
      .text()
      .trim();
    if (text.length) {
      paragraphs.push(`> ${text}`);
    }
  });
  paragraphs.pop();

  return `${paragraphs.join('\n>\n')}
\n---\n
^i ^am ^a ^bot ^that ^posts ^PWInsider ^article ^text ^so ^you ^don't ^have ^to ^deal ^with ^their ^spyware/ads. ^if ^i'm ^broken ^or ^you ^hate ^me, ^reply ^to ^this ^comment.`;
}
