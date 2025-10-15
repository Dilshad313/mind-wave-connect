import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useAuthStore from '../../stores/auth.store';
import { useNavigate } from 'react-router-dom';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const { register: registerUser, loading, error } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    await registerUser(data);
    navigate('/dashboard/user');
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" {...register('name')} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p>Registration failed</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
