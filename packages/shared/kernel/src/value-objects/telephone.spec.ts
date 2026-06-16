import { describe, it, expect } from 'vitest';
import { Telephone } from './telephone';

describe('Telephone', () => {
  describe('création valide', () => {
    it('accepte un numéro français à 10 chiffres', () => {
      const telephone = Telephone.creer('0612345678');
      expect(telephone.valeur).toBe('0612345678');
    });

    it('accepte un numéro avec espaces', () => {
      const telephone = Telephone.creer('06 12 34 56 78');
      expect(telephone.valeur).toBe('06 12 34 56 78');
    });

    it('accepte un format international E.164', () => {
      const telephone = Telephone.creer('+33612345678');
      expect(telephone.valeur).toBe('+33612345678');
    });
  });

  describe('création invalide', () => {
    it('refuse une chaîne vide', () => {
      expect(() => Telephone.creer('')).toThrow('Telephone invalide');
    });

    it('refuse un numéro trop court', () => {
      expect(() => Telephone.creer('061234')).toThrow('Telephone invalide');
    });

    it('refuse un format non numérique', () => {
      expect(() => Telephone.creer('ab cd ef gh ij')).toThrow('Telephone invalide');
    });
  });

  describe('égalité', () => {
    it('deux numéros identiques sont égaux', () => {
      const a = Telephone.creer('0612345678');
      const b = Telephone.creer('0612345678');
      expect(a.estEgalA(b)).toBe(true);
    });

    it('deux numéros différents ne sont pas égaux', () => {
      const a = Telephone.creer('0612345678');
      const b = Telephone.creer('0712345678');
      expect(a.estEgalA(b)).toBe(false);
    });
  });
});
