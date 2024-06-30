import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loader } from './components/Loader';
import { Routes } from './utils/routes';
import { Layout } from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import RedirectWrapper from './components/RedirectWrapper';

const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Quiz = lazy(() => import('./pages/Quiz'));

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: Routes.Home,
          element: (
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: Routes.Menu,
          element: (
            <Suspense fallback={<Loader />}>
              <RedirectWrapper>
                <Menu />
              </RedirectWrapper>
            </Suspense>
          ),
        },
        {
          path: Routes.Quiz,
          element: (
            <Suspense fallback={<Loader />}>
              <RedirectWrapper>
                <Quiz />
              </RedirectWrapper>
            </Suspense>
          ),
        },
      ],
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
