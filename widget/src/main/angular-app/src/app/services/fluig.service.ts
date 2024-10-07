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
          'Authorization': 'Bearer eyJraWQiOiI1OGM3NjQzZi03NTQwLTQ4Y2YtOGVhYy01NDhiM2I4MGYxOTMiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJ1c2VyLGFkbWluIiwidGVuYW50IjoxLCJ1c2VyVGVuYW50SWQiOjMsInNpdGVDb2RlIjoiRmx1aWciLCJzaXRlSWQiOjEsInVzZXJUeXBlIjowLCJ1c2VyVVVJRCI6IjgwYTQxMGMwLTY5M2EtNGY1NC04N2EzLTkzN2YyZjQ1Mjg1ZiIsInRlbmFudFVVSUQiOiI1OGM3NjQzZi03NTQwLTQ4Y2YtOGVhYy01NDhiM2I4MGYxOTMiLCJsYXN0VXBkYXRlRGF0ZSI6MTcyODA1NDM5OTAwMCwidXNlclRpbWVab25lIjoiQW1lcmljYS9TYW9fUGF1bG8iLCJleHAiOjE3MjgwNjcyNDYsImlhdCI6MTcyODA2NjA0NiwiYXVkIjoiZmx1aWdfYXV0aGVudGljYXRvcl9yZXNvdXJjZSJ9.Zra24O3P2_87HkPxC4wW6IGkgq1QD9rVjY3JZ2zK6CwGBaedz9vQMP7v1LdGteve9Dsl30YlVTzv-sgtq0L-6h1YQyB2ekXV7f7k8aIHdKClql20kYUZy18xHoNbcIE7PZk5u1CbmeacXwNPeVFTcJ0B5PsGoHtVxDQWH0zxTTbn-3J95hF77bAoYl7ZfWh0dIal4wPv8eid3ARBl7b2VIN2XlVGuNS4kZKdi3Ugb2GGPep8BGbvZgE6QVlRxtPzTx5xywnJuXpzc9QblRzAA6hqEWIn48x_Uly1brm9d51VmjTTJ_Hjy0rCSNAM3Ta7fI7cR-pfeBf44HP6mLPZAw',
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
