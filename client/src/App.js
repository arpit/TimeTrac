import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import WeekView from './components/week_view'
import NewTrackForm from './components/new_track_form'

class App extends Component {

  constructor(){
      super()
      this.onNewTrackClicked = this.onNewTrackClicked.bind(this)

  }

  onNewTrackClicked(event){

  }

  renderMergedProps(component, ...rest){
    const finalProps = Object.assign({}, ...rest);
    return (
      React.createElement(component, finalProps)
    );
  }

  render() {
    /*
    React Router by default doesn't let you pass props to
    route components
    */
    const PropsRoute = ({ component, ...rest }) => {
      return (
        <Route {...rest} render={routeProps => {
          return this.renderMergedProps(component, routeProps, rest);
        }}/>
      );
    }

    return (
      <div className="App">
        <div className="App-header">
        </div>

        <Router>
          <div>
            <div className="App-content">
            <PropsRoute path="/" exact component={WeekView} newTrackListener={this.onNewTrackClicked}/>
            <Route path="/new/" component={NewTrackForm} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
