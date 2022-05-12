import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';
import { TokenService } from '../services/token.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  LoginForm!: FormGroup;
  isLoggedIn: boolean = false;

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    
  }

  Logout() {
    this.loginService.Logout(null).subscribe(resp => {
      if (resp.status == "Success") {
        // this.signalrService.UnsuscribeClient();
        this.toastr.success(resp.result);
        this.tokenService.removeToken();
        this.tokenService.removeType();
        window.location.href="/login";
        // window.location.href = "http://" + window.location.hostname
        this.toastr.success(resp.result);
        this.isLoggedIn=false;
        // if (this.eventBetsSubscription) {
        //   this.eventBetsSubscription.unsubscribe();
        // }
      }
      else {
        this.toastr.error(resp.result);
      }
    }, err => {
      if (err.status == 401) {
        //this.toastr.error("Error Occured");
      }
    })
  }

}
