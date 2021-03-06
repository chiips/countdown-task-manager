import { v4 } from 'node-uuid'

export const ADD_REQUESTED = 'manager/ADD_REQUESTED'
export const ADD = 'manager/ADD'
export const REMOVE_REQUESTED = 'manager/REMOVE_REQUESTED'
export const REMOVE = 'manager/REMOVE'
export const COMPLETE_REQUESTED = 'manager/COMPLETE_REQUESTED'
export const COMPLETE = 'manager/COMPLETE'
export const SET_PASSED_REQUESTED = 'manager/SET_PASSED_REQUESTED'
export const SET_PASSED = 'manager/SET_PASSED'
export const SET_FILTER = 'manager/SET_FILTER'
export const SET_SORT = 'manager/SET_SORT'

const initialState = {
  byId: [],
  byHash: {},
  isAdding: false,
  isRemoving: false,
  isCompleting: false,
  isSettingPassed: false,
  filterKey: "all",
  sortKey: "id",
  ascSortOrder: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_REQUESTED:
      return {
        ...state,
        isAdding: true
      }

    case ADD:
      const { id, title, description, due } = action.payload;
      return {
        ...state,
        byId: [...state.byId, id],
        byHash: {
          ...state.byHash,
          [id]: {
            title: title,
            description: description,
            due: due,
            completed: false,
            status: "active"
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
      //check id
      let index = state.byId.indexOf(rId);
      if (index === -1 || (!state.byHash.hasOwnProperty(rId))) {
        
        return {
          ...state,
          byId: [...state.byId],
          byHash: {...state.byHash},
          isRemoving: !state.isRemoving
        }
      }
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

    case COMPLETE_REQUESTED:
        return {
          ...state,
          isCompleting: true
        }

    case COMPLETE:
        let { cId } = action.payload

        let cStatus = "overdue";
        if (state.byHash[cId].status === "active") cStatus="on-time"

        return {
          ...state,
          byId: [...state.byId],
          byHash: {
            ...state.byHash,
            [cId]: {
              ...state.byHash[cId],
              completed: true,
              status: cStatus
            }
          },
          isCompleting: !state.isCompleting
        }

    case SET_PASSED_REQUESTED:
      return {
        ...state,
        isSettingPassed: true
      }
    
    case SET_PASSED:
        let {oId} = action.payload

        if (state.byHash[oId].status === "on-time") return {...state}

        let pStatus = "overdue"

        console.log("hit", state.byHash[oId].title)

        return {
          ...state,
          byId: [...state.byId],
          byHash: {
            ...state.byHash,
            [oId]: {
              ...state.byHash[oId],
              status: pStatus
            }
          },
          isSettingPassed: !state.isSettingPassed
        }

    case SET_FILTER:
      let {filterKey} = action.payload
      return {
        ...state,
        filterKey: filterKey
      }

    case SET_SORT:
        let {sortKey} = action.payload
        let order
        //if same as current sort key then toggle order
        if (state.sortKey === sortKey) {
          order = !state.ascSortOrder
        } else {
          //otherwise reset to asc order
          order = true
        }

        return {
          ...state,
          sortKey: sortKey,
          ascSortOrder: order
        }

    default:
      return state
  }
}

export const add = (title, description, due) => dispatch => Promise.resolve().then(() => {

    dispatch({
      type: ADD_REQUESTED
    })

    return dispatch({
      type: ADD,
      payload: {
        id: v4(),
        title: title,
        description: description,
        due: due
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

export const complete = cId => dispatch => Promise.resolve().then(() => {
  
  dispatch({
    type: COMPLETE_REQUESTED
  })

  return dispatch({
    type: COMPLETE,
    payload: {
      cId: cId
    }
  })
})

export const setPassed = oId => dispatch => Promise.resolve().then(() => {
  
  dispatch({
    type: SET_PASSED_REQUESTED
  })

  return dispatch({
    type: SET_PASSED,
    payload: {
      oId: oId
    }
  })
})

export const setFilter = filterKey => dispatch => Promise.resolve().then(() => {

  return dispatch({
    type: SET_FILTER,
    payload: {
      filterKey: filterKey
    }
  });

});

export const setSort = sortKey => dispatch => Promise.resolve().then(() => {

  return dispatch({
    type: SET_SORT,
    payload: {
      sortKey: sortKey
    }
  });

});