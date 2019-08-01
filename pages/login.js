import { useState } from 'react';
import { useRouter } from 'next/router';
import useForm from '../hooks/useForm';
import datasource from '../utils/datasource';
import Button from '../components/Button';
import InputGroup from '../components/login-signup-forms/InputGroup';
import FormContainer from '../components/login-signup-forms/FormContainer';
import '../style.css';

function Login() {
  const [formError, setFormError] = useState(false);
  const { handleSubmit, handleChange, values, submitAttempts } = useForm(
    onSubmit
  );
  const router = useRouter();

  async function onSubmit() {
    const { data, error } = await datasource.signInUser(
      values.email,
      values.password
    );
    if (error) {
      setFormError(true);
    } else {
      router.push('/app');
    }
  }

  return (
    <FormContainer
      onSubmit={handleSubmit}
      title="Welcome Back"
      errorMessage={formError ? 'Invalid email or password!' : ''}
      submitAttempts={submitAttempts}
    >
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
      <div className="mb-10">
        <InputGroup
          groupId="password"
          label="Password"
          type="password"
          placeholder="********"
          value={values.password}
          onChange={handleChange}
        />
      </div>

      <Button
        type="submit"
        additionalCss="w-full"
        disabled={!values.email || !values.password}
      >
        Sign In
      </Button>
    </FormContainer>
  );
}

export default Login;
