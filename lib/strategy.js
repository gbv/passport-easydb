// Load modules.
import passport from "passport-strategy"
import util from "node:util"
import * as Profile from "./profile.js"
import axios from "axios"

/**
 * `Strategy` constructor.
 *
 * The easydb authentication strategy authenticates using the easydb API.
 * See: https://docs.easydb.de/en/technical/api/session/
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` (always null) and service-specific `profile`, and then calls
 * the `cb` (or `done`) callback supplying a `user`, which should be set to `false`
 * if the credentials are not valid. If an exception occured, `err` should be set.
 *
 * Options:
 *   - `url`        the easydb API base URL including trailing slash
 *
 * Examples:
 *
 *     passport.use(new Strategy({
 *         url: "https://easydb5-test.example.com/api/v1/"
 *       },
 *       function(accessToken, refreshToken, profile, cb) {
 *         User.findOrCreate(..., function (err, user) {
 *           cb(err, user);
 *         });
 *       }
 *     ));
 *
 * @constructor
 * @param {object} options
 * @param {function} verify
 * @access public
 */
function Strategy(options, verify) {
  options = options || {}
  passport.Strategy.call(this)
  this.name = "easydb"
  this._verify = verify
  this._url = options.url
  this._passReqToCallback = options.passReqToCallback
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy)

/**
 * Authenticate using supplied username and password.
 *
 * @param {object} req
 * @param {object} options
 * @api protected
 */
Strategy.prototype.authenticate = async function(req, options) {
  options = options || {}
  const url = options.url || this._url
  if (!url) {
    return this.fail({ message: "Missing API URL" }, 400)
  }

  let username = (req.body && req.body.username) || req.query.username
  let password = (req.body && req.body.password) || req.query.password
  if (!username || !password) {
    return this.fail({ message: "Missing credentials" }, 400)
  }

  // Step 1: Start new session
  const session = await axios.get(`${url}session`)
  if (session.status != 200) {
    return this.fail({ message: "Error on /session request: " + session.statusText }, session.status)
  }
  // Result: Session token
  const token = session.data.token

  // Step 2: Authenticate with token and credentials
  let user
  try {
    const authentication = await axios({
      method: "post",
      url: `${url}session/authenticate`,
      params: {
        token,
        login: username,
        password,
      },
    })
    user = authentication.data.user
  } catch(error) {
    if (error.response.data.code == "error.user.login_failed") {
      return this.fail({ message: "Wrong credentials" }, 400)
    }
    // TODO: Catch other errors
  }
  let profile = Profile.parse(user)
  profile._json = user
  let args = this._passReqToCallback ? [req] : []
  args = args.concat([token, null, profile, (error, profile) => {
    this.success(profile)
  }])
  this._verify(...args)
}

// Expose constructor.
export default Strategy
