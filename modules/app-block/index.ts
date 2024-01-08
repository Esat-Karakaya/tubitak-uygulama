import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to AppBlock.web.ts
// and on native platforms to AppBlock.ts
import AppBlockModule from './src/AppBlockModule';
import AppBlockView from './src/AppBlockView';
import { ChangeEventPayload, AppBlockViewProps } from './src/AppBlock.types';

// Get the native constant value.
export const PI = AppBlockModule.PI;

export function hello(): string {
  return AppBlockModule.hello();
}

export async function setValueAsync(value: string) {
  return await AppBlockModule.setValueAsync(value);
}

const emitter = new EventEmitter(AppBlockModule ?? NativeModulesProxy.AppBlock);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { AppBlockView, AppBlockViewProps, ChangeEventPayload };
