import { List } from '@chakra-ui/react';
import { useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { formContext } from './formReducer';
import IngredientsItem from './IngredientsItem';

const IngredientsList = () => {
  const { state, dispatch } = useContext(formContext);
  const ingredients = state.ingredients;

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

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="ingrediensList">
        {(provided) => (
          <List {...provided.droppableProps} ref={provided.innerRef}>
            {ingredients !== 0 &&
              ingredients.map((ingredient, index) => (
                <Draggable
                  key={index.toString()}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <IngredientsItem
                      provided={provided}
                      ingredients={ingredient}
                      handleDelete={() => handleDelete(index)}
                      index={index}
                    />
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default IngredientsList;
