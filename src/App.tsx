import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { ErrorPage } from './pages/ErrorPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/menu',
      element: <Menu />,
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
