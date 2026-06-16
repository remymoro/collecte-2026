import { describe, it, expect } from 'vitest';
import { CollecteId } from '../value-objects/collecte-id';
import { Nom } from '@collecte-2026/shared-kernel';
import { Collecte } from './collecte';

const unId = () => CollecteId.creer('123e4567-e89b-12d3-a456-426614174000');
const unNom = () => Nom.creer('Collecte Auchan Agen');
const uneDate = () => new Date('2026-12-01');

describe('Collecte', () => {
  describe('création', () => {
    it('crée une collecte avec statut Brouillon', () => {
      const collecte = Collecte.creer(unId(), unNom(), uneDate());
      expect(collecte.statut).toBe('Brouillon');
    });

    it('expose son id', () => {
      const id = unId();
      const collecte = Collecte.creer(id, unNom(), uneDate());
      expect(collecte.id.estEgalA(id)).toBe(true);
    });

    it('expose son nom', () => {
      const collecte = Collecte.creer(unId(), unNom(), uneDate());
      expect(collecte.nom.valeur).toBe('Collecte Auchan Agen');
    });
  });

  describe('événements domaine', () => {
    it('émet CollecteCréée à la création', () => {
      const collecte = Collecte.creer(unId(), unNom(), uneDate());
      const events = collecte.prendreEvenements();
      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('CollecteCréée');
    });

    it('émet CollectePlanifiée lors de planifier()', () => {
      const collecte = Collecte.creer(unId(), unNom(), uneDate());
      collecte.prendreEvenements(); // vide la file
      collecte.planifier();
      const events = collecte.prendreEvenements();
      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('CollectePlanifiée');
    });

    it('prendreEvenements vide la file après lecture', () => {
      const collecte = Collecte.creer(unId(), unNom(), uneDate());
      collecte.prendreEvenements();
      expect(collecte.prendreEvenements()).toHaveLength(0);
    });
  });

  describe('cycle de vie', () => {
    it('passe de Brouillon à Planifiée', () => {
      const collecte = Collecte.creer(unId(), unNom(), uneDate());
      collecte.planifier();
      expect(collecte.statut).toBe('Planifiée');
    });

    it('passe de Planifiée à EnCours', () => {
      const collecte = Collecte.creer(unId(), unNom(), uneDate());
      collecte.planifier();
      collecte.demarrer();
      expect(collecte.statut).toBe('EnCours');
    });

    it('passe de EnCours à Clôturée', () => {
      const collecte = Collecte.creer(unId(), unNom(), uneDate());
      collecte.planifier();
      collecte.demarrer();
      collecte.cloturer();
      expect(collecte.statut).toBe('Clôturée');
    });

    it('peut être annulée depuis Brouillon', () => {
      const collecte = Collecte.creer(unId(), unNom(), uneDate());
      collecte.annuler();
      expect(collecte.statut).toBe('Annulée');
    });

    it('peut être annulée depuis Planifiée', () => {
      const collecte = Collecte.creer(unId(), unNom(), uneDate());
      collecte.planifier();
      collecte.annuler();
      expect(collecte.statut).toBe('Annulée');
    });
  });

  describe('règles métier', () => {
    it('ne peut pas annuler une collecte Clôturée', () => {
      const collecte = Collecte.creer(unId(), unNom(), uneDate());
      collecte.planifier();
      collecte.demarrer();
      collecte.cloturer();
      expect(() => collecte.annuler()).toThrow("Impossible d'annuler une collecte Clôturée");
    });

    it('ne peut pas planifier une collecte déjà Planifiée', () => {
      const collecte = Collecte.creer(unId(), unNom(), uneDate());
      collecte.planifier();
      expect(() => collecte.planifier()).toThrow('Transition invalide');
    });

    it('ne peut pas démarrer depuis Brouillon', () => {
      const collecte = Collecte.creer(unId(), unNom(), uneDate());
      expect(() => collecte.demarrer()).toThrow('Transition invalide');
    });
  });
});
