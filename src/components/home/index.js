import React, { useEffect } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { complete, setPassed, remove } from '../../modules/manager'
import './home.scss'

function Home(props) {

  useEffect(() => {
    let timer = setTimeout(() => {
      if (props.byId && !props.byId.length) {
        return
      }
      
      //check if date has passed
      props.byId.forEach(id => {
        if (props.byHash && props.byHash[id]) {
          let difference = props.byHash[id].due - new Date();
          if (difference<=0) props.setPassed(id)
        }
      });

    }, 1000);

    //clear on unmount
    return () => {
      clearTimeout(timer)
    }
  });

  if (props.byId && !props.byId.length) {
    return (
      <div>
        <h2>Tasks</h2>
        <p>You have no tasks! Add a task to get started.</p>
      </div>
    )
  }

  return (
  <div>
    <h2>Tasks</h2>

    <table className="table">
      <thead>
          <tr>
          <th>Title</th>
          <th>Due Date</th>
          <th>Completed</th>
          <th>Status</th>
          </tr>
      </thead>
      <tbody>
          
      {
        props.byId.map(function(d, idx){
        return (

        <tr key={idx}>
          <td onClick={()=> props.toTaskPage(d) }>{props.byHash[d].title}</td>
          <td onClick={()=> props.toTaskPage(d) }>{props.byHash[d].due.toLocaleString()}</td>
          <td onClick={()=> props.toTaskPage(d) }>{props.byHash[d].completed.toString()}</td>
          <td onClick={()=> props.toTaskPage(d) }>{props.byHash[d].status}</td>
          <td><button onClick={()=> props.complete(d)}>Complete</button></td>
          <td><button onClick={()=> props.remove(d)}>Remove</button></td>
        </tr>
            )
        })
      }

    </tbody>
    </table>

  </div>
  )
}

const mapStateToProps = ({ manager }) => ({
  byId: manager.byId,
  byHash: manager.byHash,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      complete,
      setPassed,
      remove,
      toTaskPage: (id) => push(`/task/${id}`)
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)