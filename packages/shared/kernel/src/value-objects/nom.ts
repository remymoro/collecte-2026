export class Nom {
  private constructor(private readonly _valeur: string) {}

  static creer(valeur: string): Nom {
    const normalise = valeur.trim();

    if (!Nom.estValide(normalise)) {
      throw new Error('Nom invalide');
    }

    return new Nom(normalise);
  }

  private static estValide(valeur: string): boolean {
    if (!valeur) return false;
    if (valeur.length > 100) return false;

    return true;
  }

  get valeur(): string {
    return this._valeur;
  }

  estEgalA(autre: Nom): boolean {
    return this._valeur === autre._valeur;
  }
}
