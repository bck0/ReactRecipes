import { api } from '../../api';
import { useEffect, useState } from 'react';
const usePost = (url, state) => {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const postData = () => {
    setIsLoading(true);
    api
      .post(url, state)
      .then((res) => setResponse(res))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
    console.log('fetch');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  return { onSubmit, response, isLoading, error };
};

export default usePost;
