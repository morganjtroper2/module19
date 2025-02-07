import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { toggleCart, addToCart } from '../../redux/slices/cartSlice';
import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const cartOpen = useSelector((state) => state.cart.cartOpen);
  const dispatch = useDispatch();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch(addToCart(cart));
    }

    if (!cart.length) {
      getCart();
    }
  }, [cart.length, dispatch]);

  function calculateTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.purchaseQuantity, 0).toFixed(2);
  }

  function submitCheckout() {
    const productIds = cart.flatMap((item) => Array(item.purchaseQuantity).fill(item._id));
    getCheckout({ variables: { products: productIds } });
  }

  if (!cartOpen) {
    return (
      <div className="cart-closed" onClick={() => dispatch(toggleCart())}>
        <span role="img" aria-label="cart">🛒</span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={() => dispatch(toggleCart())}>[close]</div>
      <h2>Shopping Cart</h2>
      {cart.length ? (
        <>
          {cart.map((item) => <CartItem key={item._id} item={item} />)}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? <button onClick={submitCheckout}>Checkout</button> : <span>(log in to check out)</span>}
          </div>
        </>
      ) : (
        <h3>😱 You haven't added anything to your cart yet!</h3>
      )}
    </div>
  );
};

export default Cart;