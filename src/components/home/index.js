import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { complete, setPassed, remove, setFilter, setSort } from '../../modules/manager'
import './home.scss'

function Home(props) {

  useEffect(() => {
    let timer = setTimeout(() => {
      if (!props.tasks || !props.tasks.length) {
        return
      }
      
      props.tasks.forEach(task => {
          //wrap due in new Date() to reformat after JSON serializing into local storage
          let difference = new Date(task.due) - new Date();
          if (difference<=0) props.setPassed(task.id)
        }
      );

      }, 1000);

    //clear on unmount
    return () => {
      clearTimeout(timer)
    }
  });

  return (

  <div class="container">
    <div className="head">
    <Link to="/add" className="toAdd"><i className="fa fa-plus" aria-hidden="true"></i> Add</Link>

    <div className="filters">
    <button onClick={()=>{props.setFilter("all")}} disabled={!props.tasks} className={props.filter === "all" ? 'selected' : null}>All</button>
    <button onClick={()=>{props.setFilter("complete")}} disabled={!props.tasks} className={props.filter === "complete" ? 'selected' : null}>Complete</button>
    <button onClick={()=>{props.setFilter("incomplete")}} disabled={!props.tasks} className={props.filter === "incomplete" ? 'selected' : null}>Incomplete</button>
    </div>

    </div>
    <table className="table">
      <thead>
          <tr>
          <th onClick={() => props.setSort("title")}>Title <i className="fa fa-sort" aria-hidden="true"></i></th>
          <th onClick={() => props.setSort("due")}>Due Date <i className="fa fa-sort" aria-hidden="true"></i></th>
          <th onClick={() => props.setSort("completed")}>Completed <i className="fa fa-sort" aria-hidden="true"></i></th>
          <th onClick={() => props.setSort("status")}>Status <i className="fa fa-sort" aria-hidden="true"></i></th>
          </tr>
      </thead>
      <tbody>

    { props.tasks && props.tasks.length
      ? props.tasks
        .map(function(task){
        return (
        <tr key={task.id} className="task">
          <td onClick={()=> props.toTaskPage(task.id) }>{task.title}</td>
          <td onClick={()=> props.toTaskPage(task.id) }>{new Date(task.due).toLocaleString()}</td>
          <td onClick={()=> props.toTaskPage(task.id) }>{task.completed ? "Yes" : "No" }</td>
          <td onClick={()=> props.toTaskPage(task.id) }>{task.status.toUpperCase()}</td>
          {
            task.completed
            ? <td><button className="completed"><i className="fa fa-check-circle-o" aria-hidden="true"></i> Completed</button></td>
            : <td><button className="complete" onClick={()=> props.complete(task.id)}><i className="fa fa-check" aria-hidden="true"></i> Complete</button></td>
          }

          <td><button className="remove" onClick={()=> props.remove(task.id)}><i className="fa fa-times" aria-hidden="true"></i> Remove</button></td>
        </tr>
            )
        })
      : <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        </tr>
      }

    </tbody>
    </table>

  </div>
  )
}

const getFiltered = (tasks, filterKey) => {
  switch (filterKey) {
    case 'complete':
      return tasks.filter(t => t.completed)
    case 'incomplete':
      return tasks.filter(t => !t.completed)
    case 'all':
    default:
      return tasks
  }
}

const compareBy = (key, order) => {
    if (order === false) {
      return function (a, b) {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
        return 0;
      };
    }
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
}

const getSorted = (tasks, sortKey, ascSortOrder) => {
  if (tasks == null) {
    return tasks
  }
  return tasks.sort(compareBy(sortKey, ascSortOrder))
}


const mapStateToProps = state => {
  const { byId, byHash, filterKey, sortKey, ascSortOrder } = state.manager || {};
  const tasks =
    byId && byId.length
      ? byId
        .map(id => (byHash ? { ...byHash[id], id } : null))
      : null

  if (tasks == null) return {tasks: tasks}
  let filtered = getFiltered(tasks, filterKey)
  let sorted = getSorted(filtered, sortKey, ascSortOrder)
  return { 
    tasks: sorted,
    filter: filterKey
    //order: ascSortOrder //for knowing which arrow to display
   };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      complete,
      setPassed,
      remove,
      setFilter,
      setSort,
      toTaskPage: (id) => push(`/task/${id}`),
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)