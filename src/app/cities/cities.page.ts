import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {
  token = localStorage.getItem('token');
  cities: any = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    console.log('token:  ', this.token);
    localStorage.clear();
    this.getCities().subscribe((res) => {
      console.log('res,', res);
      this.cities = res;
    });
  }

  getCities() {
    return this.http.get('assets/files/cities.json').pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'City selected',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  async presentAlert1() {
    const alert = await this.alertController.create({
      header: 'Delete city',
      message: 'The city has been deleted correctly',
      buttons: ['OK'],
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Delete city',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('do not cancel');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('city Deleted');
          },
        },
      ],
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
}
