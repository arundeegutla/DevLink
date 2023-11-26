import Image from 'next/image';
import { User, updateEmail, updateProfile } from 'firebase/auth';
import { StepProps } from './page';
import TextField from '@components/common/TextField';
import { useRef, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { fstorage } from '@/firebase/clientApp';
import Stepper from '@components/common/Stepper';
import { useUser } from '@context/UserContext';

export default function InfoStep({ onNext, onBack }: StepProps) {
  const { fbuser } = useUser();

  let displayName = fbuser.displayName ?? '';
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
  const [imageURL, setImageURL] = useState(fbuser.photoURL);
  const [newImageData, setNewImageData] = useState<File>();

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

    onNext && onNext();

    await updateProfile(fbuser, {
      displayName: fname + ' ' + lname,
      photoURL: newImageData
        ? await uploadImage(newImageData, fbuser)
        : imageURL ??
          'https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png',
    });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold text-gray-300">Update Your Profile</h1>
      <h1 className="text-md w-[40%] text-gray-500 text-center mt-3">
        Let&apos;s start by refreshing your photo and basic information.
      </h1>

      <div className="mt-4 flex flex-row items-center">
        <ImageUpload
          setNewImageData={setNewImageData}
          url={
            fbuser.photoURL ??
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
            defaultValue={fname}
          />
          <TextField
            label="Last Name"
            setValue={updateLname}
            name="lname"
            type="lname"
            autoComplete="lname"
            errorMsg={lnameError}
            className="mt-3 bg-gray-800 text-gray-300"
            defaultValue={lname}
            errSwitch={true}
          />
        </div>
      </div>
      <Stepper onNext={submit} onBack={onBack} />
    </div>
  );
}

const ImageUpload = ({
  url,
  setNewImageData,
}: {
  url: string;
  setNewImageData: (file: File) => void;
}) => {
  const [image, setImage] = useState<string>(url);
  const inputFile = useRef<HTMLInputElement | null>(null);

  const onImageClick = () => {
    inputFile.current?.click();
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 1 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setNewImageData(file);
    } else {
      alert('Please choose an image that is less than 1MB.');
    }
  };
  return (
    <div>
      <Image
        width={0}
        height={0}
        className="w-52 aspect-square rounded-full mr-6 object-fill border-2 cursor-pointer hover:border-4 hover:border-gray-100"
        src={image}
        alt="test"
        onClick={onImageClick}
      />
      <input
        type="file"
        accept="image/*"
        id="file"
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
    </div>
  );
};

async function uploadImage(file: File, fbuser: User) {
  const fileRef = ref(fstorage, fbuser.uid + '.png');
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
}
