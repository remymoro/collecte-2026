import type { DomainEvent } from '@collecte-2026/shared-kernel';

export class CollectePlanifiée implements DomainEvent {
  readonly type = 'CollectePlanifiée';
  readonly occurredAt = new Date();
}
