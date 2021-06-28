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
  public selectedFile: any;
  constructor(private boardService: BoardService, private router: Router) {
    this.taskData = {};
    this.errorMessage = '';
    this.selectedFile = '';
  }

  ngOnInit(): void {}

  uploadImg(event: any) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }

  saveTaskImg() {
    if (!this.taskData.name || !this.taskData.description) {
      this.errorMessage = 'incomplete data';
      console.log('incomplete data');
      this.closeAlert();
    } else {
      const data = new FormData();
      data.append('image', this.selectedFile, this.selectedFile.name);
      data.append('name', this.taskData.name);
      data.append('description', this.taskData.description);
      this.boardService.saveTaskImg(data).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['listTask']);
        },
        (err) => {
          console.log(err.error);
          this.errorMessage = err.erro;
          this.closeAlert();
        }
      );
    }
  }

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
