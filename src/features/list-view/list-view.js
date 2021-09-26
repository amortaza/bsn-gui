import React from 'react';

import { useSelector } from 'react-redux';
import {selectCount} from './slice';

export function Counter() {
  const count = useSelector(selectCount);

  return (
    <div>
        <span>{count}</span>
    </div>
  );
}
