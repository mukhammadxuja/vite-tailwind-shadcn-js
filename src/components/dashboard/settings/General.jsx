import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAppContext } from '@/context/AppContext';
import { auth, db } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  SelectContent,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function General() {
  const { userData, setUserData } = useAppContext();

  // Memoizing defaultValues to avoid unnecessary re-renders
  const defaultValues = useMemo(() => {
    return {
      displayName: userData?.displayName || '',
      profession: userData?.profession || '',
      location: userData?.location || '',
      pronoun: userData?.pronoun || '',
      isOpenToWork: userData?.isOpenToWork || false,
    };
  }, [userData]);

  const {
    control,
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm({
    defaultValues,
  });

  const [isFormChanged, setIsFormChanged] = useState(false);

  const onSubmit = async (data) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await setDoc(doc(db, 'users', currentUser.uid), {
          displayName: data.displayName,
          profession: data.profession,
          location: data.location,
          pronoun: data.pronoun,
          isOpenToWork: data.isOpenToWork,
        });
        setUserData(data);
        toast('Profile updated successfully');
      }
    } catch (err) {
      setError('submit', { message: err.message }); // Correct error handling
    }
  };

  const handleCancel = () => {
    reset(defaultValues); // Reset form to original data
    setIsFormChanged(false); // Set the form change flag to false
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Display Name */}
      <div className="flex flex-col items-start space-y-2">
        <Label required>Display Name</Label>
        <Input
          {...register('displayName', { required: 'Display Name is required' })}
          placeholder="John Doe"
          onChange={() => setIsFormChanged(true)} // Detect change
        />
        {errors.displayName && <p>{errors.displayName.message}</p>}
      </div>

      {/* Profession */}
      <div className="flex flex-col items-start space-y-2">
        <Label required>Profession</Label>
        <Input
          {...register('profession', { required: 'Profession is required' })}
          placeholder="Frontend Developer"
          onChange={() => setIsFormChanged(true)} // Detect change
        />
        {errors.profession && <p>{errors.profession.message}</p>}
      </div>

      {/* Location */}
      <div className="flex flex-col items-start space-y-2">
        <Label optional>Location</Label>
        <Input
          {...register('location')}
          placeholder="San Francisco, USA"
          onChange={() => setIsFormChanged(true)} // Detect change
        />
      </div>

      <div className="space-y-1 w-full">
        <Label optional htmlFor="pronoun">
          Pronoun
        </Label>
        <Controller
          name="pronoun"
          control={control}
          render={({ field }) => (
            <Select
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
                <SelectItem value="He/Him">He/Him</SelectItem>
                <SelectItem value="She/Her">She/Her</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <p className="text-xs text-red-500">{errors.pronoun?.message}</p>
      </div>

      {/* Open to Work Switch */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Controller
            name="isOpenToWork"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Switch
                checked={value}
                onCheckedChange={() => {
                  onChange(!value);
                  setIsFormChanged(true);
                }}
                id="isOpenToWork"
              />
            )}
          />
          <Label htmlFor="isOpenToWork">Open to work</Label>
        </div>

        <div className="flex items-center gap-2">
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={isSubmitting || !isFormChanged} type="submit">
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default General;
