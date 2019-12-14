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
  // let count = state.count
  switch (action.type) {
    case ADD_REQUESTED:
      return {
        ...state,
        isAdding: true
      }

    case ADD:
      const { id, input } = action.payload;
      return {
        ...state,
        byId: [...state.byId, id],
        byHash: {
          ...state.byHash,
          [id]: {
            value: input,
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
      state.count--
      return {
        ...state,
        byId: state.byId.slice(0, -1),
        // byHash: delete state.byHash[0],
        isRemoving: !state.isRemoving
      }

    default:
      return state
  }
}

export const add = input => {
  return dispatch => {
    dispatch({
      type: ADD_REQUESTED,
    })

    dispatch({
      type: ADD,
      payload: {
        id: nextId++,
        input
      }
    })
  }
}

export const addAsync = () => {
  return dispatch => {
    dispatch({
      type: ADD_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: ADD
      })
    }, 3000)
  }
}

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: REMOVE_REQUESTED
    })

    dispatch({
      type: REMOVE
    })
  }
}

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: REMOVE_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: REMOVE
      })
    }, 3000)
  }
}