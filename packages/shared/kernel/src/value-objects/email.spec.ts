import { describe, it, expect } from 'vitest';
import { Email } from './email';

describe('Email', () => {
  describe('création valide', () => {
    it('accepte un email valide', () => {
      const email = Email.creer('contact@restosducœur.fr');
      expect(email.valeur).toBe('contact@restosducœur.fr');
    });
    it('refuse un email avec deux @', () => {
      expect(() => Email.creer('a@@b.com')).toThrow('Email invalide');
    });

    it('normalise en minuscules', () => {
      const email = Email.creer('Contact@RESTOSDUCŒUR.FR');
      expect(email.valeur).toBe('contact@restosducœur.fr');
    });
  });

  describe('création invalide', () => {
    it('refuse une chaîne vide', () => {
      expect(() => Email.creer('')).toThrow('Email invalide');
    });

    it('refuse un email sans @', () => {
      expect(() => Email.creer('pasunemail')).toThrow('Email invalide');
    });

    it('refuse un email sans domaine', () => {
      expect(() => Email.creer('sans@')).toThrow('Email invalide');
    });
  });

  describe('égalité', () => {
    it('deux emails identiques sont égaux', () => {
      const a = Email.creer('test@example.com');
      const b = Email.creer('test@example.com');
      expect(a.estEgalA(b)).toBe(true);
    });

    it('deux emails différents ne sont pas égaux', () => {
      const a = Email.creer('a@example.com');
      const b = Email.creer('b@example.com');
      expect(a.estEgalA(b)).toBe(false);
    });
  });
});
