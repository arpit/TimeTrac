import React, { Component } from 'react';
import Form from "react-jsonschema-form";
import Alert from 'react-s-alert';

const log = (m) => console.log(m)

const schema = {
  title: "New Track",
  type: "object",
  required: ["name"],
  properties: {
    name: {type: "string", title: "Name"},
  }
};

class NewTrackForm extends Component{

  saveNewTrack(name){
    console.log("saving: ", name)
    fetch('/api/tracks',
            { method:'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             },
            body: JSON.stringify({"name" : name}) }).
    then(res => { return res.json()}).
    then(json => { if(json.status == "Error"){
      Alert.error("Error saving track")
    } else{
      Alert.success("Saved")
    } })
  }

  render(){
    return(
      <div className="form_container">
        <Form schema={schema}
          onChange={log("changed")}
          onSubmit={({formData})=>{this.saveNewTrack(formData.name)}}
          onError={log("errors")} />
      </div>
    )
  }
}

export default NewTrackForm;
