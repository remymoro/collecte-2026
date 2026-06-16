import { randomUUID } from 'crypto';

export abstract class EntityId {
  protected constructor(private readonly _valeur: string) {}

  protected static validerUuid(valeur: string, nom: string): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!valeur || !uuidRegex.test(valeur)) {
      throw new Error(`${nom} invalide`);
    }
  }

  protected static nouveauUuid(): string {
    return randomUUID();
  }

  get valeur(): string {
    return this._valeur;
  }

  estEgalA(autre: EntityId): boolean {
    return this._valeur === autre._valeur;
  }
}
