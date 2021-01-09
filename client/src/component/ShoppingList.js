import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { getItems, deleteItem, editItem } from '../actions/itemActions'
import PropTypes from 'prop-types'

const refresh = <FontAwesomeIcon icon={faSync} />

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems()
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id)
  }
  onEditClick = (id) => {
    const newName = prompt('Edit Item')
    const newItem = {
      name: newName,
    }
    if (newName) {
      this.props.editItem(newItem, id)
    }
  }
  render() {
    const { items } = this.props.item
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    &times;
                  </Button>
                  <Button
                    color='warning'
                    size='sm'
                    className='edit-btn'
                    onClick={this.onEditClick.bind(this, _id)}
                  >
                    {refresh}
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    )
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  item: state.item,
})
export default connect(mapStateToProps, { getItems, deleteItem, editItem })(
  ShoppingList
)
