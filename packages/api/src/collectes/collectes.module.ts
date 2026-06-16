import { Module } from '@nestjs/common';
import { CollectesController } from './collectes.controller';
import { InMemoryCollecteRepository } from './in-memory-collecte.repository';
import { CréerCollecteUseCase } from '@collecte-2026/collectes-application';

@Module({
  controllers: [CollectesController],
  providers: [
    InMemoryCollecteRepository,
    {
      provide: CréerCollecteUseCase,
      useFactory: (repo: InMemoryCollecteRepository) => new CréerCollecteUseCase(repo),
      inject: [InMemoryCollecteRepository],
    },
  ],
})
export class CollectesModule {}
