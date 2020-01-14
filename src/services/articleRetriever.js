import axios from 'axios';
import isValidLink from '../utils/isValidLink';
import logger from '../config';

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
