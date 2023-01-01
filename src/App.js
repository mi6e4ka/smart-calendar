import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import { object } from 'prop-types';

Date.prototype.getEUDay = function() {
  let UStoEU = [6,0,1,2,3,4,5];
  return UStoEU[this.getDay()];
};
Date.prototype.daysInMonth = function() {
  return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};


class App extends React.Component {
  render() {
    return (
      <Table/>
    )
  };
}

class Table extends React.Component {
  render() {
    return (
      <table class="calendar">
        {[1,2,3,4,5,6].map((i) => <TRow row={i}/>)}
      </table>
    )
  }
}

class TRow extends React.Component {
  render() {
    return (
      <tr>
        {[1,2,3,4,5,6,7].map((i) => <TCell cell={i} row={this.props.row}/>)}
      </tr>
    )
  }
}

class TCell extends React.Component {
  render() {
    let date = new Date()
    let row = Number(this.props.row)
    let cell = Number(this.props.cell)
    let posInCalendar = ( row - 1 ) * 7 + cell
    let offset = date
    offset.setDate(1)
    offset = offset.getEUDay()
    let day = posInCalendar - offset
    let type = ( posInCalendar % 7 === 0 || posInCalendar % 7 === 6) ? "weekend" : "weekday";
    if ( posInCalendar <= date.getEUDay() ) {
      let prevMonth = date
      prevMonth.setMonth(date.getMonth() - 1)
      return (
        <td>
          <span class="otherMonth">{ prevMonth.daysInMonth() + posInCalendar - offset}</span>
        </td>
      )
    }
    if ( posInCalendar - offset > date.daysInMonth() ) {
      let nextMonth = date
      nextMonth.setMonth(date.getMonth() - 1)
      return (
        <td>
          <span class="otherMonth">{ - nextMonth.daysInMonth() + posInCalendar - offset }</span>
        </td>
      )
    }
    return (
      <td>
        <span class={type}>{ day }</span>
      </td>
    )
  }
}

export default App;
