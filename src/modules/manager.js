export const ADD_REQUESTED = 'manageTasks/ADD_REQUESTED'
export const ADD = 'manageTasks/ADD'
export const REMOVE_REQUESTED = 'manageTasks/REMOVE_REQUESTED'
export const REMOVE = 'manageTasks/REMOVE'

let nextId = 1

const initialState = {
  byId: [],
  byHash: {},
  isAdding: false,
  isRemoving: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_REQUESTED:
      return {
        ...state,
        isAdding: true
      }

    case ADD:
      const { id, title, description } = action.payload;
      return {
        ...state,
        byId: [...state.byId, id],
        byHash: {
          ...state.byHash,
          [id]: {
            title: title,
            description: description,
            completed: false
          }
        },
        isAdding: !state.isAdding
      }

    case REMOVE_REQUESTED:
      return {
        ...state,
        isRemoving: true
      }

    case REMOVE:
      let { rId } = action.payload
      //get index in byId array
      let index = state.byId.indexOf(rId);
      if (index === -1) return {...state.byId}
      //check presence in byHash object
      if (!state.byHash.hasOwnProperty(rId)) return {...state.byHash}
      const { [rId]: _, ...without } = state.byHash;

      return {
        ...state,
        byId: [
          ...state.byId.slice(0, index),
          ...state.byId.slice(index + 1)
        ],
        byHash: without,
        isRemoving: !state.isRemoving
      }

    default:
      return state
  }
}

export const add = (title, description) => dispatch => Promise.resolve().then(() => {

    dispatch({
      type: ADD_REQUESTED
    })

    return dispatch({
      type: ADD,
      payload: {
        id: nextId++,
        title: title,
        description: description
      }
    });

});

export const remove = rId => dispatch => Promise.resolve().then(() => {

  dispatch({
    type: REMOVE_REQUESTED
  })

  return dispatch({
    type: REMOVE,
    payload: {
      rId: rId
    }
  });

});