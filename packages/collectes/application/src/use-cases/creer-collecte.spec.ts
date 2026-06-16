import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ICollecteRepository } from '@collecte-2026/collectes-domain';
import { CréerCollecteUseCase } from './creer-collecte';

const mockRepository: ICollecteRepository = {
  sauvegarder: vi.fn(),
  trouverParId: vi.fn(),
};

describe('CréerCollecteUseCase', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('crée et sauvegarde une collecte', async () => {
    const useCase = new CréerCollecteUseCase(mockRepository);

    const commande = {
      nom: 'Collecte Auchan Agen',
      dateCollecte: new Date('2026-12-01'),
    };

    const resultat = await useCase.executer(commande);

    expect(mockRepository.sauvegarder).toHaveBeenCalledOnce();
    expect(resultat.statut).toBe('Brouillon');
    expect(resultat.nom.valeur).toBe('Collecte Auchan Agen');
  });

  it('génère un id unique pour chaque collecte', async () => {
    const useCase = new CréerCollecteUseCase(mockRepository);

    const commande = {
      nom: 'Collecte Leclerc Agen',
      dateCollecte: new Date('2026-12-01'),
    };

    const a = await useCase.executer(commande);
    const b = await useCase.executer(commande);

    expect(a.id.valeur).not.toBe(b.id.valeur);
  });

  it('refuse un nom vide', async () => {
    const useCase = new CréerCollecteUseCase(mockRepository);

    await expect(
      useCase.executer({
        nom: '',
        dateCollecte: new Date('2026-12-01'),
      }),
    ).rejects.toThrow('Nom invalide');
  });
});
