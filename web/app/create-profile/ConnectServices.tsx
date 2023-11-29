import { Icons } from '@/models/icons';
import { StepProps } from './page';
import Stepper from '@components/common/Stepper';
import TextField from '@components/common/TextField';
import { Dispatch, SetStateAction, useState } from 'react';

export default function ConnectServices({
  onNext,
  onBack,
  setGithubPar,
  setLinkedinPar,
}: StepProps & {
  setGithubPar: Dispatch<SetStateAction<string>>;
  setLinkedinPar: Dispatch<SetStateAction<string>>;
}) {
  const [github, setGitHub] = useState('');
  const [linkedin, setLinkedIn] = useState('');
  const [githubErr, setGitHubErr] = useState('');
  const [linkedinErr, setLinkedinErr] = useState('');

  const skipStep = () => {
    setGitHub('');
    setGitHubErr('');
    setLinkedIn('');
    setLinkedinErr('');
    onNext && onNext();
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

    setGithubPar(github);
    setLinkedinPar(linkedin);

    onNext && onNext();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold text-gray-300">Expand Your Reach</h1>
      <h1 className="text-md w-[40%] text-gray-500 text-center mt-3">
        Connect your profile with other platforms or services to showcase a more
        comprehensive view of your professional self.
      </h1>
      <div className="flex flex-row items-center mt-2 bg-gray-800 rounded-lg border-2 border-[#525252]">
        <div className="h-14 w-14 flex flex-row items-center bg-gray-800 justify-center rounded-lg">
          <Icons.GitHub className="text-2xl text-gray-300" />
        </div>
        <TextField
          label="GitHub Handle"
          setValue={handleGitHubChange}
          type="text"
          className="bg-gray-800 text-gray-300 border-none rounded-l-none w-64"
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
          className="bg-gray-800 text-gray-300 border-none rounded-l-none w-64"
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
