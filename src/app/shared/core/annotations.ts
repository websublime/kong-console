import { ADAPTER_PROVIDER, Adapter } from '../adapters';
import { ReflectiveInjector } from '@angular/core';

function dataInjector(): ReflectiveInjector {
  return ReflectiveInjector.resolveAndCreate(
    ADAPTER_PROVIDER
  );
}

export const InjectAdapter = (target: Object, key: string | symbol) => {
  let injector = dataInjector();
  injector.get(Adapter);

  console.log(target, key, injector);
}
