export const Routes = {
  Home: '/',
  Menu: '/menu',
  Quiz: '/quiz',
  Base: '/amgen/',
} as const;

export type RoutesType = (typeof Routes)[keyof typeof Routes];
