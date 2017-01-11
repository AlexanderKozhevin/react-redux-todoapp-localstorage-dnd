import React, { Component } from 'react';
import update from 'react/lib/update';
import Card from './Item';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux'

class Container extends Component {

	constructor(props) {
		super(props);
	}


	moveCard = (dragIndex, hoverIndex) => {

		var tempList = Object.assign([], this.props.cards);
		const dragCard = tempList[dragIndex];
		tempList.splice(dragIndex, 1);
		tempList.splice(hoverIndex, 0, dragCard); 
		this.props.dispatch({ type: 'update_cards', data: tempList })

	}

	render() {

		const { canDrop, isOver, connectDropTarget } = this.props;
		const isActive = canDrop && isOver;


		const backgroundColor = isActive ? 'rgba(248,248,248,1)' : '#FFF';

		return connectDropTarget(
			<div className="list-container" style={{backgroundColor}}>
				{this.props.cards.map((card, i) => {
					return (
						<Card
							key={card.id}
							index={i}
							card={card}
							moveCard={this.moveCard} />
					);
				})}
			</div>
		);
  }
}


function mapStateToProps (state) {
  return {
    cards: state.list
  }
}

let connect_context = connect(mapStateToProps)(Container)

export default DropTarget("CARD", {}, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
}))(connect_context);
