
import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './component/Review/Review';
import Manage from './component/Manage/Manage';
import NoteFound from './component/NotFound/NoteFound';
import ProductDetails from './component/ProductDetails/ProductDetails';
import Shipment from './component/Shipment/Shipment';
import Login from './component/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [userLogged, setUserLogged] = useState({});
  return (
    <UserContext.Provider value ={[userLogged, setUserLogged]}>
      <h2>email:{userLogged.email}</h2>
      <Router>
      <Header> </Header>
        <Switch>
          <Route path="/shop">
          <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/manage">
            <Manage></Manage>
          </PrivateRoute>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
            <NoteFound></NoteFound>
          </Route>
        </Switch>
      </Router>
      
     
    </UserContext.Provider>
  );
}

export default App;
