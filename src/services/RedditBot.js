import Snoowrap from 'snoowrap';
import { SubmissionStream } from 'snoostorm';
import articleParser from './articleParser';
import { ConfigLogger } from '../config';

const logger = new ConfigLogger('RedditBot');

export default class RedditBot {
  constructor() {
    this.startTime = Date.now() / 1000;
    this.client = new Snoowrap({
      userAgent: process.env.userAgent,
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
      username: process.env.username,
      password: process.env.password,
    });
    this.startListening();
  }

  isLegitPost(post) {
    return (
      post.created_utc > this.startTime &&
      post.is_self === false &&
      post.url &&
      post.url.includes('pwinsider.com')
    );
  }

  startListening() {
    const posts = new SubmissionStream(this.client, {
      subreddit: 'SquaredCircle',
      limit: 10,
      pollTime: 600000,
    });

    posts.on('item', post => this.handleNewPost(post));
  }

  async handleNewPost(post) {
    if (!this.isLegitPost(post)) return;
    try {
      const articleContents = await articleParser(post.url);
      logger.info(`replying to post ${post.url}`);
      await post.reply(articleContents);
    } catch (error) {
      logger.error(error);
    }
  }
}
