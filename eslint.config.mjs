import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.nx/**'],
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            // type:app peut tout importer
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: [
                'type:app',
                'type:domain',
                'type:application',
                'type:infrastructure',
                'type:util',
              ],
            },
            // type:application peut importer domain et util
            {
              sourceTag: 'type:application',
              onlyDependOnLibsWithTags: ['type:domain', 'type:util'],
            },
            // type:domain ne peut importer que util
            {
              sourceTag: 'type:domain',
              onlyDependOnLibsWithTags: ['type:util'],
            },
            // type:util n'importe rien d'autre
            {
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags: ['type:util'],
            },
            // isolation des bounded contexts
            {
              sourceTag: 'scope:collectes',
              onlyDependOnLibsWithTags: ['scope:collectes', 'scope:shared'],
            },
            {
              sourceTag: 'scope:benevolat',
              onlyDependOnLibsWithTags: ['scope:benevolat', 'scope:shared'],
            },
            {
              sourceTag: 'scope:api',
              onlyDependOnLibsWithTags: [
                'scope:collectes',
                'scope:benevolat',
                'scope:shared',
                'scope:api',
              ],
            },
            {
              sourceTag: 'scope:web',
              onlyDependOnLibsWithTags: [
                'scope:collectes',
                'scope:benevolat',
                'scope:shared',
                'scope:web',
              ],
            },
          ],
        },
      ],
    },
  },
];
