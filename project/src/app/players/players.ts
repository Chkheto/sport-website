import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AllSportsApiService } from '../allsports-api.service';
import { Player, Team } from './interfaces';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './players.html',
  styleUrls: ['./players.scss'],
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];
  loading = false;
  error = '';

  constructor(private api: AllSportsApiService) {}

  ngOnInit() {
    this.loadAllPlayers();
  }

  loadAllPlayers() {
    this.loading = true;
    this.error = '';

    const countryIds = ['', '1'];

    const leagueObservables = countryIds.map((cid) => this.api.getLeagues(cid));

    forkJoin(leagueObservables).subscribe({
      next: (leaguesResults: any[]) => {
        const allLeagues: any[] = [];
        leaguesResults.forEach((res: any) => {
          if (res.result) allLeagues.push(...res.result);
        });

        const teamObservables = allLeagues.map((l) => this.api.getTeams(l.league_key));

        forkJoin(teamObservables).subscribe({
          next: (teamsResults: any[]) => {
            const allTeams: Team[] = teamsResults.flatMap((res: any) => res.result || []);

            const playerObservables = allTeams.map((t) =>
              this.api.getPlayers(undefined, t.team_key).pipe(
                catchError(() => of({ result: [] })) 
              )
            );

            forkJoin(playerObservables).subscribe({
              next: (playersResults: any[]) => {
                this.players = playersResults.flatMap((res: any) => res.result || []);
                this.loading = false;
              },
              error: () => {
                this.error = 'Failed to load players.';
                this.loading = false;
              },
            });
          },
          error: () => {
            this.error = 'Failed to load teams.';
            this.loading = false;
          },
        });
      },
      error: () => {
        this.error = 'Failed to load leagues.';
        this.loading = false;
      },
    });
  }
}
