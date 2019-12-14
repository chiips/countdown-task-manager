import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  remove,
} from '../../modules/manager'
import './home.scss'

const Home = props => (
  <div>
    <h2>Task List</h2>
    <ol>
    {props.byId && props.byId.length ? 
      props.byId.map(function(d, idx){
          return (
            <div key={idx}>
              <li onClick={()=> props.toTaskPage(d) }>{props.byHash[d].title}</li>
              <button onClick={()=> props.remove(d)}>Remove</button>
            </div>
          )
      })
      :
      "No tasks!"}
    </ol>

  </div>
)

const mapStateToProps = ({ manager }) => ({
  byId: manager.byId,
  byHash: manager.byHash,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      remove,
      toTaskPage: (id) => push(`/task/${id}`)
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)