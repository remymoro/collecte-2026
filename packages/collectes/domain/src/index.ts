// Point d'entrée public du domaine collectes
export { Collecte } from './aggregats/collecte';
export type { StatutCollecte } from './aggregats/collecte';
export { CollecteId } from './value-objects/collecte-id';
export { CollecteCréée } from './events/collecte-creee';
export { CollectePlanifiée } from './events/collecte-planifiee';
export type { ICollecteRepository } from './ports/i-collecte-repository';
