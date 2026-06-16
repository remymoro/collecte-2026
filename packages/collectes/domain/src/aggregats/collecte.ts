import { Nom } from '@collecte-2026/shared-kernel';
import type { DomainEvent } from '@collecte-2026/shared-kernel';
import { CollecteId } from '../value-objects/collecte-id';
import { CollecteCréée } from '../events/collecte-creee';
import { CollectePlanifiée } from '../events/collecte-planifiee';

export type StatutCollecte = 'Brouillon' | 'Planifiée' | 'EnCours' | 'Clôturée' | 'Annulée';

export class Collecte {
  private _statut: StatutCollecte;
  private _evenements: DomainEvent[] = [];

  private constructor(
    private readonly _id: CollecteId,
    private readonly _nom: Nom,
    private readonly _dateCollecte: Date,
  ) {
    this._statut = 'Brouillon';
    this._evenements.push(new CollecteCréée());
  }

  static creer(id: CollecteId, nom: Nom, dateCollecte: Date): Collecte {
    return new Collecte(id, nom, dateCollecte);
  }

  get id(): CollecteId {
    return this._id;
  }

  get nom(): Nom {
    return this._nom;
  }

  get dateCollecte(): Date {
    return this._dateCollecte;
  }

  get statut(): StatutCollecte {
    return this._statut;
  }

  prendreEvenements(): DomainEvent[] {
    const events = [...this._evenements];
    this._evenements = [];
    return events;
  }

  planifier(): void {
    if (this._statut !== 'Brouillon') {
      throw new Error('Transition invalide');
    }
    this._statut = 'Planifiée';
    this._evenements.push(new CollectePlanifiée());
  }

  demarrer(): void {
    if (this._statut !== 'Planifiée') {
      throw new Error('Transition invalide');
    }
    this._statut = 'EnCours';
  }

  cloturer(): void {
    if (this._statut !== 'EnCours') {
      throw new Error('Transition invalide');
    }
    this._statut = 'Clôturée';
  }

  annuler(): void {
    if (this._statut === 'Clôturée') {
      throw new Error("Impossible d'annuler une collecte Clôturée");
    }
    if (this._statut === 'Annulée') {
      throw new Error('Transition invalide');
    }
    this._statut = 'Annulée';
  }
}
