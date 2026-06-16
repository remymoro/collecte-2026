import { describe, it, expect } from 'vitest';
import { Nom } from './nom';

describe('Nom', () => {
  describe('création valide', () => {
    it('accepte un nom valide', () => {
      const nom = Nom.creer('Dupont');
      expect(nom.valeur).toBe('Dupont');
    });

    it('supprime les espaces superflus', () => {
      const nom = Nom.creer('  Dupont  ');
      expect(nom.valeur).toBe('Dupont');
    });

    it('préserve la casse originale', () => {
      const nom = Nom.creer('dupont');
      expect(nom.valeur).toBe('dupont');
    });
  });

  describe('création invalide', () => {
    it('refuse un nom vide', () => {
      expect(() => Nom.creer('')).toThrow('Nom invalide');
    });

    it('refuse un nom avec que des espaces', () => {
      expect(() => Nom.creer('   ')).toThrow('Nom invalide');
    });

    it('refuse un nom de plus de 100 caractères', () => {
      expect(() => Nom.creer('a'.repeat(101))).toThrow('Nom invalide');
    });
  });

  describe('égalité', () => {
    it('deux noms identiques sont égaux', () => {
      const a = Nom.creer('Dupont');
      const b = Nom.creer('Dupont');
      expect(a.estEgalA(b)).toBe(true);
    });

    it('deux noms différents ne sont pas égaux', () => {
      const a = Nom.creer('Dupont');
      const b = Nom.creer('Martin');
      expect(a.estEgalA(b)).toBe(false);
    });
  });
});
