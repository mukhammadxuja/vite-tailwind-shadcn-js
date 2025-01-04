import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAppContext } from '@/context/AppContext';
import { auth, db, storage } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  SelectContent,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useTranslation } from 'react-i18next';

function General({ photo, isFormChanged, setIsFormChanged, setImageSelected }) {
  const { userData, setUserData } = useAppContext();
  const { t } = useTranslation();

  const defaultValues = {
    displayName: userData?.displayName || '',
    profession: userData?.profession || '',
    location: userData?.location || '',
    pronoun: userData?.pronoun || '',
    isOpenToWork: userData?.isOpenToWork || false,
  };

  const {
    control,
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    reset({
      displayName: userData?.displayName || '',
      profession: userData?.profession || '',
      location: userData?.location || '',
      pronoun: userData?.pronoun || '',
      isOpenToWork: userData?.isOpenToWork || false,
    });
  }, [userData, reset]);

  const onSubmit = async (data) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No user is logged in.');
      }

      let photoURL = userData?.photoURL || null;

      if (photo.startsWith('data:')) {
        if (!photo.startsWith('data:')) {
          throw new Error('Invalid photo format. Please select a valid image.');
        }

        const storageRef = ref(storage, `user_photos/${currentUser.uid}`);
        await uploadString(storageRef, photo, 'data_url');
        photoURL = await getDownloadURL(storageRef);
      }

      const updatedData = {
        displayName: data.displayName,
        profession: data.profession,
        location: data.location,
        pronoun: data.pronoun,
        isOpenToWork: data.isOpenToWork,
        photoURL,
      };

      await setDoc(doc(db, 'users', currentUser.uid), updatedData, {
        merge: true,
      });

      setUserData((prevUserData) => ({
        ...prevUserData,
        ...updatedData,
      }));

      setImageSelected(null);
      toast('Profile updated successfully');
      setIsFormChanged(false);
    } catch (err) {
      console.error('Error updating profile:', err.message);
      setError('submit', {
        message: 'Failed to update profile. Please try again.',
      });
    }
  };

  const handleCancel = () => {
    reset(defaultValues);
    setIsFormChanged(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col items-start space-y-2">
        <Label required>{t('displayName')}</Label>
        <Input
          disabled={isSubmitting}
          {...register('displayName', { required: 'Display Name is required' })}
          placeholder={t('johnDoe')}
          onChange={() => setIsFormChanged(true)}
        />
        {errors.displayName && <p>{errors.displayName.message}</p>}
      </div>

      <div className="flex flex-col items-start space-y-2">
        <Label required>{t('profession')}</Label>
        <Input
          disabled={isSubmitting}
          {...register('profession', { required: 'Profession is required' })}
          placeholder={t('frontendDeveloper')}
          onChange={() => setIsFormChanged(true)}
        />
        {errors.profession && <p>{errors.profession.message}</p>}
      </div>

      <div className="flex flex-col items-start space-y-2">
        <Label optional>{t('location')}</Label>
        <Input
          disabled={isSubmitting}
          {...register('location')}
          placeholder={t('sanFrancisco')}
          onChange={() => setIsFormChanged(true)}
        />
      </div>

      <div className="space-y-1 w-full">
        <Label optional htmlFor="pronoun">
          {t('pronoun')}
        </Label>
        <Controller
          name="pronoun"
          control={control}
          render={({ field }) => (
            <Select
              disabled={isSubmitting}
              onValueChange={(value) => {
                field.onChange(value);
                setIsFormChanged(true);
              }}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Pronoun" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="He/Him">{t('heHim')}</SelectItem>
                <SelectItem value="She/Her">{t('sheHer')}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <p className="text-xs text-red-500">{errors.pronoun?.message}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Controller
            name="isOpenToWork"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Switch
                disabled={isSubmitting}
                checked={value}
                onCheckedChange={() => {
                  onChange(!value);
                  setIsFormChanged(true);
                }}
                id="isOpenToWork"
              />
            )}
          />
          <Label htmlFor="isOpenToWork">{t('openToWork')}</Label>
        </div>

        <div className="flex items-center gap-2">
          <Button type="button" variant="secondary" onClick={handleCancel}>
            {t('cancel')}
          </Button>
          <Button disabled={isSubmitting || !isFormChanged} type="submit">
            {isSubmitting ? `${t('saving')}` : `${t('save')}`}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default General;
