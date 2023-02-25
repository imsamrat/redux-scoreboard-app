//select dom element
//  all-matches lws-addMatch lws-reset
const matchContainer = document.querySelector(".all-matches");
const addMatchBtn = document.querySelector(".lws-addMatch");
const resetBtn = document.querySelector(".lws-reset");

//action identifiers
const INCREMENT = "score/increment";
const DECREMENT = "score/decrement";
const RESET = "score/reset";
const ADD_MATCH = "match/add";
const DELETE_MATCH = "match/delete";

// action creators
const increment = (payload) => {
  return {
    type: INCREMENT, //mendatory
    payload,
  };
};
const decrement = (payload) => {
  return {
    type: DECREMENT,
    payload,
  };
};

const reset = () => {
  return {
    type: RESET,
  };
};
const addMatch = () => {
  return {
    type: ADD_MATCH,
  };
};

const deleteMatch = (matchId) => {
  return { type: DELETE_MATCH, payload: matchId };
};

const initialState = [
  {
    id: 1,
    score: 0,
  },
];

const nextMatchId = (matches) =>{
  const maxId = matches.reduce((maxId, match) =>Math.max(match.id, maxId), -1);
  return maxId + 1;
}


function matchReducer(state=initialState,action){
  if(action.type === INCREMENT){
    const newMatches = state.map((item)=>{
      if(item.id === action.payload.id){
        return{...item, score: item.score + Number(action.payload.value)};
      }else{
        return item;
      }
    })
    return newMatches;
  }
  else if(action.type === DECREMENT){
    const newMatches = state.map((item)=>{
      if(item.id === action.payload.id){
        const newScore = item.score - Number(action.payload.value);
        return{...item, score: newScore > 0 ? newScore : 0 };
      }else{
        return item;
      }
    })
    return newMatches;
  }
  else if (action.type === RESET){
    const refreshedMatches = state.map((item)=>({...item, score:0}));
    return refreshedMatches;
  }
  else if(action.type === ADD_MATCH){
    const id = nextMatchId(state);
    return [...state,{id,score:0}];
  }
  else if(action.type === DELETE_MATCH){
    const newMatches = state.filter((match)=>match.id !== action.payload);
    return newMatches;
  }
  else{
    return state;
  }
}

//create store
const store = Redux.createStore(matchReducer);


const incrementHandler = (id,formEl) =>{
  const input = formEl.querySelector('.incrementInput');
  const value = Number(input.value);
  if(value>0){
    store.dispatch(increment({id,value}));
  }
}

const decrementHandler = (id,formEl) =>{
  const input = formEl.querySelector('.decrementInput');
  const value = Number(input.value);
  if(value>0){
    store.dispatch(decrement({id,value}));
  }
}

const handleMatchDelete = (matchId) =>{
  store.dispatch(deleteMatch(matchId));
}

addMatchBtn.addEventListener('click',()=>{
  store.dispatch(addMatch());
})

resetBtn.addEventListener('click',()=>{
  store.dispatch(reset());
})

const render = () => {
  const state=store.getState();
  const MatchesView = state
  .map((item)=>{
    return `
    <div class="match">
    <div class="wrapper">
    <button class="lws-delete" onclick="handleMatchDelete(${item.id})">
    <img src="./image/delete.svg" alt="" /></button>
    <h3 class="matchName">Match ${item.id}</h3>
    </div>
    <div class="inc-dec">
    <form class="incrementForm" onsubmit="event.preventDefault(); incrementHandler(${item.id},this)">
    <h4>Increment</h4>
    <input type="number" name="increment" class="incrementInput"/>
    </form>
    <form class="decrementForm" onsubmit="event.preventDefault(); decrementHandler(${item.id},this)">
    <h4>Decrement</h4>
    <input type="number" name="decrement" class="decrementInput"/>
    </form>
    </div>
    <div class="numbers">
    <h2 class"singleResult">${item.score}</h2>
    </div>
    </div>`
  })
  .join("");
  matchContainer.innerHTML = MatchesView;
};
render();
store.subscribe(render);

