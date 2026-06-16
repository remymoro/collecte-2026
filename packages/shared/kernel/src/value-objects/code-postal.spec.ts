import { describe, it, expect } from 'vitest';
import { CodePostal } from './code-postal';

describe('CodePostal', () => {
  describe('création valide', () => {
    it('accepte un code postal français à 5 chiffres', () => {
      const codePostal = CodePostal.creer('75001');
      expect(codePostal.valeur).toBe('75001');
    });

    it('supprime les espaces superflus', () => {
      const codePostal = CodePostal.creer(' 69008 ');
      expect(codePostal.valeur).toBe('69008');
    });
  });

  describe('création invalide', () => {
    it('refuse une chaîne vide', () => {
      expect(() => CodePostal.creer('')).toThrow('Code postal invalide');
    });

    it('refuse moins de 5 chiffres', () => {
      expect(() => CodePostal.creer('7500')).toThrow('Code postal invalide');
    });

    it('refuse plus de 5 chiffres', () => {
      expect(() => CodePostal.creer('750001')).toThrow('Code postal invalide');
    });

    it('refuse les caractères non numériques', () => {
      expect(() => CodePostal.creer('75A01')).toThrow('Code postal invalide');
    });
  });

  describe('égalité', () => {
    it('deux codes postaux identiques sont égaux', () => {
      const a = CodePostal.creer('75001');
      const b = CodePostal.creer('75001');
      expect(a.estEgalA(b)).toBe(true);
    });

    it('deux codes postaux différents ne sont pas égaux', () => {
      const a = CodePostal.creer('75001');
      const b = CodePostal.creer('69008');
      expect(a.estEgalA(b)).toBe(false);
    });
  });
});
