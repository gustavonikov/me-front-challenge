/**
 * @typedef {Object} Contact
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} fax
 */

/**
 * @typedef {Object} OrderHeader
 * @property {number} number
 * @property {number} serial
 * @property {string} buyer
 * @property {number} price
 * @property {string} currency
 * @property {string} createdAt
 * @property {string} status
 * @property {Contact} contact
 */

/**
 * @typedef {Object} Document
 * @property {string} type
 * @property {string} value
 */

/**
 * @typedef {Object} Supplier
 * @property {string} code
 * @property {string} name
 * @property {string} readAt
 * @property {string} lastReplyAt
 * @property {Document} document
 * @property {string} address
 * @property {Contact} contact
 */

/**
 * @typedef {Object} Address
 * @property {string} label
 * @property {string} name
 * @property {string|null} code
 * @property {string} address
 * @property {Contact} contact
 */

/**
 * @typedef {Object} Order
 * @property {OrderHeader} header
 * @property {Supplier} supplier
 * @property {Address[]} addresses
 */
