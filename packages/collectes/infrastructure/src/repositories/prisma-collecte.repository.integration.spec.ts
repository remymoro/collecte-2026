import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { resolve } from 'path';
import { PrismaCollecteRepository } from './prisma-collecte.repository';
import { Collecte, CollecteId } from '@collecte-2026/collectes-domain';
import { Nom } from '@collecte-2026/shared-kernel';

const WORKSPACE_ROOT = resolve(__dirname, '../../../../..');
const SCHEMA_PATH = resolve(__dirname, '../prisma/schema.prisma');

describe('PrismaCollecteRepository (intégration)', () => {
  let container: StartedPostgreSqlContainer | undefined;
  let prisma: PrismaClient | undefined;
  let pool: Pool | undefined;
  let repository: PrismaCollecteRepository;

  beforeAll(async () => {
    container = await new PostgreSqlContainer('postgres:16-alpine')
      .withDatabase('collecte_test')
      .withUsername('test')
      .withPassword('test')
      .start();

    const url = container.getConnectionUri();
    process.env['DATABASE_URL'] = url;

    const { Pool } = await import('pg');
    const { PrismaPg } = await import('@prisma/adapter-pg');
    pool = new Pool({ connectionString: url });
    const adapter = new PrismaPg(pool);
    prisma = new PrismaClient({ adapter });

    execSync(`pnpm exec prisma db push --schema ${SCHEMA_PATH} `, {
      cwd: WORKSPACE_ROOT,
      env: { ...process.env, DATABASE_URL: url },
    });

    repository = new PrismaCollecteRepository(prisma);
  }, 60000);

  afterAll(async () => {
    if (prisma) await prisma.$disconnect();
    if (pool) await pool.end();
    if (container) await container.stop();
  });
  it('sauvegarde et retrouve une collecte', async () => {
    const id = CollecteId.creer('123e4567-e89b-12d3-a456-426614174000');
    const nom = Nom.creer('Collecte Auchan Agen');
    const date = new Date('2026-12-01');

    const collecte = Collecte.creer(id, nom, date);
    await repository.sauvegarder(collecte);

    const trouvee = await repository.trouverParId(id);

    expect(trouvee).not.toBeNull();
    if (!trouvee) return;
    expect(trouvee.id.valeur).toBe(id.valeur);
    expect(trouvee.nom.valeur).toBe('Collecte Auchan Agen');
    expect(trouvee.statut).toBe('Brouillon');
  });

  it('met à jour une collecte existante', async () => {
    const id = CollecteId.creer('223e4567-e89b-12d3-a456-426614174000');
    const collecte = Collecte.creer(id, Nom.creer('Collecte Leclerc'), new Date('2026-12-01'));

    await repository.sauvegarder(collecte);
    collecte.planifier();
    await repository.sauvegarder(collecte);

    const trouvee = await repository.trouverParId(id);
    if (!trouvee) return;
    expect(trouvee.statut).toBe('Planifiée');
  });
}, 120000);
