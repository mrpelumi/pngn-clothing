import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import {
  CheckoutItemContainer, 
  ImageContainer, 
  ImgItem,
  ItemArrow,
  ItemDetail,
  ItemQuantity,
  ItemValue,
  RemoveButton,
} from './checkout-item.styles.jsx';


const CheckoutItem = ({cartItem}) => {
  const {name, imageUrl, price,  quantity} = cartItem;
  const {clearItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem);

  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <ImgItem src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <ItemDetail>{name}</ItemDetail>
      <ItemQuantity>
        <ItemArrow onClick={removeItemHandler}>
          &#10094;
        </ItemArrow>
        <ItemValue>{quantity}</ItemValue>
        <ItemArrow onClick={addItemHandler}>
          &#10095;
        </ItemArrow>
      </ItemQuantity>
      <ItemDetail>{price}</ItemDetail>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem;