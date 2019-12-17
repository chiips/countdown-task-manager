import React from 'react'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {add} from '../../modules/manager'
import DateTimePicker from 'react-datetime-picker';
import './addtask.scss'

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
      <div className="addTask">

        <div className="head">
        <Link to="/" className="back"><i className="fa fa-arrow-left"></i> Back</Link>
        </div>


        <form onSubmit={e => {
        e.preventDefault()
          if (!this.state.title.trim()) {
            return
          }
          if (!this.state.description.trim()) {
            return
          }
          if (!this.state.due) {
            return
          }
          this.props.add(this.state.title, this.state.description, this.state.due)
          .then(()=>this.props.toHome())
          this.setState({ title: ""})
          this.setState({ description: ""})
          this.setState({ due: new Date()})
        }}>
          <label htmlFor="title">Title</label>
          <input id="title" onChange={this.onChangeTitle}/>
          <label htmlFor="description">Description</label>
          <textarea id="description" onChange={this.onChangeDescription}></textarea>

          <label htmlFor="picker">Due Date</label>
          <DateTimePicker
          id="picker"
          className="picker"
          onChange={this.onChangeDue}
          value={this.state.due}
        />

          <button type="submit" disabled={this.props.isAdding} className="add">
            ADD TASK
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