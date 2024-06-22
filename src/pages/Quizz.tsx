import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { useQuizzTitleStore } from '../hooks/useQuizzTitleStore';

import backgroundMenu from '../assets/images/fond_quizz.jpg';
import logo from '../assets/images/logo.svg';
import homeIcon from '../assets/images/icon_home_off.svg';
import { Timer } from '../components/Timer';
import { ValidateButton } from '../components/buttons/ValidateButton';
import { LearnMoreButton } from '../components/buttons/LearnMoreButton';
import { CustomCheckbox } from '../components/Checkbox';
import { QuizzCompletion } from '../components/QuizzCompletion';
import { useState } from 'react';

const Quizz = () => {
  const { quizzTitle, quizzCategory } = useQuizzTitleStore();
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleTimerComplete = () => {
    setQuizCompleted(true);
  };

  return (
    <div
      className="relative min-h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundMenu})` }}
    >
      <div className="w-full px-8 py-4">
        <img src={logo} alt="Logo" width={130} height={51} className="absolute top-8 left-8" />

        <div className="text-white text-center uppercase">
          <p className="font-almaq text-3xl">Mont</p>
          <p className="font-white-on-black text-accent-blue text-4xl">{quizzTitle}</p>

          {quizzCategory !== '' && <p className="font-light">{quizzCategory}</p>}
        </div>
        <Link to="/">
          <img src={homeIcon} alt="Accueil" width={26} height={26} className="absolute top-8 right-8" />
        </Link>
      </div>

      <div className="flex justify-center items-center px-8 mt-4">
        <Timer onComplete={handleTimerComplete} />
      </div>

      {quizCompleted ? (
        <QuizzCompletion />
      ) : (
        <div className="absolute top-[33%] left-0 w-full px-8">
          <div className="bg-accent-blue bg-opacity-25 px-10 py-6">
            <p className="text-3xl">Ceci est une question ?</p>

            <ul className="text-lg pl-8 mt-4 space-y-4">
              <li className="flex items-center space-x-2">
                <CustomCheckbox
                  id="checkbox1"
                  label="Question 1"
                  checked={false}
                  onChange={() => console.log('Checkbox 1 toggled')}
                  size="sm"
                  fontSize="text-lg"
                  shape="square"
                  selectedColor="blue"
                  borderColor="white"
                />
              </li>
              <li className="flex items-center space-x-2">
                <CustomCheckbox
                  id="checkbox2"
                  label="Question 2"
                  checked={false}
                  onChange={() => console.log('Checkbox 2 toggled')}
                  size="sm"
                  fontSize="text-lg"
                  shape="square"
                  selectedColor="blue"
                  borderColor="white"
                />
              </li>
              <li className="flex items-center space-x-2">
                <CustomCheckbox
                  id="checkbox3"
                  label="Question 3"
                  checked={false}
                  onChange={() => console.log('Checkbox 3 toggled')}
                  size="sm"
                  fontSize="text-lg"
                  shape="square"
                  selectedColor="blue"
                  borderColor="white"
                />
              </li>
              <li className="flex items-center space-x-2">
                <CustomCheckbox
                  id="checkbox4"
                  label="Question 4"
                  checked={true}
                  onChange={() => console.log('Checkbox 4 toggled')}
                  size="sm"
                  fontSize="text-lg"
                  shape="square"
                  selectedColor="blue"
                  borderColor="white"
                />
              </li>
            </ul>
          </div>

          <div className="text-center mt-6">
            <LearnMoreButton />
          </div>
          <div className="text-center mt-6">
            <ValidateButton fontSize="text-4xl" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Quizz;
