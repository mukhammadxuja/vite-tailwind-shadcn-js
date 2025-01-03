import React, { useEffect, useState } from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '@/firebase';

import { Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';

function EmailVerification() {
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const startTimer = () => {
    setResendDisabled(true);
    setTimer(60);
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleResendVerification = async () => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        await sendEmailVerification(currentUser);
        toast('Verification email sent!');
        startTimer();
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
    <>
      {!auth.currentUser.emailVerified && !auth.currentUser.isAnonymous && (
        <Alert className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4">
          <div className="flex items-center">
            <Timer className="size-5 mr-2" />
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
    </>
  );
}

export default EmailVerification;
