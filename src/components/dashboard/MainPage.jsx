import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { auth } from '@/firebase';
import { sendEmailVerification, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RefreshCcw, Terminal, Timer } from 'lucide-react';
import EmailVerification from '@/components/EmailVerification';

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

  return (
    <div className="space-y-2">
      <EmailVerification />
      <h5>{user.isAnonymous ? 'Anonymous' : user.email}</h5>
      <Button variant="destructive" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default MainPage;
