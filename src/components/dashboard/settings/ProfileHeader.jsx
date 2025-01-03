import { useEffect, useRef } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

function ProfileHeader({
  imageSrc,
  setImageSrc,
  imageSelected,
  setImageSelected,
  setIsFormChanged,
}) {
  const { userData } = useAppContext();

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userData?.photoURL) {
      setImageSrc(userData.photoURL);
    }
  }, [userData]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImageSrc(fileReader.result);
        setImageSelected(true);
      };
      fileReader.readAsDataURL(file);
    }
    setIsFormChanged(true);
  };

  const handleRemoveImage = () => {
    setImageSrc(null);
    setImageSelected(false);
    setIsFormChanged(false);
  };

  return (
    <header className="bg-muted p-5 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <div className="relative w-28 h-28">
          <img
            src={
              imageSrc
                ? imageSrc
                : 'https://firebasestorage.googleapis.com/v0/b/wedding-invitation-58993.appspot.com/o/user_photos%2Funknown.jpg?alt=media&token=e95bc7b0-01b1-4254-b321-e4ee39d1eb55'
            }
            alt="Editable avatar"
            className="w-full h-full object-cover rounded-lg cursor-pointer"
            onClick={handleImageClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            onChange={handleFileChange}
            multiple={false}
          />
          {imageSelected && (
            <button
              onClick={handleRemoveImage}
              className="absolute -top-1.5 -right-1.5 z-10 p-1 bg-white rounded-full text-red-500"
            >
              <Trash className="w-4 h-4" />
            </button>
          )}
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
            onClick={handleImageClick}
          >
            <Pencil className="w-6 h-6 text-white" />
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">
            {userData?.isOpenToWork ? '#OpenToWork' : '#NotOpenToWork'}
          </p>
          <span className="flex items-center gap-1.5">
            <h3 className="text-lg font-semibold">
              {userData?.displayName ? userData.displayName : 'John Doe'}
              {userData?.pronoun && `, ${userData.pronoun}`}
            </h3>
            <svg
              title="Verified"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-primary cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <p className="text-sm">
            {userData?.profession ? userData.profession : 'Frontend Developer'}
            {userData?.location && ` in ${userData.location}`}
          </p>
        </div>
      </div>
    </header>
  );
}

export default ProfileHeader;
