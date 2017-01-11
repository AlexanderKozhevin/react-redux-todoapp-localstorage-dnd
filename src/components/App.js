import React, { Component, PropTypes } from 'react';
import './App.css';
import logo from '../to-do-list.svg';
import plus from '../add-button.svg';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';
import { connect } from 'react-redux'
import _ from 'lodash'

class ViewTable extends Component {
  constructor(props){
    super()
    this.state = {
      text: props.text
    }
  }
  enter = (e) =>{
    if (e.key == 'Enter'){
      this.props.addItem()
    }
  }

  render(){
    if (this.props.mode){
      return(
        <Container />
      )
    } else {
      return(
        <div className="edit-container flex-col flex-main-center flex-second-center">
          <input className="newItem" ref="edit" value={this.props.text} placeholder="New item" type="text" onChange={this.props.edit} onKeyPress={this.enter} />
          <div className="btn" onClick={this.props.addItem}>Submit</div>
        </div>
      )
    }
  }
}

class App extends Component {
  constructor(props){
    super(props);
  }

  edit = () => {

    this.props.dispatch({ type: 'text_edit', data: this.refs.viewtable.refs.edit.value})
  }

  toggle = () =>{
    this.props.dispatch({ type: 'toggle_mode' })


    if (!this.props.mode){
      setTimeout(()=>{
        this.refs.viewtable.refs.edit.focus()
      },100)
    }

  }

  addItem = () =>{
    let index = (_.maxBy(this.props.list, 'id')).id + 1;
    let val = this.refs.viewtable.refs.edit.value;
    this.props.dispatch({ type: 'new_item', data: {id: index, text: val} })
    this.props.dispatch({ type: 'text_edit', data: ''})
  }

  render() {


    return (
      <div className="App flex-col flex-main-center flex-second-center">
        <div className="card-container flex-row flex-main-start">
          <div className="left-box flex-col flex-main-start flex-second-center">
            <img className={`plus ${this.props.mode? 'deg45' : ''}`}  src={plus} alt="logo" onClick={this.toggle} />

            <div className="logo-container flex flex-col flex-main-center flex-second-center">
              <img className="logo" src={logo} alt="logo" />
            </div>

          </div>
          <ViewTable ref="viewtable" text={this.props.text} edit={this.edit} addItem={this.addItem} mode={!this.props.mode}  />


        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    list: state.list,
    mode: state.mode,
    text: state.text
  }
}

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(App));
