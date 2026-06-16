export abstract class EntityId {
  protected constructor(private readonly _valeur: string) {}

  protected static validerUuid(valeur: string, nom: string): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!valeur || !uuidRegex.test(valeur)) {
      throw new Error(`${nom} invalide`);
    }
  }

  protected static nouveauUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.floor(Math.random() * 16);
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  get valeur(): string {
    return this._valeur;
  }

  estEgalA(autre: EntityId): boolean {
    return this._valeur === autre._valeur;
  }
}
