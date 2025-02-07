import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategories, setCurrentCategory } from '../../redux/slices/categorySlice';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch(setCategories(categoryData.categories));
      categoryData.categories.forEach((category) => idbPromise('categories', 'put', category));
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => dispatch(setCategories(categories)));
    }
  }, [categoryData, loading, dispatch]);

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button key={item._id} onClick={() => dispatch(setCurrentCategory(item._id))}>{item.name}</button>
      ))}
    </div>
  );
}

export default CategoryMenu;