// .storybook/main.js

const path = require('path');
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-webpack5-compiler-babel"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    // Provide polyfills for Node.js core modules
    config.plugins.push(new NodePolyfillPlugin());

    // Provide global variables
    config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
    );

    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
    };

    // Update resolve.fallback
    config.resolve.fallback = {
      ...config.resolve.fallback,
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      // Add other fallbacks if necessary
    };

    // Include @stricahq/cbors in Babel transpilation
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      include: [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../node_modules/@stricahq/cbors'),
        // Add other modules if necessary
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-runtime',
            '@babel/plugin-transform-modules-commonjs',
          ],
          sourceType: 'unambiguous',
        },
      },
    });

    // Enable WebAssembly support in the experiments section
    config.experiments = {
      ...config.experiments,
      // asyncWebAssembly: true,
      // Uncomment the next line if you need synchronous WebAssembly
      syncWebAssembly: true,
      layers: true,
    };

    // Remove the invalid 'asyncWebAssembly' property from output.environment
    // You can include other valid properties if needed
    config.output.environment = {
      ...config.output.environment,
    };

    return config;
  },
};