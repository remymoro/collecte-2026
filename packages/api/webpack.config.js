const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join, resolve } = require('path');

const workspaceRoot = resolve(__dirname, '../..');

module.exports = (env, argv) => ({
  output: {
    path: join(__dirname, 'dist'),
    clean: true,
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  resolve: {
    alias: {
      '@collecte-2026/shared-kernel': resolve(workspaceRoot, 'packages/shared/kernel/src/index.ts'),
      '@collecte-2026/collectes-domain': resolve(
        workspaceRoot,
        'packages/collectes/domain/src/index.ts',
      ),
      '@collecte-2026/collectes-application': resolve(
        workspaceRoot,
        'packages/collectes/application/src/index.ts',
      ),
      '@collecte-2026/collectes-infrastructure': resolve(
        workspaceRoot,
        'packages/collectes/infrastructure/src/index.ts',
      ),
    },
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: false,
      sourceMap: true,
    }),
  ],
});
