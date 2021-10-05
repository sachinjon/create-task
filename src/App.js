import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import Thunk from 'redux-thunk';

import authReducer from './components/auth/store/reducer';
import taskReducer from './components/task/store/reducer';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import TaskContainer from './components/task/taskContainer';
const reducer=combineReducers({
  auth:authReducer,
  task:taskReducer
})
const store=createStore(reducer,applyMiddleware(Thunk));
function App() {
  return (
    <Provider store={store}>
    <div className="container">
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/task" component={TaskContainer}/>
          <Route render={()=><h1>Page Not Found</h1>}/>
        </Switch>
    </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
