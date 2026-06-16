import { Collecte } from '../aggregats/collecte';
import { CollecteId } from '../value-objects/collecte-id';

export interface ICollecteRepository {
  sauvegarder(collecte: Collecte): Promise<void>;
  trouverParId(id: CollecteId): Promise<Collecte | null>;
}
