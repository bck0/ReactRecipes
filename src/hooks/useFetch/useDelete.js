import { useState } from 'react';
import { api } from '../../api';

const useDelete = (url) => {
  const [isLoadingDlt, setIsLoadingDlt] = useState(false);
  const [responseDlt, setResponseDlt] = useState(false);
  const [errorDlt, setErrorDlt] = useState('');

  const deleteData = () => {
    setIsLoadingDlt(true);
    setErrorDlt('');
    api
      .delete(url)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setResponseDlt(true);
        }
      })
      .catch((error) => setErrorDlt(error))
      .finally(() => {
        setIsLoadingDlt(false);
      });
  };

  const onDelete = () => {
    deleteData();
  };

  return { onDelete, responseDlt, isLoadingDlt, errorDlt };
};

export default useDelete;
