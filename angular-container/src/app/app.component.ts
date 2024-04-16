import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-container';
  JSONType: any = [
    { name: 'JSON 1', code: 'J1' },
    { name: 'JSON 2', code: 'J2' },
    { name: 'JSON 3', code: 'J3' },
    { name: 'JSON 4', code: 'J4' },
  ];
  CommMethod: any = [
    { name: 'Web Browser Storage', code: 'WBS' },
    { name: 'Custom Event', code: 'CE' },
    { name: 'Shared Parent Bus', code: 'SPB' }
  ];
  selectedJSON: any = { name: 'JSON 1', code: 'J1' };
  selectedComm: any = { name: 'Web Browser Storage', code: 'WBS' };
  constructor(private ref: ChangeDetectorRef) { }
  ngOnInit(): void {
    if (localStorage.getItem('selectedComm')) {
      localStorage.setItem('selectedComm', this.selectedComm.code);
    }
    if (localStorage.getItem('selectedJson')) {
      localStorage.setItem('selectedJson', this.selectedJSON.code);
    }
  }
  setComm() {
    localStorage.removeItem('selectedComm');
    localStorage.setItem('selectedComm', this.selectedComm.code);
    this.ref.detectChanges();
    this.ref.markForCheck();
  }
  setJSON() {
    localStorage.removeItem('selectedJson');
    localStorage.setItem('selectedJson', this.selectedJSON.code);
    this.ref.detectChanges();
    this.ref.markForCheck();
  }
}
