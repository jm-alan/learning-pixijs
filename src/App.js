import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import NavBar from './components/NavBar';

export default function App () {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </>
  );
}
