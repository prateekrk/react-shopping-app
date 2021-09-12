import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import Account from '../Account/Account';

const MainPage =({handleLogout})=>{
    return(
        <div className="MainPage">
            <Router>
        <NavBar></NavBar>
        <div className="content">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/account">
            <Account handleLogout={handleLogout}/>
          </Route>
        </Switch>
        </div>
        </Router>
        </div>
    )
}
export default MainPage