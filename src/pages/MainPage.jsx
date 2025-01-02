import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { auth } from '@/firebase';
import { sendEmailVerification, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RefreshCcw, Terminal, Timer } from 'lucide-react';

function MainPage() {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const startTimer = () => {
    setResendDisabled(true);
    setTimer(60); // Start 60-second timer
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setResendDisabled(false); // Enable button when timer ends
    }
  }, [timer]);

  const handleResendVerification = async () => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        await sendEmailVerification(currentUser); // Use the explicit function
        toast('Verification email sent!');
        startTimer(); // Start countdown after successful send
      } else {
        alert('No user is currently signed in.');
      }
    } catch (error) {
      console.error('Error resending verification email:', error.message);
      alert('Failed to send verification email. Please try again.');
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div>
      {!auth.currentUser.emailVerified && (
        <Alert className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4">
          <div className="flex items-center">
            <Timer className="h-5 w-5 mr-2" />
            <div>
              <AlertTitle>Email Not Verified</AlertTitle>
              <AlertDescription>
                Your email is not verified. Please check your inbox for a
                verification email. If you didn’t receive one, you can resend it
                below.
              </AlertDescription>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleReload}>Reload Page</Button>
            <Button
              onClick={handleResendVerification}
              disabled={resendDisabled}
              variant="secondary"
              className="px-4 py-2"
            >
              {resendDisabled ? `Resend in ${timer}s` : 'Resend Email'}
            </Button>
          </div>
        </Alert>
      )}
      <h5>{user.displayName ? user.displayName : user.email}</h5>
      <Button variant="destructive" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default MainPage;
