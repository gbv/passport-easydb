/**
 * `UserError` error.
 *
 * References:
 *   - https://docs.easydb.de/en/technical/errors/
 *
 * @constructor
 * @param {string} [code]
 * @param {object} [parameters]
 * @access public
 */
function UserError(code, parameters) {
  Error.call(this)
  Error.captureStackTrace(this, arguments.callee)
  this.name = "UserError"
  this.realm = "user"
  this.code = code
  this.parameters = parameters
  this.status = 400
}

// Inherit from `Error`.
UserError.prototype.__proto__ = Error.prototype

// Expose constructor.
module.exports = UserError
