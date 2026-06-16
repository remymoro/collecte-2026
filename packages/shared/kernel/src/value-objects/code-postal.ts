export class CodePostal {
  private constructor(private readonly _valeur: string) {}

  static creer(valeur: string): CodePostal {
    const normalise = valeur.trim();

    if (!CodePostal.estValide(normalise)) {
      throw new Error('Code postal invalide');
    }

    return new CodePostal(normalise);
  }

  private static estValide(valeur: string): boolean {
    // Format FR: 5 chiffres
    return /^\d{5}$/.test(valeur);
  }

  get valeur(): string {
    return this._valeur;
  }

  estEgalA(autre: CodePostal): boolean {
    return this._valeur === autre._valeur;
  }
}
