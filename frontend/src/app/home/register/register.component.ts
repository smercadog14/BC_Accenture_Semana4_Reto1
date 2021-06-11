import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerData: any;
  public successMessage: String;
  public errorMessage: String;

  constructor(private auth: AuthService, private router: Router) {
    this.registerData = {};
    this.successMessage = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {}

  registerUser() {
    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password
    ) {
      console.log('Failed: Process: Incomplete data');
      this.errorMessage = 'Failed: Process: Incomplete data';
      this.closeAlert();
      this.registerData = {};
    } else {
      this.auth.registerUser(this.registerData).subscribe(
        (res) => {
          console.log(res);
          this.successMessage = 'Register user: Sucessfull';
          this.closeAlert();
          this.registerData = {};
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error;
          this.closeAlert();
          this.registerData = {};
        }
      );
    }
  }
  closeAlert() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 6000);
  }
  closeX() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}
