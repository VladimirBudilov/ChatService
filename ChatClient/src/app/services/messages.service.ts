import {Injectable} from '@angular/core';
import {backendApiUrl, backendOdataUrl} from '../models/config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../models/Message';
import {CreateMessageRequest} from '../models/CreateMessageRequest';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private readonly apiUrl = `${backendOdataUrl}/messages`;

  constructor(private http: HttpClient) {
  }

  getMessages(skip: number, top: number): Observable<Message[]> {
    const params = {
      $orderby: 'CreatedAt desc',
      $skip: skip.toString(),
      $top: Math.min(top, 50).toString()
    };

    return this.http.get<{ value: any[] }>(this.apiUrl, {params}).pipe(
      map(response => response.value.map(m => ({
        id: m.Id,
        text: m.Text,
        createdAt: m.CreatedAt,
        userId: m.UserId
      })))
    );
  }

  sendMessage(message: CreateMessageRequest): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message);
  }
}
