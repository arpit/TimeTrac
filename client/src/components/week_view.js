import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment'
import Track from '../models/track'

const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"]


class WeekView extends Component{

  constructor(props){
    super(props)
    this.state = { weekOffset:0, tracks: []}
  }

  componentDidMount(){
    this.loadTracks()
    this.setState({weekOffset:0})
    this.loadDataFor(0)
  }

  loadTracks(){
    fetch('/api/tracks').then( (response)=>{ return response.json() }   ).
        then((json)=>{ this.setState({tracks: json.tracks})}).
        catch(e => alert("Error loading tracks"))
  }

  trackDataToView(item){
    console.log("item::: ",item)
    let cells = days.map( (day)=>{
      return <td className="" key={item.name+"_"+day}><input type="text" name={item.name+"_"+day}/></td>
    } )

    return <tr key={item.name+"_row"} className="Track-Row">
            <td key={item.name+"_trac"}>{item.name}</td>
            {cells}
            </tr>
  }


  changeWeek(increment){
    let nowWeek = this.state.weekOffset + increment;
    this.setState({weekOffset: nowWeek})
    this.loadDataFor( nowWeek )
  }



  saveDataFor(week){

  }


  getWeekDates(offset){
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay() + offset*7; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    return {first: first, last: last}
  }

  getWeek(offset){
    var curr = new Date();
    let dates = this.getWeekDates(offset)
    var firstday = new Date(curr.setDate(dates.first)).toUTCString();
    var lastday = new Date(curr.setDate(dates.last)).toUTCString();
    return { start: firstday, end: lastday }
  }

  loadDataFor(week){
    let start = this.getWeek(week).start;
    let m = moment(start).format("YYYY-MM-DD")
  }

  render(){

    let nav = (
                  <div className="Main-Controls">
                    <div className="date_header">
                    <span className="date_page_button date_left" onClick={ ()=>{ this.changeWeek(-1) }}> &laquo;</span>
                    <Moment format="MMM DD">{this.getWeek(this.state.weekOffset).start}</Moment>&nbsp;-&nbsp;
                    <Moment format="MMM DD">{this.getWeek(this.state.weekOffset).end}</Moment>
                    <span className="date_page_button date_right"
                          onClick={ ()=>{ this.changeWeek(1) }}>&raquo;</span>
                    </div>
                    <a href="#" className="Button save">Save</a>
                    <a href="#" className="Button new-track-button"
                        onClick={(e)=>{
                          e.preventDefault();
                          this.props.history.push("/new/");}}>New Track</a>

                  </div>
                 )
    let header_cells = days.map( (day)=>{
      return <th width="8%" key={"header_"+day}>{day}</th>
    } )
    let table_header = <tr>
                          <th width="40%" key="header_track">Track</th>
                          {header_cells}
                          </tr>

    return(
      <div>
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
    )
  }
}

export default WeekView;
