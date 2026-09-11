import { Component, OnInit } from '@angular/core';
import { AllSportsApiService } from '../allsports-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.html',
  styleUrls: ['./standings.scss'],
  imports: [CommonModule],
})
export class StandingsComponent implements OnInit {
  standings: any[] = [];
  loading = true;
  error = '';

  constructor(private api: AllSportsApiService) {}

  ngOnInit() {

    this.api.getLeagues().subscribe({
      next: (res: any) => {
        console.log(res);
        const firstLeagueId = res.result[0]?.league_key;
        if (!firstLeagueId) {
          this.error = 'No leagues available';
          this.loading = false;
          return;
        }

        this.api.getStandings(firstLeagueId).subscribe({
          next: (res: any) => {
            this.standings = res.result?.total || [];
            this.loading = false;
          },
          error: () => {
            this.error = 'Failed to load standings.';
            this.loading = false;
          },
        });
      },
      error: () => {
        this.error = 'Failed to load leagues.';
        this.loading = false;
      }
    });
  }
}
