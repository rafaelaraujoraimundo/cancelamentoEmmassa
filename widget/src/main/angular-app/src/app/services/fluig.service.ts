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
          'Authorization': 'Bearer ***REMOVED***',
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
