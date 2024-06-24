import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loader } from './components/Loader';
import { Routes } from './utils/routes';
import ErrorPage from './pages/ErrorPage';

const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Quizz = lazy(() => import('./pages/Quizz'));

const router = createBrowserRouter(
  [
    {
      path: Routes.Home,
      element: (
        <Suspense fallback={<Loader />}>
          <Home />
        </Suspense>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: Routes.Menu,
      element: (
        <Suspense fallback={<Loader />}>
          <Menu />
        </Suspense>
      ),
    },
    {
      path: Routes.Quizz,
      element: (
        <Suspense fallback={<Loader />}>
          <Quizz />
        </Suspense>
      ),
    },
  ],
  {
    basename: Routes.Base,
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
