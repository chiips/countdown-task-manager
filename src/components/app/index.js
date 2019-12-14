import React from 'react'
import { Route, Link, Switch} from 'react-router-dom'
import Home from '../home'
import About from '../about'
import AddTask from '../addtask'
import TaskPage from '../taskpage'
import NotFound from '../notfound'

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      
    </header>
    
    <br></br>
 
    <Link to="/add">Add Task</Link>

    <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/add" component={AddTask} />
      <Route path="/task/:id" component={TaskPage} />
      <Route component={NotFound} />
    </Switch>
    </main>
  </div>
)

export default App