import { createContext, useContext, useReducer } from 'react';
import { formReducer, INITIAL_STATE } from './formReducer';
import { INITIAL_STATE_INGREDIENT } from './ingredientReducer';

const FormContext = createContext(INITIAL_STATE);

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE_INPUT',
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const addSlug = () => {
    dispatch({ type: 'SET_SLUG' });
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    dispatch({
      type: 'SWITCH_INGREDIETS',
      payload: {
        source: result.source.index,
        destination: result.destination.index,
      },
    });
  };

  const handleDelete = (index) => {
    dispatch({ type: 'DELETE_INGREDIENT', payload: index });
  };

  //pridani ingredience do formReduceru
  const handlePushToList = (stateIngredient, ingredientDispatch) => {
    dispatch({
      type: 'ADD_INGREDIENT',
      payload: stateIngredient,
    });
    //Vrati UseReducer state pro jedenu ingredienci do puvodniho stavu
    ingredientDispatch({ type: 'RESET', payload: INITIAL_STATE_INGREDIENT });
  };

  const handleAddGroup = (groupName, setGroupName) => {
    dispatch({
      type: 'ADD_INGREDIENT',
      payload: { name: groupName, isGroup: true },
    });
    setGroupName('');
  };

  const value = {
    state: state,
    title: state.title,
    directions: state.directions,
    handleChange,
    addSlug,
    handleOnDragEnd,
    handleDelete,
    handlePushToList,
    handleAddGroup,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

const useForm = () => {
  const context = useContext(FormContext);

  if (context === undefined) {
    throw new Error('useForm musi byt pouzit s FormContextem');
  }

  return context;
};

export default useForm;
