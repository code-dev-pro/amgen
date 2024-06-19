import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary-dark-blue text-white">
      <h1 className="text-4xl font-bold">Erreur 404</h1>
      <p className="text-xl">La page que vous cherchez n'existe pas</p>
      <p className="text-xl pt-4">
        <Link to="/">Retourner à l'accueil</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
