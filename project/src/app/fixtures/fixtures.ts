import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AllSportsApiService } from '../allsports-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.html',
  styleUrls: ['./fixtures.scss'],
  imports: [CommonModule, FormsModule],
})
export class FixturesComponent implements OnInit {
  fixtures: any[] = [];
  loading = true;
  error = '';
  from: string = '';
  to: string = '';

  constructor(
    private api: AllSportsApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const today = new Date();
    this.from = this.to = today.toISOString().slice(0, 10);
    this.loadFixtures();
  }

  loadFixtures() {
    this.loading = true;
    this.api.getFixtures(this.from, this.to).subscribe({
      next: (res) => {
        this.fixtures = res.result || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load fixtures.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
