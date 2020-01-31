import axios from 'axios';
import { ConfigLogger } from '../config';

const logger = new ConfigLogger('articleRetriever');

export default async function articleRetriever(link) {
  try {
    const { data: result } = await axios.get(link);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
