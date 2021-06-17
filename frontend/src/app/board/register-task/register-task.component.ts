import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-task',
  templateUrl: './register-task.component.html',
  styleUrls: ['./register-task.component.css'],
})
export class RegisterTaskComponent implements OnInit {
  public taskData: any;
  public errorMessage: String;
  constructor() {
    this.taskData = {};
    this.errorMessage = '';
  }

  ngOnInit(): void {}

  saveTask() {}

  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
  closeX() {
    this.errorMessage = '';
  }
}
