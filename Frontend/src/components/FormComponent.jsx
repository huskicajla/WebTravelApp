/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm } from 'react-hook-form';

const FormComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          {...register('fullName', { required: true })}
          className="w-full px-3 py-1 border rounded-md outline-none"
        />
        {errors.fullName && <span>This field is required</span>}
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          {...register('email', { required: true })}
          className="w-full px-3 py-1 border rounded-md outline-none"
        />
        {errors.email && <span>This field is required</span>}
      </div>

      <div>
        <label>Credit Card Number</label>
        <input
          type="text"
          {...register('creditCard', { required: true })}
          className="w-full px-3 py-1 border rounded-md outline-none"
        />
        {errors.creditCard && <span>This field is required</span>}
      </div>

      <div>
        <label>Expiration Date</label>
        <input
          type="text"
          {...register('expirationDate', { required: true })}
          className="w-full px-3 py-1 border rounded-md outline-none"
        />
        {errors.expirationDate && <span>This field is required</span>}
      </div>

      <div>
        <label>CVV</label>
        <input
          type="text"
          {...register('cvv', { required: true })}
          className="w-full px-3 py-1 border rounded-md outline-none"
        />
        {errors.cvv && <span>This field is required</span>}
      </div>

      <button type="submit" className="bg-pink-500 text-white px-3 py-1 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
