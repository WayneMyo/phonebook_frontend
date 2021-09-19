import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ViewContacts from './Pages/ViewContacts';
import CreateContact from './Pages/CreateContact';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ViewContacts}/>
          <Route path="/create" exact component={CreateContact}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
