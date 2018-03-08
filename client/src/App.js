import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Moment from 'react-moment';

const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"]


class App extends Component {

  constructor(){
      super()
      this.state = { tracks: [{
        name: "trac1"
      }, {
        name: "trac2"
      }] }
  }

  getCurrentWeek(){
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();
    return { start: firstday, end: lastday }
  }

  componentDidMount(){

  }

  trackDataToView(item){
    let cells = days.map( (day)=>{
      return <td className="" key={item.name+"_"+day}><input type="text" name={item.name+"_"+day}/></td>
    } )

    return <tr key={item.name+"_row"} className="Track-Row">
            <td key={item.name+"_trac"}>{item.name}</td>
            {cells}
            </tr>
  }



  render() {

    let nav = (
                  <div className="Main-Controls">
                    <div className="date_header">
                    <span className="date_page_button date_left">&laquo;</span>
                    <Moment format="MMM DD">{this.getCurrentWeek().start}</Moment>&nbsp;-&nbsp;
                    <Moment format="MMM DD">{this.getCurrentWeek().end}</Moment>
                    <span className="date_page_button date_right">&raquo;</span>
                    </div>

                    <a href="#" className="Button new-track-button">New Track</a>
                  </div>
                 )
    let header_cells = days.map( (day)=>{
      return <th width="8%" key={"header_"+day}>{day}</th>
    } )
    let table_header = <tr>
                          <th width="40%" key="header_track">Track</th>
                          {header_cells}
                          </tr>

    return (
      <div className="App">
        <div className="App-header">

        </div>
        <div className="App-content">
          {nav}
          <table width="100%" className="tracks" >
            <thead>
              {table_header}
            </thead>
            <tbody>
              {this.state.tracks.map(this.trackDataToView)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
