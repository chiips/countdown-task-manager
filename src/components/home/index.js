import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  complete,
  remove,
} from '../../modules/manager'
import './home.scss'

const Home = props => (
  <div>
    <h2>Tasks</h2>


    <table className="table">
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Due Date</th>
                    <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    
                {props.byId && props.byId.length ? 
                  props.byId.map(function(d, idx){
                  return (

            <tr key={idx}>
              <td onClick={()=> props.toTaskPage(d) }>{props.byHash[d].title}</td>
              <td onClick={()=> props.toTaskPage(d) }>{props.byHash[d].due.toLocaleString()}</td>
              <td onClick={()=> props.toTaskPage(d) }>{props.byHash[d].completed.toString()}</td>
              <td><button onClick={()=> props.complete(d)}>Complete</button></td>
              <td><button onClick={()=> props.remove(d)}>Remove</button></td>
            </tr>
                )
            })
            :
            <tr>
              <td>No tasks!</td>
              <td>Add a task to get started.</td>
              </tr>}

          </tbody>
        </table>

  </div>
)

const mapStateToProps = ({ manager }) => ({
  byId: manager.byId,
  byHash: manager.byHash,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      complete,
      remove,
      toTaskPage: (id) => push(`/task/${id}`)
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)