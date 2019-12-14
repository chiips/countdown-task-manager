import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  add,
  addAsync,
  // remove,
  // removeAsync
} from '../../modules/manager'

let title
let description

const AddTask = props => (
  <div>
    <h1>Add Task</h1>
    
    <form onSubmit={e => {
        e.preventDefault()
        if (!title.value.trim()) {
          return
        }
        if (!description.value.trim()) {
          return
        }
        props.add(title.value, description.value)
        title.value = ""
        description.value = ""
      }}>
        <input ref={node => title = node} placeholder="Title"/>
        <input ref={node => description = node} placeholder="Description"/>
        <button type="submit">
          Add Task
        </button>
      </form>

    <p>
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