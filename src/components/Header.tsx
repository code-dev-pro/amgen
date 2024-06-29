import { useQuizTitleStore } from '../hooks/useQuizTitleStore';
import { HomeButton } from './buttons/HomeButton';

import logo from '../assets/images/logo.svg';

export const Header = () => {
  const { quizTitle, quizCategory } = useQuizTitleStore();
  return (
    <div className="w-full px-8 py-4">
      <img src={logo} alt="Logo" width={130} height={51} className="absolute top-8 left-8" />

      <div className="text-white text-center uppercase">
        <p className="font-almaq text-3xl">Mont</p>
        <p className="font-white-on-black text-accent-blue text-4xl">{quizTitle}</p>

        {quizCategory !== '' && <p className="font-light">{quizCategory}</p>}
      </div>

      <HomeButton className="absolute top-8 right-8" />
    </div>
  );
};
