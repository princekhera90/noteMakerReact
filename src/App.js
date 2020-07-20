import React, { Fragment } from 'react';
import Split from './split'
import Left from './Left'
import Right from './right'
import Modal from './modal'

class App extends React.Component{
  constructor(){
    super()
    console.log(localStorage.getItem('id'))
    if(localStorage.getItem('list')===null){
      localStorage.setItem('list', JSON.stringify([{id : 1, title : 'blah', date: '2020-07-23', description : 'blahblahblah'}, {id : 2,title : 'blah', date: '2020-07-23', description : 'blahblahblah'}]));
    }
    if(localStorage.getItem('id')===null){
      localStorage.setItem('id', 2)
    }
    this.state = {list : [], currentData : null, modal : false}
  }

  componentDidMount(){
    if(localStorage.getItem('list')!==null && this.state.list.length===0){
        this.setState({list : JSON.parse(localStorage.getItem('list'))})
    }
  }

  listChanged=(newEntry)=>{
    debugger
    const list = this.state.list
    const res = list.filter(ele=>ele.id===newEntry.id)
    if(res.length>0){
      list.forEach(ele=>{
        debugger
        if(ele.id === newEntry.id){
          Object.keys(ele).forEach(key=>{
            ele[key] = newEntry[key]
          })
        }
      })
    }
    else{
      list.push(newEntry)
    } 
    let m = 0
    list.forEach(ele=>{
      if(ele.id>m){
        m = ele.id
      }
    })
    if(newEntry.id===0){
      newEntry.id = m+1
      m+=1
    }
    localStorage.setItem('list', JSON.stringify(list))
    if(localStorage.getItem('list')!==null){
        this.setState({list : JSON.parse(localStorage.getItem('list'))})
    }
    else{
        localStorage.setItem('list', JSON.stringify(this.state.list))
    }
    localStorage.setItem('id',m)
  }

  openModal = (data)=>{
    let newData = {id : null, title : null, description : null, date : null}
    if(data.id){
      const res = this.state.list.filter(ele=>ele.id===data.id)
      newData = {...res[0]}
    }
    else{
      newData.date = data.date
    }
    this.setState({currentData : newData, modal : true})
    process.nextTick(()=>{
      document.getElementById("myModal").style.display = "block";
    })
  }

  closeModal=()=>{
    this.setState({modal : false})
  }

  render(){
    return(<React.Fragment>
      <div class="App">
      <Left openModal={this.openModal}></Left>
      <Split></Split>
      {this.state.modal && <Modal changed={this.listChanged} data={this.state.currentData} closeModal={this.closeModal}></Modal>}
      <Right list={this.state.list} openModal={this.openModal}></Right>
      </div>
    </React.Fragment>)
  }
}


export default App;
