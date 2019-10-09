import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject ,Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BankServiceService {
  private subject = new Subject<any>();
    constructor(private http: HttpClient) { }

  bankData(obj:any){
    return this.http.get('https://vast-shore-74260.herokuapp.com/banks',{
      params : obj
    })
  }
  sendMessage(message: any) {
    this.subject.next({ text: message });
}
getMessage(): Observable<any> {
  console.log(this.subject.asObservable())
  return this.subject.asObservable();
}
}
