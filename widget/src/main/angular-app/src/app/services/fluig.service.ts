import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { PoComboOptionGroup, PoTableColumn, PoTableDetail, PoTagType } from '@po-ui/ng-components';
import { User } from '../interfaces/user';
import { WINDOW } from 'ngx-window-token';
import { IWCMAPI } from '../interfaces/IWCMAPI';

@Injectable()
export class FluigService {

WCMAPI!: IWCMAPI;
  
body?: Object = {}
httpOptions: any;
      
      constructor(
        @Inject(WINDOW) private _window: Window,
                private http: HttpClient,
      ) { 
        this.WCMAPI = this._window.WCMAPI;
        this.httpOptions = environment.development ? {
        
        headers: new HttpHeaders({
          'Authorization': 'Bearer eyJraWQiOiI1OGM3NjQzZi03NTQwLTQ4Y2YtOGVhYy01NDhiM2I4MGYxOTMiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJ1c2VyLGFkbWluIiwidGVuYW50IjoxLCJ1c2VyVGVuYW50SWQiOjMsInNpdGVDb2RlIjoiRmx1aWciLCJzaXRlSWQiOjEsInVzZXJUeXBlIjowLCJ1c2VyVVVJRCI6IjgwYTQxMGMwLTY5M2EtNGY1NC04N2EzLTkzN2YyZjQ1Mjg1ZiIsInRlbmFudFVVSUQiOiI1OGM3NjQzZi03NTQwLTQ4Y2YtOGVhYy01NDhiM2I4MGYxOTMiLCJsYXN0VXBkYXRlRGF0ZSI6MTcyNzk2OTE1NzAwMCwidXNlclRpbWVab25lIjoiQW1lcmljYS9TYW9fUGF1bG8iLCJleHAiOjE3MjgzMjYwNjUsImlhdCI6MTcyODMyNDg2NSwiYXVkIjoiZmx1aWdfYXV0aGVudGljYXRvcl9yZXNvdXJjZSJ9.HK5CewwJRRbgKeRjfX_yr_3J036a4WVSgglJZQWH16RuYjkWZI-ohn0gRC6NTn6OMp0Kd99hwGlurGYSXgwzGUdDqI8k_5hr3pc5oumvn9aifrNOxww-x_pP5NNTana3ebD2MBMJfI2nfWj1RKP5zB8YpfyWRb-htLivqoTeDqq4P2mYD17l7-QUvBev561VW6jMt2Cf6JsnmQCHqkjdGxTuTVpKRCQKVKRXfZl6-1NK9dcFNxDohuk4qB5ArGMdbBWGgPNSs8l75UxmmcjpecF2cYNG6MNCXmENEQBbUHxBxkO3V0qaeDKZ9zPZa3HNyvZ9E90JFs4SUNlQ34vv7Q',
        })
      } : undefined; }



    public getCurrent(userLogin: string): Observable<any> {
     
      const url = `/collaboration/api/v3/users/${userLogin}`
      
      return this.http.get(url, this.httpOptions)
   
    }

    cancelInstances(payload: any): Observable<any> {
      
      const url = '/api/public/2.0/workflows/cancelInstances'
  
    
      return this.http.post<any>(url, payload, this.httpOptions);
    }
     
    public getUserLogin(): string {
      return this.WCMAPI.userLogin;
    }

    public getListUser(): Observable<any> {
      const url = `/collaboration/api/v3/users/?pageSize=1000`
      return this.http.get(url, this.httpOptions)
    } 


  public getUserBase(userLogin: string): Observable<any> {
     
    const url = ` /ecm/api/rest/ecm/user/get/${userLogin}`
    
    return this.http.get(url, this.httpOptions)
 
  }

  getTasks(userCode: string): Observable<any> {
    const url = `/ecm/api/rest/ecm/centralTasks/getTasks/open/${userCode}?offset=0&search=false&nd=1728055302977&rows=500&page=1&sidx=processInstanceId&sord=asc`;
    

    return this.http.get(url, this.httpOptions);
  }
       
}

declare global {
  interface Window {
    WCMAPI: IWCMAPI;
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
