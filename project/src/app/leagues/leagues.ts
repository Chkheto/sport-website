import { Component, OnInit } from '@angular/core';
import { AllSportsApiService } from '../allsports-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./leagues.scss'],
})
export class LeaguesComponent implements OnInit {
  leagues: any[] = [];
  countries: any[] = [];
  selectedCountry: string = '';
  loading = false;
  error = '';

  constructor(private api: AllSportsApiService) {}

  ngOnInit() {
    this.loadCountries();
    this.loadLeagues(); 
  }

  loadCountries() {
    this.api.getCountries().subscribe({
      next: (res) => {
        this.countries = res.result || [];
      },
      error: () => {
        this.error = 'Failed to load countries.';
      },
    });
  }

  loadLeagues() {
    this.loading = true;
    this.error = '';

    const countryKey = this.selectedCountry || undefined;

    this.api.getLeagues(countryKey).subscribe({
      next: (res) => {
        this.leagues = res.result || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load leagues.';
        this.loading = false;
      },
    });
  }
}
