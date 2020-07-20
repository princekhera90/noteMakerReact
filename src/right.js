import React from 'react';
import './right.css';
import './modal'
import Modal from './modal';


class Right extends React.Component{
    constructor(props){
        super(props)
    }


    openModal=(e)=>{
        this.props.openModal({id : parseInt(e.target.id)})
    }
 
    render(){
        return(
        <div class="right">
            <div>
            {this.props.list.map(ele=>{
                return(<div class="content row">
                <div class="content_left col-8">
                <div class="display-4 title">{ele.title}</div>
                <div class="note">{ele.description}</div>
                </div>
                <div class="content_right col-3">
                <div class="date">{ele.date}</div>
                <button class="btn btn-info" onClick={this.openModal} id={ele.id}>Edit</button>
                </div>
                <hr class="line"></hr>
                </div>)
            })}
            </div>
        </div>)
    }
}

export default Right