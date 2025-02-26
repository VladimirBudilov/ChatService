import {Injectable} from '@angular/core';
import * as signalR from "@microsoft/signalr";
import {backendHubUrl} from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${backendHubUrl}/hub`)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  startConnection() {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ', err));
  }

  addMessageListener(methodName: string, callback: (...args: any[]) => void) {
    this.hubConnection.on(methodName, callback);
  }


  onReceiveMessage(callback: (message: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  onReceiveNotification(callback: (message: string) => void) {
    this.hubConnection.on('ReceiveNotification', callback);
  }
}
