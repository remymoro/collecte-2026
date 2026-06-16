import { EntityId } from '@collecte-2026/shared-kernel';

export class CollecteId extends EntityId {
  static creer(valeur: string): CollecteId {
    EntityId.validerUuid(valeur, 'CollecteId');
    return new CollecteId(valeur);
  }

  static generer(): CollecteId {
    return new CollecteId(EntityId.nouveauUuid());
  }
}
