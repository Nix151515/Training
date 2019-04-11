import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {ResponseContentType} from '@angular/http';
import { Router } from '@angular/router';
import {FileUploader, FileUploadModule} from 'ng2-file-upload';
import { Observable } from 'rxjs';

const URL = 'http://localhost:3000/file';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  title = 'Demo';
  message = '';

  uploader:FileUploader = new FileUploader({
    url: URL,
    // allowedFileType: ['image', 'pdf'],
    method: 'post'
  });

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
       /*  cors  */
       this.uploader.onBeforeUploadItem = (item) => {
        item.withCredentials = false;
      }
  }

  onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    console.log(file);
  }

  getSavedFiles() {
    this.http.get("http://localhost:3000/file/security-doggo.jpg"
    , {responseType: 'blob'} 
    )
    .subscribe((resp: any) => {
      console.log(resp);
    })
  }

  getMessage() {
    return this.http.post("http://localhost:3000/welcomeMessage",
    {message : "Message sent"}, {responseType: 'text'});
  }

  showMessage() {
    this.getMessage().subscribe((resp: any) => {
      this.message  = resp;
      console.log(this.message);
    })
  }

  changePage() {
    this.router.navigate(['/page2']);
  }
  
  getUsers() {
    return this.http.get('http://localhost:3000/users').subscribe((users) => {
      console.log(users);
    });
  }

}
