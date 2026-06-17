import { PrismaClient } from '@prisma/client';
import {
  Collecte,
  CollecteId,
  ICollecteRepository,
  StatutCollecte,
} from '@collecte-2026/collectes-domain';
import { Nom } from '@collecte-2026/shared-kernel';

export class PrismaCollecteRepository implements ICollecteRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async sauvegarder(collecte: Collecte): Promise<void> {
    await this.prisma.collecte.upsert({
      where: { id: collecte.id.valeur },
      create: {
        id: collecte.id.valeur,
        nom: collecte.nom.valeur,
        statut: collecte.statut,
        dateCollecte: collecte.dateCollecte,
      },
      update: {
        nom: collecte.nom.valeur,
        statut: collecte.statut,
        dateCollecte: collecte.dateCollecte,
      },
    });
  }

  async trouverParId(id: CollecteId): Promise<Collecte | null> {
    const data = await this.prisma.collecte.findUnique({
      where: { id: id.valeur },
    });

    if (!data) return null;

    return Collecte.reconstituer(
      CollecteId.creer(data.id),
      Nom.creer(data.nom),
      data.dateCollecte,
      data.statut as StatutCollecte,
    );
  }
}
