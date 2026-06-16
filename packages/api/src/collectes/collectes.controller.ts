import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { CréerCollecteUseCase } from '@collecte-2026/collectes-application';

export class CréerCollecteDto {
  nom!: string;
  dateCollecte!: string;
}

@Controller('collectes')
export class CollectesController {
  constructor(private readonly créerCollecte: CréerCollecteUseCase) {}

  @Post()
  @HttpCode(201)
  async créer(@Body() dto: CréerCollecteDto) {
    const collecte = await this.créerCollecte.executer({
      nom: dto.nom,
      dateCollecte: new Date(dto.dateCollecte),
    });

    return {
      id: collecte.id.valeur,
      nom: collecte.nom.valeur,
      statut: collecte.statut,
      dateCollecte: collecte.dateCollecte,
    };
  }
}
