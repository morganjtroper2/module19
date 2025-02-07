import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../../redux/slices/productSlice';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const products = useSelector((state) => state.products.products);
  const currentCategory = useSelector((state) => state.categories.currentCategory);
  const dispatch = useDispatch();
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch(setProducts(data.products));
      data.products.forEach((product) => idbPromise('products', 'put', product));
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => dispatch(setProducts(products)));
    }
  }, [data, loading, dispatch]);

  const filterProducts = () => (currentCategory ? products.filter((product) => product.category._id === currentCategory) : products);

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem key={product._id} {...product} />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading && <img src={spinner} alt="loading" />}
    </div>
  );
}

export default ProductList;