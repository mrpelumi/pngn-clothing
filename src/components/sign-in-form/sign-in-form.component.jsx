import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

// import { UserContext } from "../../contexts/user.context";

import { signInWithGooglePopup, 
  createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils";

import {ButtonsContainer, SignInContainer, SignInHeader} from './sign-in-form.styles.jsx'


const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {email, password} = formFields;

  // const {setCurrentUser} = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();


    try{
      const {user} = await signInAuthUserWithEmailAndPassword(email, password);

      // setCurrentUser(user);

      resetFormFields();
    } catch(error){
        switch (error.code){
          case 'auth/wrong-password':
            alert('Incorrect password for email!');
            break;
          case 'auth/user-not-found':
            alert('no user associated with this email');
            break;
          default:
            console.log(error);
        }
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value})
  }
  
  return (
    <SignInContainer>
      <SignInHeader>Already have an account?</SignInHeader>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label='email' type="email" required 
        onChange={handleChange} name="email" value={email}/>

        <FormInput label='password' type="password" required 
        onChange={handleChange} name="password" value={password}/>

        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign In</Button>
        </ButtonsContainer>
        
      </form>
    </SignInContainer>
  )
}

export default SignInForm;