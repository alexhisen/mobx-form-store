module.exports = function (wallaby) {
  return {
    files: [
      'src/**',
      'test/mockServer.js',
    ],

    tests: [
      'test/**/*.spec.js',
    ],

    env: {
      type: 'node',
    },

    testFramework: 'mocha',

    compilers: {
      '**/*.js*': wallaby.compilers.babel(),
    },

    bootstrap() {
      require('mock-local-storage');
    },
  };
};
