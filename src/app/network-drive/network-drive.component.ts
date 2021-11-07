import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NetworkDriveService } from '../shared/network-drive.service';
import { NetworkDrive } from '../shared/NetworkDrive';

@Component({
  selector: 'app-network-drive',
  templateUrl: './network-drive.component.html',
  styleUrls: ['./network-drive.component.css'],
  providers: [NetworkDriveService]
})
export class NetworkDriveComponent implements OnInit {

  displayStyle = "none";
  statusDisplayStyle = "none";
  formTitle: string = "Network Drive Properties";
  buttonTitle: string = "Save";
  networkForm!: FormGroup;
  networkDrives: NetworkDrive[] = [];
  selectedNetworkDriveForEdit: any;
  selectedNetworkDriveForConnect: any;
  statusTitle: any;
  statusMessage: any;
  constructor(private formBuilder: FormBuilder, private networkDriveService: NetworkDriveService) { 
  }

  ngOnInit(): void {
    this.buildForm();
    this.getAllRecords();
  }

  openAddForm(){
    this.buildForm();
    this.formTitle = "Network Drive Properties";
    this.buttonTitle = "Save";
    this.displayStyle = "block";
  }

  openEditForm(networkDrive: NetworkDrive){
    this.buildForm(networkDrive);
    this.selectedNetworkDriveForEdit = networkDrive;
    this.formTitle = "Network Drive Properties";
    this.buttonTitle = "Save";
    this.displayStyle = "block";
  }

  openConnectForm(networkDrive: NetworkDrive){
    this.buildForm(networkDrive);
    this.selectedNetworkDriveForConnect = networkDrive;
    this.formTitle = "Connect to a Shared Network Location";
    this.buttonTitle = "Connect";
    this.displayStyle = "block";
  }

  buildForm(networkDrive?: NetworkDrive){
    if(null != networkDrive && undefined != networkDrive){
      this.networkForm = this.formBuilder.group({
        driveName: new FormControl(networkDrive.driveName, Validators.required),
        serverName: new FormControl(networkDrive.serverName, Validators.required),
        path: new FormControl(networkDrive.path, Validators.required)
      })
    }else{
      this.networkForm = this.formBuilder.group({
        driveName: new FormControl('', Validators.required),
        serverName: new FormControl('', Validators.required),
        path: new FormControl('', Validators.required)
      })
    }
    
  }

  closeAddForm(){
    this.displayStyle = "none";
  }

  saveForm(){
    if (this.selectedNetworkDriveForEdit != null && this.selectedNetworkDriveForEdit != undefined) {
      let networkDrive = {
        "id": this.selectedNetworkDriveForEdit.id,
        "serverName": this.networkForm.getRawValue()['serverName'],
        "driveName": this.networkForm.getRawValue()['driveName'],
        "path": this.networkForm.getRawValue()['path'],
        "connectionStatus":  this.selectedNetworkDriveForEdit.connectionStatus,
        "createdAt": this.selectedNetworkDriveForEdit.createdAt
      }
      this.networkDriveService.updateFormData(networkDrive).subscribe(response =>{
        console.log("Record updated successfully");
        this.selectedNetworkDriveForEdit = undefined;
        this.getAllRecords();
        this.displayStyle = "none";
      }, (error) => {
        this.displayStyle = "none";
        console.log(error);
      });
    }else if(this.selectedNetworkDriveForConnect != null && this.selectedNetworkDriveForConnect != undefined){
      let networkDrive = {
        "id": this.selectedNetworkDriveForConnect.id,
        "serverName": this.networkForm.getRawValue()['serverName'],
        "driveName": this.networkForm.getRawValue()['driveName'],
        "path": this.networkForm.getRawValue()['path'],
        "connectionStatus":  this.selectedNetworkDriveForConnect.connectionStatus,
        "createdAt": this.selectedNetworkDriveForConnect.createdAt
      }
      this.networkDriveService.connectRecord(networkDrive).subscribe(response =>{
        console.log("Connected successfully");
        this.displayStyle = "none";
        this.statusDisplayStyle = "block";
        this.statusTitle = "Connected";
        this.statusMessage = "The shared network location was successfully connected";
        this.getAllRecords();
      }, (error) => {
        this.displayStyle = "none";
        this.statusDisplayStyle = "block";
        this.statusTitle = "Not Connected";
        this.statusMessage = error['error']['message'];
        this.getAllRecords();
        console.log(error);
      });
    }else{
      this.networkDriveService.saveFormData(this.networkForm.getRawValue()).subscribe(response =>{
        console.log("Record Added successfully");
        this.displayStyle = "none";
        this.getAllRecords();
        
      }, (error) => {
        this.displayStyle = "none";
        console.log(error);
      });
    }
    
  }

  getAllRecords(){
    this.networkDriveService.getAllRecords().subscribe((data: NetworkDrive[]) => {
        this.networkDrives = data;
    }, (error) => {
      console.log(error);
    })
  }

  deleteNetworkDrive(id: number, drive: string){
    if(confirm("Are you sure that you want to delete Network drive "+ drive+"?")){
      this.networkDriveService.deleteRecord(id).subscribe((resp) => {
        console.log("Record deleted successfully");
        this.getAllRecords();
     }, (error) => {
       console.log(error);
     })
    }
    
  }
  closestatuspopup(){
    this.statusDisplayStyle = "none";
  }

}
