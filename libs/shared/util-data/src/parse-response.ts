import type { MonoTypeOperatorFunction } from 'rxjs';
import { tap } from 'rxjs';

export function parseResponse<T>(rule: unknown): MonoTypeOperatorFunction<T> {
  return tap({
    next: (value: T) => {
      console.log(value);
    },
  });
}
