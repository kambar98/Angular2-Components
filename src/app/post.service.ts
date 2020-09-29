import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http.post<{ name: string }>(
      'https://nauka-angular-3d163.firebaseio.com/posts.json',
      postData).subscribe(responseData => { console.log(responseData) },
        error => {
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>
      ('https://nauka-angular-3d163.firebaseio.com/posts.json', {
        headers: new HttpHeaders({"custom-header":hello})
      }).
      pipe(map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key })
          }
        }
        return postsArray;
      }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
    )
     
  }

  deletePosts() {
    return this.http.delete('https://nauka-angular-3d163.firebaseio.com/posts.json');
  }
}
