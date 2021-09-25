import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  const count = useSelector(selectCount);

  return (
    <div>
        <span className={styles.value}>{count}</span>
    </div>
  );
}
