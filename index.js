console.clear();

// People droping off a form (action creator)

// Redux cycle
// Action creator =>  Action  =>  dispatch  =>  Reducers  => State

const createPolicy = (name,amount) => {
  return {
    // action ( a form in our analogy)}
    type:'CREATE_POLICY',
    payload: {
      name:name,
      amount:amount
    }
}
}

const deletePolicy = (name) => {
  return {
    type:'DELETE_POLICY',
    payload: {
      name:name
    }
  }
}

const createClaim = (name,amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name:name,
      amountOfMoneyToCollect:amountOfMoneyToCollect
    }
  }
}

//Reducers: get the old data modified and sent the updated data back

const claimsHistory = (oldListOfClaims =[],action) => {
  if(action.type === 'CREATE_CLAIM') {
    // we care about this action
    return [...oldListOfClaims, action.payload];
  }
  
  // we do not care about this action
  return oldListOfClaims;
}

const accounting = (bagOfMoney = 100, action) => {
  if(action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  }else if(action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  }
  
  return bagOfMoney;
}

const policies = (listOfPolicies = [], action) => {
  if(action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name]
  }else if(action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter(name=> name !== action.payload.name);
    
  }
  return listOfPolicies;
}


// store

const { createStore, combineReducers} = Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory:claimsHistory,
  policies:policies
});

const store = createStore(ourDepartments);


store.dispatch(createPolicy('rihab', 100));
store.dispatch(createPolicy('vanessa', 120));
store.dispatch(createPolicy('ali', 90));
store.dispatch(createClaim('ali', 40));
store.dispatch(deletePolicy('vanessa'));

console.log(store.getState());

