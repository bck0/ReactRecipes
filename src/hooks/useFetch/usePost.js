import { api } from '../../api';
import { useState } from 'react';
const usePost = (url, state) => {
  const [response, setResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const postData = () => {
    setIsLoading(true);
    setError('');
    api
      .post(url, state)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setResponse(true);
        }
      })
      .catch((error) => setError(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSubmit = () => {
    postData();
  };

  return { onSubmit, response, isLoading, error };
};

export default usePost;
