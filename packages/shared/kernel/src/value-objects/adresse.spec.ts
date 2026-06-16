import { describe, it, expect } from 'vitest';
import { Adresse } from './adresse';

describe('Adresse', () => {
  describe('création valide', () => {
    it('accepte une adresse valide', () => {
      const adresse = Adresse.creer('12 rue de la Paix');
      expect(adresse.valeur).toBe('12 rue de la Paix');
    });

    it('normalise les espaces', () => {
      const adresse = Adresse.creer('  12   rue   de   la   Paix  ');
      expect(adresse.valeur).toBe('12 rue de la Paix');
    });
  });

  describe('création invalide', () => {
    it('refuse une chaîne vide', () => {
      expect(() => Adresse.creer('')).toThrow('Adresse invalide');
    });

    it('refuse une adresse trop courte', () => {
      expect(() => Adresse.creer('abcd')).toThrow('Adresse invalide');
    });

    it('refuse une adresse trop longue', () => {
      expect(() => Adresse.creer('a'.repeat(201))).toThrow('Adresse invalide');
    });
  });

  describe('égalité', () => {
    it('deux adresses identiques sont égales', () => {
      const a = Adresse.creer('12 rue de la Paix');
      const b = Adresse.creer('12 rue de la Paix');
      expect(a.estEgalA(b)).toBe(true);
    });

    it('deux adresses différentes ne sont pas égales', () => {
      const a = Adresse.creer('12 rue de la Paix');
      const b = Adresse.creer('8 avenue des Fleurs');
      expect(a.estEgalA(b)).toBe(false);
    });
  });
});
