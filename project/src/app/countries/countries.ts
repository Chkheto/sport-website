import { Component, OnInit } from '@angular/core';
import { AllSportsApiService } from '../allsports-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.html',
  styleUrls: ['./countries.scss'],
  imports: [CommonModule],
})
export class CountriesComponent implements OnInit {
  countries: any[] = [];
  loading = true;
  error = '';

  constructor(private api: AllSportsApiService) {}

  ngOnInit() {
    this.api.getCountries().subscribe({
      next: (res) => {
        this.countries = res.result || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load countries.';
        this.loading = false;
      },
    });
  }
}
