import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import './navigation.styles.scss';

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';

import {signOutUser } from "../../utils/firebase/firebase.utils";



const Navigation = () => {
  // setCurrentUser
  const {currentUser } = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);
  
  const signOutHandler = async () => {
    await signOutUser();
    // console.log(res);
    // setCurrentUser(null);
  }

  return (
    <Fragment>
      <div className="navigaton" style={{height: '70px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '25px',
        }}
        >
        <Link className=".logo-container" to='/' style={{
            height: '100%',
            width: '70px',
            padding: '25px',
        }}>
          <CrwnLogo className="logo"/>
        </Link>
        
        <div className="nav-links-container" style={{
          width: '50%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
          <Link  className="nav-link" to='/shop'>SHOP</Link>
          {
            currentUser ? (
              <span className="nav-link" style={{padding: '10px 15px',
                cursor: 'pointer'}} onClick={signOutHandler}>SIGN OUT</span>)
              : (
                <Link className="nav-link" style={{padding: '10px 15px',
                cursor: 'pointer'}} to='/auth'>SIGN IN</Link>
              
            )
          }
          <CartIcon />
        </div>
         {isCartOpen && <CartDropdown />}
      </div>
    <Outlet />
    </Fragment>
  )
}

export default Navigation;