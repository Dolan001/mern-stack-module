import React, { Component } from 'react';
import { Container,ListGroup,ListGroupItem,Button } from 'reactstrap';
import { CSSTransition,TransitionGroup } from 'react-transition-group';
//import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemactions';
import PropTypes from 'prop-types';


class ShoppingList extends Component {

    componentDidMount(){
        this.props.getItems();
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    }

    render() {
        //this.props.item.items
        const {items} = this.props.item;

        return(
            <Container>
            
                {/* <Button color="dark" style={{marginBottom: '2rem'}} 
                onClick={() => {
                    const name = prompt('Enter Item');
                    if(name){
                        this.setState(state => ({
                            items: [...state.items, {id: uuidv4(),name}]
                        }))
                    }
                }}
                >Add Item</Button> */}


                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button 
                                    className="remove-btn" 
                                    color="danger" 
                                    size="sm" 
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                    >&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
})

export default connect(
    mapStateToProps,
    { 
        getItems,
        deleteItem
    })(ShoppingList);
