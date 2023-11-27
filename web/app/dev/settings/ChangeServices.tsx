import { Icons } from '@/models/icons';
import { StepProps } from './page';
import Stepper from '@components/common/Stepper';
import TextField from '@components/common/TextField';
import { Dispatch, SetStateAction, useState } from 'react';
import { useFBUser } from '@context/FBUserContext';
import { useDLUser } from '@context/DLUserContext';

export default function ConnectServices({
  onFinish,
  onBack,
  setPhonePar,
  setGithubPar,
  setLinkedinPar,
}: StepProps & {
  setPhonePar: Dispatch<SetStateAction<string>>;
  setGithubPar: Dispatch<SetStateAction<string>>;
  setLinkedinPar: Dispatch<SetStateAction<string>>;
}) {
  const { fbuser } = useFBUser();
  const { user } = useDLUser();
  const [phone, setPhone] = useState('');
  const [github, setGitHub] = useState(user?.github ?? '');
  const [linkedin, setLinkedIn] = useState('');
  const [phoneErr, setPhoneErr] = useState('');
  const [githubErr, setGitHubErr] = useState('');
  const [linkedinErr, setLinkedinErr] = useState('');

  const skipStep = () => {
    setPhone('');
    setPhoneErr('');
    setGitHub('');
    setGitHubErr('');
    setLinkedIn('');
    setLinkedinErr('');
    onFinish && onFinish();
  };

  const handlePhoneChange = (number: string) => {
    const cleaned = ('' + number).replace(/\D/g, '');
    const formatted = () => {
      const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
      if (!match) return phone;

      return match[1]
        ? `(${match[1]}` +
            (match[2] ? `) ${match[2]}` + (match[3] ? `-${match[3]}` : '') : '')
        : '';
    };
    setPhone(formatted);
    setPhoneErr('');
  };

  const handleGitHubChange = (val: string) => {
    const cleaned = val.replaceAll(' ', '').replaceAll('@', '');
    setGitHub((cleaned.length > 0 ? '@' : '') + cleaned);
    setGitHubErr('');
  };
  const handleLinkedInChange = (val: string) => {
    setLinkedinErr('');
    setLinkedIn(val);
  };

  const onSubmit = () => {
    var allgood = true;
    const isValidPhoneNumber = () => {
      const cleaned = phone.replace(/\D/g, '');
      const phonePattern = /^\d{10}$/;
      return phonePattern.test(cleaned);
    };
    if (!isValidPhoneNumber()) {
      allgood = false;
      setPhoneErr('Enter valid phone');
    }

    if (!github) {
      setGitHubErr('Required');
      allgood = false;
    }

    const isLinkedInProfileUrl = () => {
      const linkedInUrlPattern = /linkedin\.com\/(in|company)\/[\w-]+/i;
      return linkedInUrlPattern.test(linkedin);
    };
    if (!isLinkedInProfileUrl()) {
      allgood = false;
      setLinkedinErr('Enter valid linkedin URL');
    }
    if (!allgood) return;

    setPhonePar(phone);
    setGithubPar(github);
    setLinkedinPar(linkedin);

    onFinish && onFinish();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold text-gray-300">Expand Your Reach</h1>
      <h1 className="text-md w-[40%] text-gray-500 text-center mt-3">
        Connect your profile with other platforms or services to showcase a more
        comprehensive view of your professional self.
      </h1>
      <div className="flex flex-row items-center mt-10 bg-gray-800 rounded-lg border-2 border-[#525252]">
        <div className="h-14 w-14 flex flex-row items-center bg-gray-800 justify-center rounded-lg">
          <Icons.Phone className="text-2xl text-gray-300" />
        </div>
        <TextField
          label="Phone Number"
          setValue={handlePhoneChange}
          type="text"
          className="bg-gray-800 text-gray-300 border-none rounded-l-none"
          value={phone}
          errorMsg={phoneErr}
        />
      </div>
      <div className="flex flex-row items-center mt-2 bg-gray-800 rounded-lg border-2 border-[#525252]">
        <div className="h-14 w-14 flex flex-row items-center bg-gray-800 justify-center rounded-lg">
          <Icons.GitHub className="text-2xl text-gray-300" />
        </div>
        <TextField
          label="GitHub Handle"
          setValue={handleGitHubChange}
          type="text"
          className="bg-gray-800 text-gray-300 border-none rounded-l-none"
          value={github}
          errorMsg={githubErr}
        />
      </div>
      <div className="flex flex-row items-center mt-2 bg-gray-800 rounded-lg border-2 border-[#525252]">
        <div className="h-14 w-14 flex flex-row items-center bg-gray-800 justify-center rounded-lg">
          <Icons.LinkedIn className="text-2xl text-gray-300" />
        </div>
        <TextField
          label="LinkedIn URL"
          setValue={handleLinkedInChange}
          type="text"
          className="bg-gray-800 text-gray-300 border-none rounded-l-none"
          value={linkedin}
          errorMsg={linkedinErr}
        />
      </div>

      {/* <div
        onClick={skipStep}
        className="mt-4 px-5 py-2 rounded-full bg-gray-900 text-gray-200 cursor-pointer hover:bg-gray-700 border-gray-700 border-2">
        Skip for now
      </div> */}
      <Stepper onBack={onBack} onNext={onSubmit} />
    </div>
  );
}
