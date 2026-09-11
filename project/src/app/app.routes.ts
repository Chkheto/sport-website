import { Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { SignIn } from './sign-in/sign-in';
import { Home } from './home/home';
import { Authentication } from './authentication/authentication';
import { guestGuard } from './guest.guard';
import { Games } from './games/games';
import { authGuard } from './auth.guard';
import { TeamsComponent } from './teams/teams';
import { CountriesComponent } from './countries/countries';
import { LeaguesComponent } from './leagues/leagues';
import { FixturesComponent } from './fixtures/fixtures';
import { H2HComponent } from './h2h/h2h';
import { LivescoreComponent } from './livescore/livescore';
import { StandingsComponent } from './standings/standings';
import { OddsComponent } from './odds/odds';
import { PlayersComponent } from './players/players';

export const routes: Routes = [
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },

  { path: 'authentication', component: Authentication, canActivate: [guestGuard] },

  {
    path: 'home',
    component: Home,
  },

  {
    path: 'teams',
    component: TeamsComponent,
    canActivate: [authGuard],
  },

  // {
  //   path: 'players',
  //   component: PlayersComponent,
  //   canActivate: [authGuard]
  // },

  // {
  //   path: 'games',
  //   component: Games,
  //   canActivate: [authGuard],
  // },

  {
    path: 'countries',
    component: CountriesComponent,
    canActivate: [authGuard],
  },

  {
    path: 'leagues',
    component: LeaguesComponent,
    canActivate: [authGuard],
  },

  {
    path: 'fixtures',
    component: FixturesComponent,
    canActivate: [authGuard],
  },

  {
    path: 'h2h',
    component: H2HComponent,
    canActivate: [authGuard],
  },

  {
    path: 'livescore',
    component: LivescoreComponent,
    canActivate: [authGuard],
  },

  {
    path: 'standings',
    component: StandingsComponent,
    canActivate: [authGuard],
  },

  // {
  //   path: 'odds',
  //   component: OddsComponent,
  //   canActivate: [authGuard],
  // },

  {
    path: 'sign-in',
    component: SignIn,
  },

  {
    path: '**',
    component: NotFound,
  },
];
