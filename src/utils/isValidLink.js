export default function isValidLink(link) {
  return typeof link === 'string' && link.includes('pwinsider.com');
}
