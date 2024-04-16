import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactDataService } from '../react-data.service';
declare const require: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  angularVersion = require('./../../../package.json').dependencies['@angular/core'];
  data: any;
  dataFromReact: any;
  constructor(private http: HttpClient, private svc: ReactDataService) {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
  }


  ngOnInit(): void {
    (window as any).addEventListener('ReactToAngular', this.handleReactData.bind(this));
    let selectedCommunication = localStorage.getItem("selectedComm");
    if (selectedCommunication == 'WBS') {
      let receivedData: any = localStorage.getItem('RtoA');
      if (receivedData) {
        this.mapData(JSON.parse(receivedData));
      } else {
        console.error('Error in getting Data');
      }
    } else if (selectedCommunication == 'CE') {
      if (this.svc.dataFromReact && this.svc.dataFromReact.data) {
        this.mapData(this.svc.dataFromReact.data);
      } else {
        console.error('Error in getting Data');
      }
    }
  }
  ngOnDestroy(): void {
    (window as any).removeEventListener('ReactToAngular', this.handleReactData.bind(this));
  }
  sendDataToReact() {
    let selectedJsonFile = localStorage.getItem("selectedJson");
    let selectedCommunication = localStorage.getItem("selectedComm");
    this.getJsonData(selectedJsonFile, selectedCommunication);
  }

  getJsonData(selectedJson: any, selectedCommunication: any) {
    if (selectedJson == "J1") {
      this.http.get('http://localhost:4201/assets/J1.json').subscribe((res: any) => {
        console.log(res);
        this.setDataComm(res, selectedCommunication);
      }, (err) => {
        console.error("Failed to gather data:", err);
      });
    } else if (selectedJson == "J2") {
      this.http.get('http://localhost:4201/assets/J2.json').subscribe((res: any) => {
        this.setDataComm(res, selectedCommunication);
      }, (err) => {
        console.error("Failed to gather data:", err);
      });
    }
  };
  setDataComm(resJSON: any, selectedComm: any) {
    if (selectedComm == 'WBS') {
      if (localStorage.getItem("AtoR")) {
        localStorage.removeItem("AtoR");
      }
      localStorage.setItem("AtoR", JSON.stringify(resJSON));
    } else if (selectedComm == "CE") {
      const event = new CustomEvent("AngularToReact", {
        detail: {
          message: "This is a custom event from Angular to React",
          data: resJSON
        },
      });
      window.dispatchEvent(event);
    }
  }
  handleReactData = (event: CustomEvent) => {
    console.log('Data received from React:', event.detail);
    this.dataFromReact = event.detail;
    this.svc.dataFromReact = event.detail;
  }

  mapData(jsonData: any) {
    this.data = {
      labels: jsonData.map((data: any) => data.name),
      datasets: [
        {
          label: 'Value Transition from Angular to React',
          data: jsonData.map((data: any) => data.value)
        }
      ]
    };
  }
}
