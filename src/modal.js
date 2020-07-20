import React from 'react';
import './modal.css'

class Modal extends React.Component {

  constructor(props) {
    debugger
    super(props);
    this.state = {
      title: this.props.data.title ? this.props.data.title : '',
      note: this.props.data.description ? this.props.data.description : '',
      id: this.props.data.id ? this.props.data.id : 0,
      date : this.props.data.date
    }
    console.log('props =', this.props.data)
  }

  open = () => {
    document.getElementById("myModal").style.display = "block";
  }

  closeModal = (e) => {
    e.preventDefault()
    document.getElementById("myModal").style.display = "none";
    this.props.closeModal()
  }

  submit = (e) => {
    e.preventDefault()
    let id = this.state.id===0 ?  (parseInt(localStorage.getItem('id')) ? parseInt(localStorage.getItem('id')) + 1 : 0) : this.state.id
    console.log('id = ', id)
    const newEntry = { id: id, title: this.state.title, description: this.state.note, date : this.state.date }
    this.props.changed(newEntry)
    this.setState({title : '', note : '', id : 0})
    this.closeModal(e)
  }

  change(field, e) {
    this.setState({ [field]: e.target.value })
  }

  render() {
    return (<div>
      <div id="myModal" class="modal">
        <form>
          <h4>Add Note {this.state.date}</h4>
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" value={this.state.title} onChange={(e) => { this.change('title', e) }} />
          </div>
          <div class="form-group">
            <label for="content">Add Note</label>
            <textarea type="text" class="form-control" id="content" value={this.state.note} onChange={(e) => { this.change('note', e) }} />
          </div>
          <button class="btn btn-primary" onClick={this.submit}>Save</button>
          <button class="btn" onClick={this.closeModal}>Discard</button>
        </form>
      </div>
    </div>)
  }
}


export default Modal;