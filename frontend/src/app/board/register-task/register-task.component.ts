import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-register-task',
  templateUrl: './register-task.component.html',
  styleUrls: ['./register-task.component.css'],
})
export class RegisterTaskComponent implements OnInit {
  public taskData: any;
  public errorMessage: String;
  constructor(private boardService: BoardService, private router: Router) {
    this.taskData = {};
    this.errorMessage = '';
  }

  ngOnInit(): void {}

  saveTask() {
    console.log(this.taskData);

    if (!this.taskData.name || !this.taskData.description) {
      console.log('Failed process: Incomplete Data');
      this.errorMessage = 'Failed process: Incomplete Data';
      this.closeAlert();
    } else {
      this.boardService.saveTask(this.taskData).subscribe(
        (res: any) => {
          console.log(res);
          //localStorage.setItem('token', res.jwtToken);
          this.taskData = {};
          this.router.navigate(['/listTask']);
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error;
          this.closeAlert();
        }
      );
    }
  }
  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
  closeX() {
    this.errorMessage = '';
  }
}
