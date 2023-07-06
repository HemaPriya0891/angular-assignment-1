import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import *  as crypto from 'crypto-js';
import { BehaviorSubject } from 'rxjs';
import { UtilService } from '../services/util.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnChanges {
  loginForm: FormGroup;
  hide : boolean = true;
  encrptKey: string = "S1aJe6bdVmCzxvY8pLUowJW9JBUa0KFa5G3I82uYxvw=";
  public loggedInUser = new BehaviorSubject<any>(null);
  constructor(private formBuilder: FormBuilder, private router: Router, private utilService: UtilService) { 
    this.loginForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      password: ['', Validators.required]
    })
  }
  
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  submitHandler = () => {
    console.log('submitted')
    try {
      console.log(this.loginForm.value);
      if(this.loginForm.valid){
        this.setLocalWithEncrpt('email', this.loginForm.value['email']);
        this.utilService.loggedInUser.next(this.getLocalWithEncrpt('email'));

        this.router.navigateByUrl('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  }

  setLocalWithEncrpt(key: string, val: any){

    let encryptValue = crypto.AES.encrypt(val, this.encrptKey).toString();

    console.log(encryptValue);

    localStorage.setItem(key, encryptValue);

  }
    getLocalWithEncrpt(key: string){

    let ciphertext = localStorage.getItem(key) || '';

    let bytes  = crypto.AES.decrypt(ciphertext, this.encrptKey);

    console.log(bytes);

    let decryptedText = bytes.toString(crypto.enc.Utf8);

    console.log(decryptedText);

    return decryptedText;

  }

  cancelLogin = () => {
    //this.loginForm.clearValidators();
    //this.loginForm.updateValueAndValidity();
    this.loginForm.reset();
    
    
    
  }

}
