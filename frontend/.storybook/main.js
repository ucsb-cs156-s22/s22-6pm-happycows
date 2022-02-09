const WebpackPluginFailBuildOnWarning = require("./webpack-plugin-fail-build-on-warning");

module.exports = {
  core: {
    builder: 'webpack5',
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  webpackFinal: async (config) => {
    config.plugins.push(new WebpackPluginFailBuildOnWarning());
    return config;
  }
}
