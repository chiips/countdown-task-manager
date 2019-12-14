import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import {
//   remove,
//   removeAsync
// } from '../../modules/manager'

const Home = props => (
  <div>
    <h1>Home</h1>
    <p>Tasks</p>
    {props.byId && props.byId.length ? 
      props.byId.map(function(d, idx){
          return <li key={idx} onClick={()=> props.toTaskPage(d) }>{props.byHash[d].title}</li>
      })
      :
      "No tasks!"}
  

        {/* {props.byHash.map((task) => {
        return <li key={task.id}>{task}</li>;
        })} */}


    {/* <p>
      <button onClick={props.remove}>Remove</button>
      <button onClick={props.removeAsync} disabled={props.isRemoving}>
        Remove Async
      </button>
    </p> */}

  </div>
)

const mapStateToProps = ({ manager }) => ({
  byId: manager.byId,
  byHash: manager.byHash,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // remove,
      // removeAsync,
      toTaskPage: (id) => push(`/task/${id}`)
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)