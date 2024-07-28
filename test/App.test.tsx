import { describe, it, expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Routes } from '../src/utils/routes';
import { Layout } from '../src/components/Layout';
import Home from '../src/pages/Home';
import Menu from '../src/pages/Menu';
import Quiz from '../src/pages/Quiz';
import ErrorPage from '../src/pages/ErrorPage';

const renderWithRouter = (initialEntries: string[]) => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <Layout />,
        children: [
          { path: Routes.Home, element: <Home /> },
          { path: Routes.Menu, element: <Menu /> },
          { path: Routes.Quiz, element: <Quiz /> },
        ],
        errorElement: <ErrorPage />,
      },
    ],
    { initialEntries }
  );

  return render(<RouterProvider router={router} />);
};

describe('App Routing', () => {
  it.each([
    [Routes.Home, 'data-testid="mountain-background"', 'data-testid="logo"', 'data-testid="explore-button"'],
    [
      Routes.Menu,
      'À vous de jouer !',
      'Répondez à un maximum de questions en 3 minutes !',
      'Choisissez votre pool de questions.',
    ],
    [Routes.Quiz, 'data-testid="header"', 'data-testid="mountain-animation"', 'data-testid="timer"'],
  ])('should render correct component for %s route', (route, ...expectedElements) => {
    renderWithRouter([route]);
    for (const element of expectedElements) {
      if (element.startsWith('data-testid')) {
        expect(screen.getByTestId(element.split('"')[1])).toBeInTheDocument();
      } else {
        expect(screen.getByText(element, { exact: false })).toBeInTheDocument();
      }
    }
  });

  it('should render all mountains buttonson Menu page', () => {
    renderWithRouter([Routes.Menu]);
    for (let i = 0; i < 6; i++) {
      expect(screen.getByTestId(`mountain-${i}`)).toBeInTheDocument();
    }
  });

  it('should render ErrorPage component on non-existent route', () => {
    const route = '/404';
    renderWithRouter([route]);
    expect(screen.getByText('Erreur 404')).toBeInTheDocument();
    expect(screen.getByText("La page que vous cherchez n'existe pas")).toBeInTheDocument();
    expect(screen.getByText("Retourner à l'accueil")).toBeInTheDocument();
  });
});
