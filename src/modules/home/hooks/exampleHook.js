import { useState, useEffect } from 'react';

export function useExample() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // fetch or calculate data
    setData('example data');
  }, []);

  return data;
}
