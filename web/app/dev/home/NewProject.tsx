import { createGroup } from '@/hooks/groups';
import { Icons } from '@/models/icons';
import Loading from '@components/common/Loading';
import TextField from '@components/common/TextField';
import { useUser } from '@context/UserContext';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const NewProject = ({
  showNewProject,
}: {
  showNewProject: Dispatch<SetStateAction<boolean>>;
}) => {
  const { fbuser } = useUser();
  const modalRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [colorText, setColorText] = useState('#ffffff');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreate = () => {
    setLoading(true);
  };

  const handleTitle = (val: string) => {
    setTitle(val);
  };
  const handleDescription = (val: string) => {
    setDescription(val);
  };
  const handleColor = (val: string) => {
    setColor(val);
    setColorText(color);
  };
  const handleTextColor = (val: string) => {
    val = ('#' + val.replaceAll('#', '')).slice(0, 7);
    setColorText(val);
    if (val.length === 7) {
      setColor(val);
    }
  };

  return (
    <div
      ref={modalRef}
      className="absolute top-0 bottom-0 left-0 right-0 mx-0 my-0 p-10 flex flex-row items-center justify-center z-40 bg-gradient-radial from-black to-transparent to-80%">
      <div
        className="p-5 bg-[#22222253] backdrop-blur-xl relative z-40 animated animatedFadeInUp fadeInUp rounded-xl border-[#373737] border-2 overflow-hidden transition-all duration-500 ease-in-out"
        style={{ backgroundColor: `${color}0d` }}>
        {loading ? (
          <div className=" w-72 h-72 relative">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex flex-row justify-between items-center bg-[#c1c1c115] rounded-full">
              <h1 className="text-2xl font-normal whitespace-nowrap ml-3 mr-10 text-gray-300">
                New Project
              </h1>
              <div className="rounded-full p-3 bg-[#c1c1c12a]">
                <Icons.LightBulb className="text-2xl text-[#C1C1C1]" />
              </div>
            </div>
            <div className="mt-4 flex flex-col items-center justify-center">
              <TextField
                label="Title"
                setValue={handleTitle}
                name="title"
                type="text"
                className="mt-3 bg-gray-800 text-gray-300 w-80"
                errSwitch={true}
              />
              <TextField
                label="Description"
                setValue={handleDescription}
                type="text"
                className="mt-3 bg-gray-800 text-gray-300 w-80"
                errSwitch={true}
              />
              <div className="mt-4 flex flex-col items-center justify-center">
                <div
                  className={`text-lg rounded-lg py-1 px-4 flex flex-row gap-3 items-center`}
                  style={{ backgroundColor: `${color}4d` }}>
                  Color Theme
                  <input
                    onChange={(event) => handleTextColor(event.target.value)}
                    className={`text-lg rounded-full w-32 text-center bg-transparent focus:outline-none`}
                    value={colorText}
                  />
                </div>
                <HexColorPicker
                  className="mt-5"
                  color={color}
                  onChange={handleColor}
                />
              </div>
            </div>

            <div className="mt-5 flex flex-row gap-4">
              <button
                onClick={() => showNewProject(false)}
                className="px-4 py-2 border-gray-600 border-2 flex flex-row rounded-lg bg-gray-800  text-white hover:bg-gray-500 hover:text-gray-200">
                <div>Cancel</div>
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 border-gray-600 border-2 flex flex-row rounded-lg bg-gray-300 text-black hover:bg-black hover:text-white">
                <Icons.Plus className="text-2xl" />
                <div>Create</div>
              </button>
            </div>
          </div>
        )}

        <div
          className="absolute -top-6 -left-6 w-36 h-36 opacity-20 filter blur-[70px] rounded-full"
          style={{ backgroundColor: `${color}` }}
        />
      </div>

      <div
        onClick={() => showNewProject(false)}
        className="absolute w-full h-full"></div>
    </div>
  );
};

export default NewProject;
