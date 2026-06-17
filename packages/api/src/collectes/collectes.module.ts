import { Module } from '@nestjs/common';
import { CollectesController } from './collectes.controller';
import { PrismaCollecteRepository } from '@collecte-2026/collectes-infrastructure';
import { CréerCollecteUseCase } from '@collecte-2026/collectes-application';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CollectesController],
  providers: [
    {
      provide: PrismaCollecteRepository,
      useFactory: (prisma: PrismaService) => new PrismaCollecteRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: CréerCollecteUseCase,
      useFactory: (repo: PrismaCollecteRepository) => new CréerCollecteUseCase(repo),
      inject: [PrismaCollecteRepository],
    },
  ],
})
export class CollectesModule {}
