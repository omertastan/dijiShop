import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  ListGroupItem,
  FormControl,
} from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'
const countOption = (stockCount, item) => {
  const options = []
  for (let i = 1; i <= stockCount; i++) {
    options.push(<option key={i}>{i}</option>)
  }
  return options
}

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const { cartItems } = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    } else {
      console.log('Error')
    }
  }, [dispatch, productId, qty])
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.price}</Col>
                  <Col md={2}>Qty</Col>
                  <Col>
                    <FormControl
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {countOption(item.countInStock, item)}
                    </FormControl>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}{' '}
              $
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
              >
                {' '}
                Proceed To Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
