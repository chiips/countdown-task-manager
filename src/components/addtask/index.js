import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  add,
} from '../../modules/manager'
import DateTimePicker from 'react-datetime-picker';

class AddTask extends React.Component {
  state = {
    title: "",
    description: "",
    due: new Date(Date.now() + (5 * 60 * 1000)) //default 5 minutes from now
  }
 
  onChangeDue = input => this.setState({ due: input })
  onChangeTitle = e => this.setState({ title: e.target.value })
  onChangeDescription = e => this.setState({ description: e.target.value })
 
  render() {
    return (
      <div>
        <DateTimePicker
          onChange={this.onChangeDue}
          value={this.state.due}
        />
        <form onSubmit={e => {
        e.preventDefault()
          if (!this.state.title.trim()) {
            return
          }
          if (!this.state.description.trim()) {
            return
          }
          this.props.add(this.state.title, this.state.description, this.state.due)
          .then(()=>this.props.toHome())
          this.setState({ title: ""})
          this.setState({ description: ""})
          this.setState({ due: new Date()})
        }}>
          <input onChange={this.onChangeTitle} placeholder="Title"/>
          <textarea onChange={this.onChangeDescription} placeholder="Description"></textarea>

          <button type="submit" disabled={this.props.isAdding}>
            Add Task
          </button>
        </form>

      </div>
    );
  }
}

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