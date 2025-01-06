import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase';
import { Link } from 'react-router-dom';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const onSubmit = async (data) => {
    setMessage('');
    setError('');
    try {
      await sendPasswordResetEmail(auth, data.email);
      setMessage('Password reset email sent! Check your inbox');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
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

      <div className="mx-auto flex w-full flex-col justify-center gap-4 md:gap-6 sm:w-[350px]">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t('resetEmailTitle')}
          </h1>
          {message && (
            <p className="text-sm text-primary text-center mb-4">
              {message} and back to{' '}
              <Link className="underline" to="/signin">
                Signin
              </Link>
              .
            </p>
          )}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 md:space-y-3"
        >
          <div className="space-y-1">
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
              placeholder="example@gmil.com"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : `${t('resetEmailBtn')}`}
            </Button>
          </div>
        </form>
        <p className="text-muted-foreground px-8 text-center text-sm">
          <Link
            to="/signup"
            className="hover:text-brand underline underline-offset-4"
          >
            {t('doNotHaveProfile')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
