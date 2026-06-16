import type { DomainEvent } from '@collecte-2026/shared-kernel';

export class CollecteCréée implements DomainEvent {
  readonly type = 'CollecteCréée';
  readonly occurredAt = new Date();
}
