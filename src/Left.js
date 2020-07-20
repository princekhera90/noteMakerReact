import React from 'react';
import './Left.css';
import Modal from './modal'

class Left extends React.Component{
  constructor(){
    super()
    this.state = {date : null}
  }
  open = (e)=>{

    const data = {date : e.target.value}
    this.props.openModal(data)
  }

  render(){
    return(<div class="calender mb-3 input-group date">
    <label for="cal">Pick A Date to Start making Notes</label>
    <input type="date" id="cal" class="form-control" placeholder="Select one date from calender" onChange={this.open} />
    </div>)
  }
}


export default Left;