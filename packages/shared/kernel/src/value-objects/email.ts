export class Email {
  private constructor(private readonly _valeur: string) {}

  static creer(valeur: string): Email {
    const normalise = valeur.toLowerCase().trim();

    if (!Email.estValide(normalise)) {
      throw new Error('Email invalide');
    }

    return new Email(normalise);
  }

  private static estValide(valeur: string): boolean {
    if (!valeur) return false;

    const parties = valeur.split('@');
    if (parties.length !== 2) return false;

    const [local, domaine] = parties;
    return !!local && !!domaine;
  }

  get valeur(): string {
    return this._valeur;
  }

  estEgalA(autre: Email): boolean {
    return this._valeur === autre._valeur;
  }
}
