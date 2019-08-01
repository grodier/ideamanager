import { useRouter } from 'next/router';
import useForm from '../hooks/useForm';
import datasource from '../utils/datasource';
import Button from '../components/Button';
import InputGroup from '../components/login-signup-forms/InputGroup';
import FormContainer from '../components/login-signup-forms/FormContainer';
import { useState } from 'react';
import '../style.css';

function SignUp() {
  const { handleSubmit, handleChange, values, submitAttempts } = useForm(
    onSubmit
  );
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  async function onSubmit() {
    setErrorMessage('');
    if (values.password1 !== values.password2) {
      return setErrorMessage('Password does not match confirmation password!');
    }
    try {
      const user = await datasource.signUpUser(
        values.email,
        values.password1,
        values.firstName,
        values.lastName
      );
      console.log(user);
      router.push('/app');
    } catch (error) {
      handleError(error);
    }
  }

  function handleError(error) {
    const message = error.message.endsWith('.')
      ? error.message.substring(0, error.message.length - 1)
      : error.message;
    setErrorMessage(`${message}!`);
  }

  function validatePassword() {}

  function validateConfirmationPassword() {}

  return (
    <FormContainer
      onSubmit={handleSubmit}
      title="Create a new account"
      errorMessage={errorMessage}
      submitAttempts={submitAttempts}
    >
      <div className="mb-8">
        <InputGroup
          groupId="firstName"
          label="First name"
          type="text"
          placeholder="John"
          value={values.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-8">
        <InputGroup
          groupId="lastName"
          label="Last name"
          type="text"
          placeholder="Doe"
          value={values.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-8">
        <InputGroup
          groupId="email"
          label="Email"
          type="text"
          placeholder="johndoe@example.com"
          value={values.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-8">
        <InputGroup
          groupId="password1"
          label="Password"
          type={'password'}
          placeholder="********"
          value={values.password1}
          onChange={handleChange}
        />
      </div>
      <div className="mb-10">
        <InputGroup
          groupId="password2"
          label="Confirm password"
          type={'password'}
          placeholder="********"
          value={values.password2}
          onChange={handleChange}
        />
      </div>

      <Button
        type="submit"
        additionalCss="w-full"
        disabled={
          !values.firstName ||
          !values.lastName ||
          !values.email ||
          !values.password2
        }
      >
        Sign Up
      </Button>
    </FormContainer>
  );
}

export default SignUp;
