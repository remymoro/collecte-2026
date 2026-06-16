export class Telephone {
  private constructor(private readonly _valeur: string) {}

  static creer(valeur: string): Telephone {
    const normalise = valeur.replace(/\s+/g, ' ').trim();

    if (!Telephone.estValide(normalise)) {
      throw new Error('Telephone invalide');
    }

    return new Telephone(normalise);
  }

  private static estValide(valeur: string): boolean {
    if (!valeur) return false;

    // Formats acceptes: 10 chiffres en FR (avec/sans espaces) ou E.164 (+33...)
    const chiffres = valeur.replace(/\D/g, '');
    const formatFr = /^0\d{9}$/.test(chiffres);
    const formatE164 = /^\+\d{8,15}$/.test(valeur.replace(/\s/g, ''));

    return formatFr || formatE164;
  }

  get valeur(): string {
    return this._valeur;
  }

  estEgalA(autre: Telephone): boolean {
    return this._valeur === autre._valeur;
  }
}
