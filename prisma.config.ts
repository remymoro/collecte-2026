import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'packages/collectes/infrastructure/src/prisma/schema.prisma',
  migrations: {
    path: 'packages/collectes/infrastructure/src/prisma/migrations',
  },
  datasource: {
    url: process.env['DATABASE_URL'] ?? '',
  },
});
