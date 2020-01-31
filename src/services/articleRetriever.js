import axios from 'axios';
import isValidLink from '../utils/isValidLink';
import { ConfigLogger } from '../config';

const logger = new ConfigLogger('articleRetriever');

export default async function articleRetriever(link) {
  if (!isValidLink(link)) {
    throw new Error(`Invalid Link - ${link}`);
  }

  try {
    const { data: result } = await axios.get(link);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
