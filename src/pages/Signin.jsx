import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
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
import { useTranslation } from 'react-i18next';

const Signin = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleSignIn = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
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
            {t('signInTitle')}
          </h1>
          <p className="text-muted-foreground text-sm">{t('signInDesc')}</p>
        </div>
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="space-y-2 md:space-y-3"
        >
          <div className="space-y-1">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              {...register('email', { required: 'Email is required' })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </Label>
              <p className="text-muted-foreground text-xs">
                <Link
                  to="/forgot-password"
                  className="hover:text-brand underline underline-offset-4"
                >
                  {t('forgotPassword')}
                </Link>
              </p>
            </div>
            <Input
              type="password"
              id="password"
              placeholder="********"
              {...register('password', { required: 'Password is required' })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-2">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            {isSubmitting ? 'Signing in...' : `${t('signinButton')}`}
          </Button>

          {error && (
            <p className="text-sm text-red-500 mt-4 text-center">{error}</p>
          )}
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
          onClick={handleAnonymousSignIn}
          className="w-full"
          variant="secondary"
        >
          <img className="w-5 h-5" src="/assets/ghost.png" alt="Ghost png" />
          {t('signinButtonGhost')}
        </Button>
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

export default Signin;
