import { describe, it, expect } from 'vitest';
import { CollecteId } from './collecte-id';

describe('CollecteId', () => {
  it('crée un id depuis un uuid valide', () => {
    const id = CollecteId.creer('123e4567-e89b-12d3-a456-426614174000');
    expect(id.valeur).toBe('123e4567-e89b-12d3-a456-426614174000');
  });

  it('génère un nouvel id unique', () => {
    const a = CollecteId.generer();
    const b = CollecteId.generer();
    expect(a.valeur).not.toBe(b.valeur);
  });

  it('refuse un uuid vide', () => {
    expect(() => CollecteId.creer('')).toThrow('CollecteId invalide');
  });

  it('refuse un format non uuid', () => {
    expect(() => CollecteId.creer('pas-un-uuid')).toThrow('CollecteId invalide');
  });

  it('deux ids identiques sont égaux', () => {
    const a = CollecteId.creer('123e4567-e89b-12d3-a456-426614174000');
    const b = CollecteId.creer('123e4567-e89b-12d3-a456-426614174000');
    expect(a.estEgalA(b)).toBe(true);
  });
});
