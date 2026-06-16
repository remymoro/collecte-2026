import { describe, it, expect } from 'vitest';
import { EntityId } from './entity-id';

class TestId extends EntityId {
  static creer(valeur: string): TestId {
    EntityId.validerUuid(valeur, 'TestId');
    return new TestId(valeur);
  }

  static generer(): TestId {
    return new TestId(EntityId.nouveauUuid());
  }
}

describe('EntityId', () => {
  it('crée un id depuis un uuid valide', () => {
    const id = TestId.creer('123e4567-e89b-12d3-a456-426614174000');
    expect(id.valeur).toBe('123e4567-e89b-12d3-a456-426614174000');
  });

  it('génère un nouvel id unique', () => {
    const a = TestId.generer();
    const b = TestId.generer();
    expect(a.valeur).not.toBe(b.valeur);
  });

  it('refuse un uuid vide', () => {
    expect(() => TestId.creer('')).toThrow('TestId invalide');
  });

  it('refuse un format non uuid', () => {
    expect(() => TestId.creer('pas-un-uuid')).toThrow('TestId invalide');
  });

  it('deux ids identiques sont égaux', () => {
    const a = TestId.creer('123e4567-e89b-12d3-a456-426614174000');
    const b = TestId.creer('123e4567-e89b-12d3-a456-426614174000');
    expect(a.estEgalA(b)).toBe(true);
  });
});
