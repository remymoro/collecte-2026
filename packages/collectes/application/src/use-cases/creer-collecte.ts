import { Nom } from '@collecte-2026/shared-kernel';
import { Collecte, CollecteId, ICollecteRepository } from '@collecte-2026/collectes-domain';

export interface CreerCollecteCommande {
  nom: string;
  dateCollecte: Date;
}

export class CréerCollecteUseCase {
  constructor(private readonly repository: ICollecteRepository) {}

  async executer(commande: CreerCollecteCommande): Promise<Collecte> {
    const id = CollecteId.generer();
    const nom = Nom.creer(commande.nom);
    const collecte = Collecte.creer(id, nom, commande.dateCollecte);

    await this.repository.sauvegarder(collecte);

    return collecte;
  }
}
