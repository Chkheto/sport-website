import { Component, OnInit } from '@angular/core';
import { AllSportsApiService } from '../allsports-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./teams.scss'],
})
export class TeamsComponent implements OnInit {
  leagues: any[] = [];
  teams: any[] = [];
  allTeams: any[] = [];
  loading = false;
  error = '';
  selectedLeagueId: string = '';
  searchTerm: string = '';

  constructor(private api: AllSportsApiService) {}

  ngOnInit() {
    this.loadLeagues();
  }

  loadLeagues() {
    this.loading = true;
    const countryIds = ['', '1'];
    const leagueObservables = countryIds.map((cid) =>
      this.api.getLeagues(cid)
    );

    forkJoin(leagueObservables).subscribe({
      next: (results) => {
        this.leagues = [];
        results.forEach((res: any) => {
          if (res.result) this.leagues.push(...res.result);
        });
        this.getTeams();
      },
      error: () => {
        this.error = 'Failed to load leagues.';
        this.loading = false;
      },
    });
  }

  getTeams() {
    this.loading = true;
    this.error = '';

    if (this.selectedLeagueId) {
      this.api.getTeams(this.selectedLeagueId).subscribe({
        next: (res) => {
          this.allTeams = res.result || [];
          this.filterTeams();
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load teams for this league.';
          this.loading = false;
        },
      });
    } else {
      const teamObservables = this.leagues.map((l) =>
        this.api.getTeams(l.league_key)
      );

      forkJoin(teamObservables).subscribe({
        next: (results) => {
          this.allTeams = [];
          results.forEach((res: any) => {
            if (res.result) this.allTeams.push(...res.result);
          });
          this.filterTeams();
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load teams.';
          this.loading = false;
        },
      });
    }
  }

  filterTeams() {
    if (!this.searchTerm) {
      this.teams = this.allTeams;
      return;
    }
    const term = this.searchTerm.toLowerCase().trim();
    this.teams = this.allTeams.filter((team) =>
      team.team_name?.toLowerCase().includes(term)
    );
  }
}
