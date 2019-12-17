import React from 'react'
import { Route, Switch} from 'react-router-dom'
import './app.scss';
import Home from '../home'
import AddTask from '../addtask'
import TaskPage from '../taskpage'
import NotFound from '../notfound'

const App = () => (
  <div className="App">
    <header>
      <h2>COUNTDOWN TASK MANAGER</h2>
    </header>
    
    <main className="content">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/add" component={AddTask} />
      <Route path="/task/:id" component={TaskPage} />
      <Route component={NotFound} />
    </Switch>
    </main>
  </div>
)

export default App