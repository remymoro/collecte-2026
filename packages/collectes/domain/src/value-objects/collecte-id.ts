import { EntityId } from '@collecte-2026/shared-kernel';

export class CollecteId extends EntityId {
  private constructor(valeur: string) {
    super(valeur);
  }

  static creer(valeur: string): CollecteId {
    EntityId.validerUuid(valeur, 'CollecteId');
    return new CollecteId(valeur);
  }

  static generer(): CollecteId {
    return new CollecteId(EntityId.nouveauUuid());
  }
}
