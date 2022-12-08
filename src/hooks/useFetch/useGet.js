import { api } from '../../api';
import { useState, useEffect } from 'react';
const useGet = (url) => {
  const [data, setData] = useState([]); //pocatecny stav chceme array
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    api
      .get(url, {
        signal: controller.signal,
      })
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, isLoading, error };
};

export default useGet;
