import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import {
    remove,
  } from '../../modules/manager'

let now = new Date();
const Taskpage = props => (

      <div>
        {
        props.byId && props.byId.length ? 
        props.byId
        .filter(d => {
            return d === Number(props.match.params.id)
        })
        .map((d, idx) => {
          return (
            <div key={idx}>
                <h2>{props.byHash && props.byHash[d] ? props.byHash[d].title : ''}</h2>
                <p>{props.byHash && props.byHash[d] ? props.byHash[d].description : ''}</p>
                <p>{props.byHash && props.byHash[d] ? props.byHash[d].due.toString() : ''}</p>
                <p>time left: {props.byHash && props.byHash[d] ? (props.byHash[d].due - now.getDate()).toString() : ''}</p>
                <button onClick={()=> props.remove(d).then(()=>props.toHome())}>Remove</button>
            </div>
          )
      }) :
      "This task doesn't exist! How did you get here?"
    }
    </div>
)

const mapStateToProps = ({ manager }) => ({
    byId: manager.byId,
    byHash: manager.byHash,
    isAdding: manager.isAdding,
    isRemoving: manager.isRemoving,
  })

  const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      remove,
      toHome: () => push(`/`)
    },
    dispatch
  )

  export default connect(
      mapStateToProps,
      mapDispatchToProps
      )(Taskpage)