import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  add,
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
        .then(()=>props.toHome())
        title.value = ""
        description.value = ""
      }}>
        <input ref={node => title = node} placeholder="Title"/>
        <textarea ref={node => description = node} placeholder="Description"></textarea>
        <button type="submit" disabled={props.isAdding}>
          Add Task
        </button>
      </form>
    

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
      toHome: () => push(`/`)
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTask)