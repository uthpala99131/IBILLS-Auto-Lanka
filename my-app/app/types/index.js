/**
 * @typedef {'user' | 'assistant'} Role
 */

/**
 * @typedef {Object} ChatMessage
 * @property {string} id
 * @property {string} content
 * @property {Role} role
 * @property {Date} timestamp
 */

/**
 * @typedef {Object} ChatState
 * @property {ChatMessage[]} messages
 * @property {boolean} isLoading
 */

/**
 * @typedef {Object} AddMessageAction
 * @property {'ADD_MESSAGE'} type
 * @property {ChatMessage} payload
 */

/**
 * @typedef {Object} SetLoadingAction
 * @property {'SET_LOADING'} type
 * @property {boolean} payload
 */

/**
 * @typedef {AddMessageAction | SetLoadingAction} ChatAction
 */
