import { Component } from '@angular/core';
import { AllSportsApiService } from '../allsports-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-h2h',
  templateUrl: './h2h.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./h2h.scss'],
})
export class H2HComponent {
  firstTeamId: string = '';
  secondTeamId: string = '';
  result: any = null;
  loading = false;
  error = '';

  constructor(private api: AllSportsApiService) {}

  getH2H() {
    if (!this.firstTeamId || !this.secondTeamId) return;
    this.loading = true;
    this.api.getH2H(this.firstTeamId, this.secondTeamId).subscribe({
      next: (res) => {
        this.result = res.result || null;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load H2H.';
        this.loading = false;
      },
    });
  }
}
