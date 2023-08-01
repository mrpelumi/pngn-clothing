import {
  CartItemContainer, 
  ImgItem, 
  ItemDetails,
  ItemName} 
  from './cart-item.styles.jsx'

const CartItem = ({cartItem}) => {
  const {name, imageUrl, price, quantity} = cartItem;
  return (
    <CartItemContainer>
      <ImgItem src= {imageUrl} alt={`${name}`} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <span>{quantity} x ${price}</span>
      </ItemDetails>
      
    </CartItemContainer>
  )
}

export default CartItem;