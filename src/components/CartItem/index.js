import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../../redux/slices/cartSlice';
import { idbPromise } from '../../utils/helpers';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item._id));
    idbPromise('cart', 'delete', item);
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (value === 0) {
      handleRemove();
    } else {
      dispatch(updateCartQuantity({ _id: item._id, purchaseQuantity: value }));
      idbPromise('cart', 'put', { ...item, purchaseQuantity: value });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img src={`/images/${item.image}`} alt={item.name} />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input type="number" placeholder="1" value={item.purchaseQuantity} onChange={handleChange} />
          <span role="img" aria-label="trash" onClick={handleRemove}>🗑️</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;