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
export function parse(json) {
  if ("string" == typeof json) {
    json = JSON.parse(json)
  }

  let profile = {}
  profile.id = String(json.user._id)
  profile.displayName = json.user.displayname
  profile.username = json.user.login

  return profile
}
