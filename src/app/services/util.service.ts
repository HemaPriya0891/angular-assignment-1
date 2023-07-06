import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})


export class UtilService {
    public loggedInUser = new BehaviorSubject<any>('');
    constructor(){

    }
}