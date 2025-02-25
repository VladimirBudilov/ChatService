import {Injectable} from '@angular/core';
import {backendUrl} from '../models/config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private readonly apiUrl = `${backendUrl}/messages`;

  constructor(private http: HttpClient) {
  }

  getMessages(skip: number, top: number): Observable<Message[]> {
    const params = {
      $orderby: 'CreatedAt desc',
      $skip: skip.toString(),
      $top: Math.min(top, 50).toString()
    };

    return this.http.get<Message[]>(this.apiUrl, {params});
  }

  sendMessage(message: { text: string; userId: string }): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message);
  }
}
