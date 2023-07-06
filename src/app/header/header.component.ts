import { Component, Input, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private utilService: UtilService) { }
  loggedInUserDisplay : any;
  ngOnInit(): void {
    this.loggedInUserDisplay = this.utilService.loggedInUser.getValue();
    console.log(this.utilService.loggedInUser.getValue());
  }

}
