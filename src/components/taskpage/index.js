import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { complete, setPassed, remove } from '../../modules/manager'

function Taskpage(props) {

  let id = Number(props.match.params.id)

  let due = props.byHash && props.byHash[id] ? props.byHash[id].due : new Date();

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
      <div>
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
                <p>{props.byHash && props.byHash[d] ? props.byHash[d].description : ''}</p>
                <p>{props.byHash && props.byHash[d] ? props.byHash[d].due.toLocaleString() : ''}</p>
                <p>{props.byHash && props.byHash[d] ? props.byHash[d].completed.toString() : ''}</p>
                <p>{ props.byHash && props.byHash[d] ? props.byHash[d].status : '' }</p>
                <button onClick={()=> props.complete(d)}>Complete</button>
                <button onClick={()=> props.remove(d).then(()=>props.toHome())}>Remove</button>
                <br></br>
                {timerComponents.length ? timerComponents : <span>Time's up!</span>}
            </div>
          )
      }) :
      props.toHome()
    }
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