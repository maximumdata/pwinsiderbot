class InvalidLinkError extends Error {
  constructor(message, link) {
    super();
    this.message = message;
    this.link = link;
    this.type = 'InvalidLinkError';
  }
}

export { InvalidLinkError };
