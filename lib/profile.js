/**
 * Parse profile.
 *
 * References:
 * - https://docs.easydb.de/en/technical/types/user/
 *
 * @param {object|string} json
 * @return {object}
 * @access public
 */
exports.parse = function(json) {
  if ("string" == typeof json) {
    json = JSON.parse(json)
  }

  var profile = {}
  profile.id = String(json.user._id)
  profile.displayName = json.user.displayname
  profile.username = json.user.login

  return profile
}
