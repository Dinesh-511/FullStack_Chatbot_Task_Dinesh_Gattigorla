/**
 * Escapes special regex characters in a user search string to prevent ReDoS or regex errors.
 * 
 * @param {string} text - Raw input from search query
 * @returns {string} Safe regex string
 */
const escapeRegex = (text) => {
  if (typeof text !== 'string') return '';
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

module.exports = {
  escapeRegex
};
