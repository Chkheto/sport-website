import { Component, OnInit } from '@angular/core';
import { AllSportsApiService } from '../allsports-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-odds',
  templateUrl: './odds.html',
  styleUrls: ['./odds.scss'],
  imports: [CommonModule, FormsModule],
})
export class OddsComponent implements OnInit {
  odds: any = null;
  loading = true;
  error = '';

  constructor(private api: AllSportsApiService) {}

  ngOnInit(): void {
    this.api.getOdds().subscribe({
      next: (res) => {
        if (typeof res.result === 'string') {
          this.error = res.result;
          this.odds = null;
        } else {
          this.odds = res.result;
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load odds.';
        this.loading = false;
      },
    });
  }
}
