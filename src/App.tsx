import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loader } from './components/Loader';
import ErrorPage from './pages/ErrorPage';

const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <Suspense fallback={<Loader />}>
          <Home />
        </Suspense>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/menu',
      element: (
        <Suspense fallback={<Loader />}>
          <Menu />
        </Suspense>
      ),
    },
  ],
  {
    basename: '/amgen',
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
