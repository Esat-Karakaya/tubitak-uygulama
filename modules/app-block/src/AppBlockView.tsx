import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { AppBlockViewProps } from './AppBlock.types';

const NativeView: React.ComponentType<AppBlockViewProps> =
  requireNativeViewManager('AppBlock');

export default function AppBlockView(props: AppBlockViewProps) {
  return <NativeView {...props} />;
}
