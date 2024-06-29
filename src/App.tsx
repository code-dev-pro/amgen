import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loader } from './components/Loader';
import { Routes } from './utils/routes';
import ErrorPage from './pages/ErrorPage';
import Wrapper from './components/Wrapper';

const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Quiz = lazy(() => import('./pages/Quiz'));

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
          <Wrapper>
            <Menu />
          </Wrapper>
        </Suspense>
      ),
    },
    {
      path: Routes.Quiz,
      element: (
        <Suspense fallback={<Loader />}>
          <Wrapper>
            <Quiz />
          </Wrapper>
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
