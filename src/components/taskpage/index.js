import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import {
    remove,
  } from '../../modules/manager'

const Taskpage = props => (
      <div>
        {<h2 key={props.match.params.id}>{props.byHash && props.byHash[props.match.params.id] ? props.byHash[props.match.params.id].title : ''}</h2>}
        {<p>{props.byHash && props.byHash[props.match.params.id] ? props.byHash[props.match.params.id].description : ''}</p>}
        <button onClick={()=> props.remove(props.match.params.id).then(()=>props.toHome())}>Remove</button>
    
    </div>
)

const mapStateToProps = ({ manager }) => ({
    byId: manager.byId,
    byHash: manager.byHash,
    isAdding: manager.isAdding,
    isRemoving: manager.isRemoving
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