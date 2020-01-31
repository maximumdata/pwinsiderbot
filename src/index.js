import dotenv from 'dotenv';
import { TEST_URL } from './config';
import articleRetriever from './services/articleRetriever';
import articleParser from './services/articleParser';
import RedditBot from './services/RedditBot';

dotenv.config();

// (async () => {
//   try {
//     const titmouse = await articleRetriever(TEST_URL);
//     const buttfart = await articleParser(titmouse, TEST_URL);
//     console.log(buttfart);
//   } catch (e) {
//     console.log(e);
//   }
// })();

const bot = new RedditBot();
