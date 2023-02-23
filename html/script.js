//select dom element

const counterEl = document.getElementById('counter');
const incrementEl = document.getElementById('increment');
const decrementEl = document.getElementById('decrement');

const containerEl = document.getElementById('container');
const matchEl = document.getElementById('addMatch');


//action identifiers
const INCREMENT = 'increment';
const DECREMENT = 'decrement';


// action creators
const increment = (value) =>{
  return{
    type: INCREMENT, //mendatory
    payload: value,
  }
}
const decrement = (value) =>{
  return{
    type: DECREMENT,
    payload: value,
  }
}


const initialState = {
  value: 0,
};

//create reducer function
function counterReducer(state = initialState, action) {
  if (action.type === INCREMENT) {
    return {
      ...state,
      value: state.value + action.payload,
    };
  } else if (action.type === DECREMENT) {
    return {
      ...state,
      value: state.value - action.payload,
    };
  } else {
    return state;
  }
}

//create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState(); 
  counterEl.innerText = state.value;
}
render();
store.subscribe(render);

//button click listeners
incrementEl.addEventListener("keypress", (e)=>{
  // e.preventDefault();
  store.dispatch(increment(e.target.value));
})


decrementEl.addEventListener("keypress", (e)=>{
  // e.preventDefault();
  store.dispatch(decrement(e.target.value));
})

document.getElementById("addMatch").onclick = function() {
  var container = document.getElementById("container");
  var section = document.getElementById("mainsection");
  container.appendChild(section.cloneNode(true));
}