cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "call-number.CallNumber",
    "file": "plugins/call-number/www/CallNumber.js",
    "pluginId": "call-number",
    "clobbers": [
      "call"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "call-number": "0.0.2",
  "cordova-android-support-gradle-release": "1.4.7",
  "cordova-plugin-whitelist": "1.3.3"
};
// BOTTOM OF METADATA
});