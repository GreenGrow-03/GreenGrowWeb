import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  //urlbase
  basePath = 'https://greengrowapi.onrender.com/api/messages';

  



  constructor(private httpChat:HttpClient) { }


  getAll():Observable<any[]>{
    return this.httpChat.get<any[]>(`${this.basePath}/all`);
  }

  //crear un mensaje
  createMessage(message: string, userID: any): Observable<any> {
    const url = `${this.basePath}/save/${userID}`;
    const requestBody = { message };
    return this.httpChat.post(url, requestBody);
  }
  
}
