import { createContext } from 'react';
import slug from 'slug';

export const INITIAL_STATE = {
  title: '',
  preparationTime: 0,
  servingCount: 1,
  sideDish: '',
  directions: '',
  ingredients: [],
  slug: '',
  lastModifiedDate: '',
  __v: 0,
};

export const formContext = createContext();

export const formReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case 'ADD_INGREDIENT':
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case 'DELETE_INGREDIENT':
      const arr = Array.from(state.ingredients);
      arr.splice(action.payload, 1);
      console.log(action.payload);
      return {
        ...state,
        ingredients: arr,
      };
    case 'SWITCH_INGREDIETS':
      const items = Array.from(state.ingredients);
      const [reorderedItem] = items.splice(action.payload.source, 1);
      items.splice(action.payload.destination, 0, reorderedItem);
      return {
        ...state,
        ingredients: items,
      };
    case 'SET_DATE':
      return {
        ...state,
        lastModifiedDate: new Date(),
      };
    case 'SET_SLUG':
      return {
        ...state,
        slug: slug(state.title, '-'),
      };
    case 'UPDATE_INIT_DATA':
      return action.payload;

    default:
      return state;
  }
};
