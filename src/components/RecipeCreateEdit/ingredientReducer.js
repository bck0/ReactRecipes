export const INITIAL_STATE_INGREDIENT = {
  name: '',
  amount: '',
  amountUnit: '',
  isGroup: false,
};

export const ingredientReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case 'RESET':
      return action.payload;
    default:
      return state;
  }
};
