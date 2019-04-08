const sassBuildConfig = require('./_config/webpack.sass.config');
const jsBuildConfig = require('./_config/webpack.javascript.config');
const stageBuildConfig = require('./_config/webpack.three.config');

module.exports = [sassBuildConfig, jsBuildConfig, stageBuildConfig];
