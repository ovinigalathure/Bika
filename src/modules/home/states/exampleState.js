import { useState } from 'react';

export function useExampleState() {
  const [state, setState] = useState('initial state');

  function updateState(newState) {
    setState(newState);
  }

  return [state, updateState];
}
