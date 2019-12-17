import React, { useEffect } from 'react'
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

  <div>
    <h2>Tasks</h2>

    <button onClick={()=>{props.setFilter("all")}}>All</button>
    <button onClick={()=>{props.setFilter("completed")}}>Completed</button>
    <button onClick={()=>{props.setFilter("active")}}>Active</button>

    <table className="table">
      <thead>
          <tr>
          <th onClick={() => props.setSort("title")}>Title</th>
          <th onClick={() => props.setSort("due")}>Due Date</th>
          <th onClick={() => props.setSort("completed")}>Completed</th>
          <th onClick={() => props.setSort("status")}>Status</th>
          </tr>
      </thead>
      <tbody>

    { props.tasks && props.tasks.length
      ? props.tasks
        .map(function(task, idx){
        return (
        <tr key={task.id}>
          <td onClick={()=> props.toTaskPage(task.id) }>{task.title}</td>
          <td onClick={()=> props.toTaskPage(task.id) }>{new Date(task.due).toLocaleString()}</td>
          <td onClick={()=> props.toTaskPage(task.id) }>{task.completed.toString()}</td>
          <td onClick={()=> props.toTaskPage(task.id) }>{task.status}</td>
          <td><button onClick={()=> props.complete(task.id)}>Complete</button></td>
          <td><button onClick={()=> props.remove(task.id)}>Remove</button></td>
        </tr>
            )
        })
      : <tr><td></td></tr>
      }

    </tbody>
    </table>

    {props.tasks && props.tasks.length
    ? ""
    : "No tasks!"}

  </div>
  )
}

const getFiltered = (tasks, filterKey) => {
  switch (filterKey) {
    case 'completed':
      return tasks.filter(t => t.completed)
    case 'active':
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

  let filtered = getFiltered(tasks, filterKey)
  let sorted = getSorted(filtered, sortKey, ascSortOrder)
  return { 
    tasks: sorted
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