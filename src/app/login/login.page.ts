import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  token = 'oojqwasdl12wsdv';

  constructor(private router: Router) {}

  ngOnInit() {
    console.log();
  }

  login() {
    localStorage.setItem('token', this.token);
    this.router.navigate(['/home']);
  }
}
