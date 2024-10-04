/**
 * `ServerError` error.
 *
 * References:
 *   - https://docs.easydb.de/en/technical/errors/
 *
 * @constructor
 * @param {string} [code]
 * @param {string} [description]
 * @param {string} [uuid]
 * @access public
 */
export default function ServerError(code, description, uuid) {
  Error.call(this)
  Error.captureStackTrace(this, arguments.callee)
  this.name = "ServerError"
  this.realm = "server"
  this.code = code
  this.description = description
  this.uuid = uuid
  this.status = 500
}

// Inherit from `Error`.
ServerError.prototype.__proto__ = Error.prototype
