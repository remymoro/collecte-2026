export class Adresse {
  private constructor(private readonly _valeur: string) {}

  static creer(valeur: string): Adresse {
    const normalise = valeur.replace(/\s+/g, ' ').trim();

    if (!Adresse.estValide(normalise)) {
      throw new Error('Adresse invalide');
    }

    return new Adresse(normalise);
  }

  private static estValide(valeur: string): boolean {
    if (!valeur) return false;
    if (valeur.length < 5) return false;
    if (valeur.length > 200) return false;

    return true;
  }

  get valeur(): string {
    return this._valeur;
  }

  estEgalA(autre: Adresse): boolean {
    return this._valeur === autre._valeur;
  }
}
