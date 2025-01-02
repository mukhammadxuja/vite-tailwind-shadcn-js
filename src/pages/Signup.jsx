import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
} from 'firebase/auth';
import zxcvbn from 'zxcvbn';
import { toast } from 'sonner';

import { Progress } from '@/components/ui/progress';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigate('/dashboard');
    } catch (error) {
      setError(error.message); // Show Firebase error
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const result = zxcvbn(password);
    setPasswordStrength(result.score); // Set the password strength score (0-4)
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white border rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>

      {/* Show error if any */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                message: 'Invalid email',
              },
            })}
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            type="password"
            id="password"
            onChange={handlePasswordChange} // Handle password change for strength checking
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Password strength indicator */}
          <div className="mt-2">
            <div className="mt-2">
              <Progress
                value={(passwordStrength / 4) * 100}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Password Strength:{' '}
                {
                  ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][
                    passwordStrength
                  ]
                }
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
        </div>
      </form>

      {/* Google Sign Up */}
      <button
        onClick={handleGoogleSignup}
        className="w-full py-2 bg-red-500 text-white rounded-md mt-4"
      >
        Sign Up with Google
      </button>
    </div>
  );
};

export default Signup;
