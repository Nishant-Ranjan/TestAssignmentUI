import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, NETWORK_DRIVE_URL } from './AppSettings';
import { NetworkDrive } from './NetworkDrive';

@Injectable({
  providedIn: 'root'
})
export class NetworkDriveService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }), 
  } 

  saveFormData(networkDrive: NetworkDrive){
    let url = BASE_URL + NETWORK_DRIVE_URL;
    return this.http.post(url, networkDrive, this.httpOptions);
  }

  updateFormData(networkDrive: NetworkDrive){
    let url = BASE_URL + NETWORK_DRIVE_URL;
    return this.http.put(url, networkDrive, this.httpOptions);
  }

  getAllRecords(){
    let url = BASE_URL + NETWORK_DRIVE_URL;
    return this.http.get<NetworkDrive[]>(url);
  }

  deleteRecord(id: number){
    let url = BASE_URL + NETWORK_DRIVE_URL + "/"+ id;
    return this.http.delete(url);
  }

  connectRecord(networkDrive: NetworkDrive){
    let url = BASE_URL + NETWORK_DRIVE_URL + "/connect";
    return this.http.put(url, networkDrive, this.httpOptions);
  }
}
