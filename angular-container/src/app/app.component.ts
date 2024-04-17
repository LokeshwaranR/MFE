import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ParentDataService } from './parent.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-container';
  JSONType: any = [
    { name: 'JSON 1', code: 'J1' },
    { name: 'JSON 2', code: 'J2' },
    { name: 'JSON 3', code: 'J3' },
    { name: 'JSON 4', code: 'J4' }
  ];
  CommMethod: any = [
    { name: 'Web Browser Storage', code: 'WBS' },
    { name: 'Custom Event', code: 'CE' },
    { name: 'Shared Parent Bus', code: 'SPB' }
  ];
  selectedJSON: any = { name: 'JSON 1', code: 'J1' };
  selectedComm: any = { name: 'Web Browser Storage', code: 'WBS' };
  constructor(private ref: ChangeDetectorRef, private svc: ParentDataService) { }
  ngOnDestroy(): void {
    (window as any).removeEventListener('AngularToParent', this.handleReactParentData.bind(this));
    (window as any).removeEventListener('ReactToParent', this.handleAngularParentData.bind(this));
  }
  ngOnInit(): void {
    debugger
    (window as any).addEventListener('AngularToParent', this.handleReactParentData.bind(this));
    (window as any).addEventListener('ReactToParent', this.handleAngularParentData.bind(this));
    if (localStorage.getItem('selectedComm')) {
      localStorage.setItem('selectedComm', this.selectedComm.code);
    }
    if (localStorage.getItem('selectedJson')) {
      localStorage.setItem('selectedJson', this.selectedJSON.code);
    }
  }
  handleAngularParentData = (event: CustomEvent) => {
    console.log('Data received from React:', event.detail);
    this.svc.dataFromAngular = event.detail;
    const events = new CustomEvent("ReactToAngular", {
      detail: {
        message: "This is a custom event from React to Parent to Angular",
        data: this.svc.dataFromAngular
      },
    });
    window.dispatchEvent(events);
  }
  handleReactParentData = (event: CustomEvent) => {
    this.svc.dataFromReact = event.detail;
    console.log('Data received from Angular:', event.detail);
    const events = new CustomEvent("AngularToReact", {
      detail: {
        message: "This is a custom event from Angular to Parent to React",
        data: this.svc.dataFromReact
      },
    });
    window.dispatchEvent(events);
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
