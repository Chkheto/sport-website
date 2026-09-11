import { Component, OnInit } from '@angular/core';
import { AllSportsApiService } from '../allsports-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-livescore',
  templateUrl: './livescore.html',
  styleUrls: ['./livescore.scss'],
  imports: [CommonModule],
})
export class LivescoreComponent implements OnInit {
  livescores: any[] = [];
  loading = true;
  error = '';

  constructor(private api: AllSportsApiService) {}

  ngOnInit() {
    this.api.getLivescore().subscribe({
      next: (res) => {
        this.livescores = res.result || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load livescores.';
        this.loading = false;
      },
    });
  }
}
