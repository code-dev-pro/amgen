import { HomeButton } from './buttons/HomeButton';
import { useQuizStore } from '../stores/quizStore';

import logo from '../assets/images/logo.svg';
import leftMountain from '../assets/images/montagne_autres.png';
import rightMountain from '../assets/images/montagne-seule.png';

export const Header = () => {
  const { quizTitle, quizCategory } = useQuizStore();
  return (
    <div className="w-full px-8 py-4">
      <img src={logo} alt="Logo" width={130} height={51} className="absolute top-8 left-8" />
      <img src={leftMountain} alt="background" className="absolute top-0 -left-[70px] w-[900px] h-auto" />
      <img src={rightMountain} alt="background" className="absolute top-0 right-0 w-[410px] h-auto" />

      <div className="text-white text-center uppercase">
        <p className="font-almaq text-3xl">Mont</p>
        <p className="font-white-on-black text-accent-blue text-4xl">{quizTitle}</p>

        {quizCategory !== '' && <p className="font-light">{quizCategory}</p>}
      </div>

      <HomeButton className="absolute top-8 right-8 z-10" />
    </div>
  );
};
