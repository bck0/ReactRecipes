import { FormControl, Input, List, ListItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useGet from '../../hooks/useFetch/useGet';

const InputSearch = ({ value, name, placeholder, url, dispatch }) => {
  const { data: suggestions, isLoading, error } = useGet(url);

  const handleSetToFormReducer = (newValue) => {
    dispatch({
      type: 'CHANGE_INPUT',
      payload: { name: name, value: newValue },
    });
  };

  const [querry, setQuerry] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(querry.toLowerCase()),
  );

  const handleInputChange = (e) => {
    setQuerry(e.target.value);
    setShowSuggestions(true);
  };

  const handleClickSuggestion = (suggestion) => {
    setQuerry(suggestion);
    setShowSuggestions(false);
  };

  const handleInputBlur = () => {
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    if (querry !== '') {
      setShowSuggestions(true);
    }
  };

  useEffect(() => {
    handleSetToFormReducer(querry);
    if (showSuggestions === false) {
      return;
    }

    if (querry) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [querry]);

  useEffect(() => {
    if (value) {
      setQuerry(value);
    } else {
      setQuerry('');
    }
  }, [value]);

  return (
    <FormControl>
      <Input
        value={isLoading ? 'Data se nacitaji' : querry}
        disabled={isLoading}
        name={name}
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        autoComplete="off"
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
      ></Input>
      {showSuggestions && (
        <List
          maxHeight="150px"
          overflowY="auto"
          position="absolute"
          zIndex="10"
          maxW="20vh"
          boxShadow="base"
          rounded="md"
          bg="white"
          ml={1}
        >
          {suggestions.lenght !== 0 &&
            filteredSuggestions.map((suggestion) => (
              <ListItem
                borderTop="1px"
                borderTopColor="lightgrey"
                pt={2}
                pl={3}
                _hover={{ bg: '#ebedf0' }}
                cursor="pointer"
                key={suggestion}
                onMouseDown={() => handleClickSuggestion(suggestion)}
              >
                {suggestion}
              </ListItem>
            ))}
        </List>
      )}
    </FormControl>
  );
};

export default InputSearch;
