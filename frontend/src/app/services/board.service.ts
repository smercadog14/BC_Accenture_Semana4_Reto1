import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private env: String;
  constructor(private http: HttpClient) {
    this.env = environment.APP_URL;
  }

  saveTask(board: any) {
    return this.http.post(this.env + 'board/saveTask', board);
  }

  listTask() {
    return this.http.get(this.env + 'board/listTask');
  }
}
