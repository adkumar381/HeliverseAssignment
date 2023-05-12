import { createStore } from 'redux';

const initialState = {
  teams: []
};

function teamReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TEAM':
      return {
        ...state,
        teams: [...state.teams, action.payload]
      };
    default:
      return state;
  }
}

const store = createStore(teamReducer);

export default store;
