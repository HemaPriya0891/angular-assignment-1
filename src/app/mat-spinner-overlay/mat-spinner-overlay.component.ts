import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mat-spinner-overlay',
  templateUrl: './mat-spinner-overlay.component.html',
  styleUrls: ['./mat-spinner-overlay.component.scss']
})
export class MatSpinnerOverlayComponent implements OnInit {

  constructor() { }
  @Input() value : number = 100;
  @Input() diameter: number = 100;
  @Input() mode : any ="indeterminate";
  @Input() strokeWidth : number = 10;
  @Input() overlay: boolean = false;
  @Input() color: any = "#D4EAF9";
  ngOnInit(): void {
  }

}
