import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  add,
  addAsync,
  // remove,
  // removeAsync
} from '../../modules/manager'

let input 

const AddTask = props => (
  <div>
    <h1>Add Task</h1>
    
    <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        props.add(input.value)
        input.value = ""
      }}>
        <input ref={node => input = node} />
        <button type="submit">
          Add Task
        </button>
      </form>

    <p>
      <button onClick={props.add}>Add</button>
      <button onClick={props.addAsync} disabled={props.isAdding}>
        Add Async
      </button>
    </p>

    

  </div>
)

const mapStateToProps = ({ manager }) => ({
  tasks: manager.tasks,
  isAdding: manager.isAdding
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      add,
      addAsync,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTask)