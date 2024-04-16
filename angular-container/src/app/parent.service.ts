import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParentDataService {
  dataFromReact:any = [];
  dataFromAngular:any = [];
  constructor() { }
}
