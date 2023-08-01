import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';


import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import {
  ProductCardContainer, 
  ProductFooter, 
  ProductImg,
  ProductName,
  ProductPrice,
} from './product-card.styles.jsx';


const ProductCard = ({product}) =>{
  const {name, price, imageUrl} = product;

  const {addItemToCart} = useContext(CartContext);
  const addProductToCart = () =>  addItemToCart(product);

  
  return (
  <ProductCardContainer>
    <ProductImg src={imageUrl} alt={`${name}`}/>
    <ProductFooter>
      <ProductName>{name}</ProductName>
      <ProductPrice>{price}</ProductPrice>
    </ProductFooter>
    <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
  </ProductCardContainer>
  )
}

export default ProductCard;