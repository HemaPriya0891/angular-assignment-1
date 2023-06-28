import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnChanges {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      email : ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

}
