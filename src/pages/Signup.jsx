import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import zxcvbn from 'zxcvbn';

import { Progress } from '@/components/ui/progress';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ChevronLeft } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: data.email,
        displayName: data.displayName || 'User',
      });

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

      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.displayName || 'Google User',
        });
      }

      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const result = zxcvbn(password);
    setPasswordStrength(result.score);
  };

  return (
    <div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Link
          to="/"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute left-4 top-4 md:left-8 md:top-8'
          )}
        >
          <>
            <ChevronLeft className="mr-2 size-4" />
            {t('back')}
          </>
        </Link>
        <Select
          onValueChange={changeLanguage}
          value={i18n.language}
          defaultValue="en"
        >
          <SelectTrigger className="absolute right-4 top-4 md:right-8 md:top-8 w-32">
            <SelectValue placeholder={t('languagesTitle')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="de">German</SelectItem>
          </SelectContent>
        </Select>
        <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t('signUpTitle')}
            </h1>
            <p className="text-muted-foreground text-sm">{t('signUpDesc')}</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2 md:space-y-3"
          >
            <div>
              <Label
                htmlFor="displayName"
                className="block text-sm font-medium text-gray-700"
              >
                {t('displayName')}
              </Label>
              <Input
                {...register('displayName', {
                  required: 'DisplayName is required',
                })}
                id="displayName"
                placeholder="John Doe"
                className="w-full"
              />
              {errors.displayName && (
                <p className="text-red-500 text-sm">
                  {errors.displayName.message}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: 'Invalid email',
                  },
                })}
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className="w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                type="password"
                id="password"
                placeholder="********"
                onChange={handlePasswordChange}
                className="w-full"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              {/* Password strength indicator */}
              <div className="mt-2">
                <div className="mt-2">
                  <Progress
                    value={(passwordStrength / 4) * 100}
                    className="w-full h-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {t('strength')}{' '}
                    {
                      ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][
                        passwordStrength
                      ]
                    }
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Signing up...' : `${t('signupBtn')}`}
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-2">
                {t('or')}
              </span>
            </div>
          </div>
          <Button
            onClick={handleGoogleSignup}
            variant="secondary"
            className="w-full flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              className=" h-4 w-4"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span>{t('signupWitGoogleBtn')}</span>
          </Button>
          <p className="text-muted-foreground px-8 text-center text-sm">
            <Link
              to="/signin"
              className="hover:text-brand underline underline-offset-4"
            >
              {t('alreadyHave')}
            </Link>
          </p>
        </div>
      </div>

      {/* Google Sign Up */}
    </div>
  );
};

export default Signup;
