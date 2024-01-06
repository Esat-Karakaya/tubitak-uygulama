import AppBlockModule from './src/AppBlockModule';
import AppBlockView from './src/AppBlockView';
import { ChangeEventPayload, AppBlockViewProps } from './src/AppBlock.types';

export function hello(): string {
  return AppBlockModule.hello();
}

export async function setValueAsync(value: string) {
  return await AppBlockModule.setValueAsync(value);
}

export { AppBlockView, AppBlockViewProps, ChangeEventPayload };
