import { Collecte, CollecteId, ICollecteRepository } from '@collecte-2026/collectes-domain';

export class InMemoryCollecteRepository implements ICollecteRepository {
  private readonly collectes = new Map<string, Collecte>();

  async sauvegarder(collecte: Collecte): Promise<void> {
    this.collectes.set(collecte.id.valeur, collecte);
  }

  async trouverParId(id: CollecteId): Promise<Collecte | null> {
    return this.collectes.get(id.valeur) ?? null;
  }
}
