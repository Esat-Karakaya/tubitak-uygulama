import * as React from 'react';

import { AppBlockViewProps } from './AppBlock.types';

export default function AppBlockView(props: AppBlockViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
