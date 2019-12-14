import React from 'react'
import { connect } from 'react-redux'

const Taskpage = props => (
      <div>
        <h1>Task {props.match.params.id}</h1>
        {<li key={props.match.params.id}>{props.byHash && props.byHash[props.match.params.id] ? props.byHash[props.match.params.id].title : ''}</li>}
        {<li>{props.byHash && props.byHash[props.match.params.id] ? props.byHash[props.match.params.id].description : ''}</li>}
    
    </div>
)

const mapStateToProps = ({ manager }) => ({
    byId: manager.byId,
    byHash: manager.byHash,
    isAdding: manager.isAdding,
    isRemoving: manager.isRemoving
  })

  export default connect(mapStateToProps)(Taskpage)