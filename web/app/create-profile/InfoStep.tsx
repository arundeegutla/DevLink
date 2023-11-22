import Image from 'next/image';
import { User, updateEmail, updateProfile } from 'firebase/auth';
import { StepProps } from './page';
import { Icons } from '../models/icons';
import Stepper from './Stepper';
import TextField from '@components/common/TextField';
import { useState } from 'react';

export default function InfoStep({
  onNext,
  onBack,
  curUser,
}: StepProps & { curUser: User }) {
  let displayName = curUser.displayName ?? '';
  const nameArray = displayName.split(' ');
  let firstName = '';
  let lastName = '';
  if (nameArray.length === 1) {
    firstName = nameArray[0];
  } else if (nameArray.length >= 2) {
    firstName = nameArray.shift() ?? '';
    lastName = nameArray.join(' ') ?? '';
  }

  const [fname, setFName] = useState(firstName);
  const [fnameError, setFnameError] = useState('');
  const [lname, setLName] = useState(lastName);
  const [lnameError, setLnameError] = useState('');
  const [imageURL, setImageURL] = useState(curUser.photoURL);

  const updateFname = (val: string) => {
    setFName(val);
    setFnameError('');
  };
  const updateLname = (val: string) => {
    setLName(val);
    setLnameError('');
  };

  const submit = async () => {
    var allgood = true;
    if (!fname) {
      setFnameError('Required');
      allgood = false;
    }
    if (!lname) {
      setLnameError('Required');
      allgood = false;
    }
    if (!allgood) return;

    await updateProfile(curUser, {
      displayName: fname + ' ' + lname,
      photoURL:
        imageURL ??
        'https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png',
    });

    onNext && onNext();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold text-gray-300">Introduce Yourself</h1>
      <h1 className="text-md w-[40%] text-gray-500 text-center mt-3">
        Tell us who you are and add a profile picture to personalize your
        profile
      </h1>

      <div className="mt-4 flex flex-row items-center">
        <ImageUpload
          url={
            curUser.photoURL ??
            'https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png'
          }
        />

        <div className="flex flex-col w-64">
          <TextField
            label="Name"
            setValue={updateFname}
            name="fname"
            type="fname"
            autoComplete="fname"
            errorMsg={fnameError}
            className="mt-3 bg-gray-800 text-gray-300"
            errSwitch={true}
            val={fname}
          />
          <TextField
            label="Last Name"
            setValue={updateLname}
            name="lname"
            type="lname"
            autoComplete="lname"
            errorMsg={lnameError}
            className="mt-3 bg-gray-800 text-gray-300"
            val={lname}
            errSwitch={true}
          />
        </div>
      </div>
      <Stepper onNext={submit} onBack={onBack} />
    </div>
  );
}

const ImageUpload = ({ url }: { url: string }) => {
  const [image, setImage] = useState<string>(url);

  const handleImageChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please choose an image that is less than 10MB.');
    }
  };

  return (
    <div>
      <div className="overflow-hidden w-44 aspect-square rounded-full mr-6">
        <Image
          width={0}
          height={0}
          className="object-contain w-full h-full"
          src={image}
          alt="test"
        />
      </div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};
