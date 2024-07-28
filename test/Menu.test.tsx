import { act, render, screen } from '@testing-library/react';
import Menu from '../src/pages/Menu';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('Menu', () => {
  it('should updates aspect ratio on window resize', () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    );

    const backgroundElement = screen.getByTestId('mountain-background');
    expect(backgroundElement).toHaveStyle('background-position: center center');

    act(() => {
      window.innerWidth = 1600;
      window.innerHeight = 900;
      window.dispatchEvent(new Event('resize'));
    });

    expect(backgroundElement).toHaveStyle('background-position: center top');
  });

  it('should open popup when click on mail icon', () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    );

    const mailIcon = screen.getByAltText('Mail');
    expect(mailIcon).toBeInTheDocument();

    act(() => {
      mailIcon.click();
    });

    expect(screen.getByTestId('popup')).toBeVisible();
  });

  it('should close popup when click on back button', () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    );

    const backButton = screen.getByTestId('back-button');
    expect(backButton).toBeInTheDocument();

    act(() => {
      backButton.click();
    });

    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
  });
});
