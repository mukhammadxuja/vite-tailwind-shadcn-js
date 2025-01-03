import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { toast } from 'sonner';

const Signin = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Handle Sign-in
  const handleSignIn = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect to dashboard after successful sign-in
    } catch (error) {
      setError(error.message); // Show Firebase error
    }
  };

  const handleAnonymousSignIn = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      navigate('/dashboard');
      toast('Signed in anonymously:');
    } catch (error) {
      console.error('Error signing in anonymously:', error.message);
    }
  };

  return (
    <div className="signin-container">
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
      >
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register('email', { required: 'Email is required' })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-2">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register('password', { required: 'Password is required' })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-2">
              {errors.password.message}
            </p>
          )}
        </div>
        <p>
          Forgot your password?
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Reset it here
          </Link>
        </p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>

        {error && (
          <p className="text-sm text-red-500 mt-4 text-center">{error}</p>
        )}
      </form>
      <button
        onClick={handleAnonymousSignIn}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Continue as Guest
      </button>
    </div>
  );
};

export default Signin;
