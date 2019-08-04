import { useState } from 'react';

function useForm(callback) {
  const [values, setValues] = useState({});
  const [submitAttempts, setSubmitAttempts] = useState(0);

  async function handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    await callback();
    setSubmitAttempts(attempts => attempts + 1);
  }

  function handleChange(event) {
    event.persist();
    const name = event.target.name;
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setValues(previousValues => ({
      ...previousValues,
      [name]: value
    }));
  }

  function clearValues() {
    setValues({});
  }

  return {
    handleSubmit,
    handleChange,
    values,
    submitAttempts,
    clearValues
  };
}

export default useForm;
