import backgroundMenu from '../assets/images/fond_menu.jpg';
import logo from '../assets/images/logo.svg';
import homeIcon from '../assets/images/icon_home_off.svg';
import mailIcon from '../assets/images/icon_mail_off.svg';
import DOMPurify from 'dompurify';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';

const data = [
  {
    title: 'Cardio-<br />Métabolisme',
    link: '/cardio',
  },
  {
    title: "Histoire<br />d'Amgen",
    link: '/amgen',
  },
  {
    title: "Fondation<br />d'Amgen",
    link: '/fondation',
  },
  {
    title: 'Recherche &<br />Développement',
    link: '/recherche',
  },
  {
    title: "Expertise<br />d'Amgen",
    link: '/expertise',
  },
  {
    title: 'Exploration<br />surprise',
    link: '/exploration',
  },
];

export const Menu = () => {
  const mountainStyles = [
    { top: '250px', left: '30px' },
    { top: '250px', left: '250px' },
    { top: '250px', left: '400px' },
    { top: '250px', left: '600px' },
    { top: '250px', left: '820px' },
    { top: '250px', left: '1020px' },
  ];

  const sanitizeHtml = (html: string) => ({
    __html: DOMPurify.sanitize(html),
  });

  return (
    <div
      className="relative min-h-screen w-screen"
      style={{ backgroundImage: `url(${backgroundMenu})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="w-full flex items-end space-x-10 p-8">
        <img src={logo} alt="Logo" width={241} height={90} />
        <div className="text-white font-notoSans text-xl">
          <p className="font-extrabold text-3xl text-accent-blue">À vous de jouer !</p>
          <p>Répondez à un maximum de questions en 3 minutes !</p>
          <p>Choisissez votre pool de questions.</p>
        </div>
      </div>
      <div className="absolute top-8 right-8 flex items-center space-x-8">
        <img src={mailIcon} alt="Mail" width={26} height={26} className="cursor-pointer" />

        <Link to="/">
          <img src={homeIcon} alt="Accueil" width={26} height={26} />
        </Link>
      </div>

      {data.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className="text-accent-blue font-white-on-black text-2xl block mb-4 whitespace-nowrap text-center"
          style={{
            position: 'absolute',
            top: mountainStyles[index].top,
            left: mountainStyles[index].left,
          }}
          dangerouslySetInnerHTML={sanitizeHtml(
            `<span class="text-white font-almaq text-lg uppercase">Mont</span> <br />${item.title}`
          )}
        />
      ))}

      <Footer />
    </div>
  );
};
