import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {
  id: any;
  fianlId!: number;
  cities: any = [];
  name!: string;
  image!: string;
  desc!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.fianlId = this.id - 1;
    console.log('id ', this.id);

    this.getCities().subscribe((res) => {
      console.log('res,', res);
      this.cities = res;
      this.name = this.cities[this.fianlId].name;
      this.image = this.cities[this.fianlId].image;
      this.desc = this.cities[this.fianlId].desc;
    });
  }

  getCities() {
    return this.http.get('assets/files/cities.json').pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
}
