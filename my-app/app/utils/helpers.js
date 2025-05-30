const { v4: uuidv4 } = require('uuid');

/**
 * Create a new chat message
 * @param {string} content
 * @param {'user' | 'assistant'} role
 * @returns {{
 *   id: string,
 *   content: string,
 *   role: 'user' | 'assistant',
 *   timestamp: Date
 * }}
 */
const createMessage = (content, role) => {
  return {
    id: uuidv4(),
    content,
    role,
    timestamp: new Date(),
  };
};

/**
 * Format timestamp for display
 * @param {Date} date
 * @returns {string}
 */
const formatTimestamp = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

module.exports = {
  createMessage,
  formatTimestamp,
};
