/**
 * `APIError` error.
 *
 * References:
 *   - https://docs.easydb.de/en/technical/errors/
 *
 * @constructor
 * @param {string} [code]
 * @param {string} [description]
 * @access public
 */
export default function APIError(code, description) {
  Error.call(this)
  Error.captureStackTrace(this, arguments.callee)
  this.name = "APIError"
  this.realm = "api"
  this.code = code
  this.description = description
  this.status = 400
}

// Inherit from `Error`.
APIError.prototype.__proto__ = Error.prototype
