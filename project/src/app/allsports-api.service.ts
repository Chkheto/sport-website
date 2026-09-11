import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AllSportsApiService {
  private readonly baseUrl = 'https://apiv2.allsportsapi.com/basketball/';
  private readonly apiKey = '6589fc2335cb965912fb038b8e29a24eb6f88454674b013218f8684d2e8a510e';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get(`${this.baseUrl}?met=Countries&APIkey=${this.apiKey}`);
  }

  getLeagues(countryId?: string): Observable<any> {
    let url = `${this.baseUrl}?met=Leagues&APIkey=${this.apiKey}`;
    if (countryId) url += `&countryId=${countryId}`;
    return this.http.get(url);
  }

  getFixtures(from: string, to: string, countryId?: string, leagueId?: string): Observable<any> {
    let url = `${this.baseUrl}?met=Fixtures&APIkey=${this.apiKey}&from=${from}&to=${to}`;
    if (countryId) url += `&countryId=${countryId}`;
    if (leagueId) url += `&leagueId=${leagueId}`;
    return this.http.get(url);
  }

  getH2H(firstTeamId: string, secondTeamId: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}?met=H2H&APIkey=${this.apiKey}&firstTeamId=${firstTeamId}&secondTeamId=${secondTeamId}`,
    );
  }

  getLivescore(countryId?: string, leagueId?: string, matchId?: string): Observable<any> {
    let url = `${this.baseUrl}?met=Livescore&APIkey=${this.apiKey}`;
    if (countryId) url += `&countryId=${countryId}`;
    if (leagueId) url += `&leagueId=${leagueId}`;
    if (matchId) url += `&matchId=${matchId}`;
    return this.http.get(url);
  }

  getStandings(leagueId?: string): Observable<any> {
    let url = `${this.baseUrl}?met=Standings&APIkey=${this.apiKey}`;
    if (leagueId) {
      url += `&leagueId=${leagueId}`;
    }
    return this.http.get(url);
  }

  getTeams(leagueId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?met=Teams&APIkey=${this.apiKey}&leagueId=${leagueId}`);
  }

  getOdds(matchId?: string): Observable<any> {
    let url = `${this.baseUrl}?met=Odds&APIkey=${this.apiKey}`;

    if (matchId) {
      url += `&matchId=${matchId}`;
    }

    return this.http.get(url);
  }
  getPlayers(leagueId?: string, teamId?: string): Observable<any> {
    let url = `${this.baseUrl}?met=Players&APIkey=${this.apiKey}`;
    if (leagueId) url += `&leagueId=${leagueId}`;
    if (teamId) url += `&teamId=${teamId}`;
    return this.http.get(url);
  }
}
