import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { complete, setPassed, remove } from '../../modules/manager'
import './taskpage.scss'

function Taskpage(props) {

  let id = props.match.params.id

  //wrap due in new Date() to reformat after JSON serializing into local storage
  let due = props.byHash && props.byHash[id] ? new Date(props.byHash[id].due) : new Date();

  const calculateTimeLeft = (due) => {
    const difference = due - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(due));

  useEffect(() => {
    let timer = setTimeout(() => {
      if (!timerComponents.length) {
        props.setPassed(id)
        return
      }
      setTimeLeft(calculateTimeLeft(due));
    }, 1000);

    //clear on unmount
    return () => {
      clearTimeout(timer)
    }
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
      <div className="taskpage">

        <div className="head">
        <Link to="/" className="back"><i className="fa fa-arrow-left"></i> Back</Link>
        </div>

        <div className="card">
        {
        props.byId && props.byId.length ? 
        props.byId
        .filter(d => {
            return d === id
        })
        .map((d, idx) => {
          return (
            <div key={idx}>
                <h2>{props.byHash && props.byHash[d] ? props.byHash[d].title : ''}</h2>
                <p className="description">{props.byHash && props.byHash[d] ? props.byHash[d].description : ''}</p>
                <p>Due: {props.byHash && props.byHash[d] ? new Date(props.byHash[d].due).toLocaleString() : ''}</p>
                <p>Completed: {props.byHash && props.byHash[d] && props.byHash[d].completed? "Yes" : "No"}</p>
                <p>Status: { props.byHash && props.byHash[d] ? props.byHash[d].status.toUpperCase() : '' }</p>

                {
                  props.byHash && props.byHash[d] && props.byHash[d].completed
                  ? <button className="completed"><i className="fa fa-check-circle-o" aria-hidden="true"></i> Completed</button>
                  : <button className="complete" onClick={()=> props.complete(d)}><i className="fa fa-check" aria-hidden="true"></i> Complete</button>
                }

                <button className="remove" onClick={()=> props.remove(d).then(()=>props.toHome())} ><i className="fa fa-times" aria-hidden="true"></i> Remove</button>
                <br></br>
                <div>Time Left:</div>
                <div className="count">
                {timerComponents.length ? timerComponents : <span>Time's up!</span>}
                </div>
            </div>
          )
      }) :
      props.toHome()
    }
    </div>
    </div>
  )
}

const mapStateToProps = ({ manager }) => ({
    byId: manager.byId,
    byHash: manager.byHash,
    isAdding: manager.isAdding,
    isRemoving: manager.isRemoving,
  })

  const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      complete,
      setPassed,
      remove,
      toHome: () => push(`/`)
    },
    dispatch
  )

  export default connect(
      mapStateToProps,
      mapDispatchToProps
      )(Taskpage)