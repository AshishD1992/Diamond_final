import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { TokenService } from '../services/token.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm:any = FormGroup;
  ipInfo: any;
submitted = false;
constructor( private formBuilder: FormBuilder,
  private loginService: LoginService,
  private tokenService: TokenService,
  private toastr: ToastrService,
  private router: Router
 ){}

 ngOnInit() {
  this.initLoginForm();
  this.GetIpAddrress();
}

initLoginForm() {
  this.LoginForm = this.formBuilder.group({
    username: ['', Validators.required],
    pwd: ['', Validators.required],
    context: ['Web'],
    ipAddress: [''],
    // usertype: [''],
    // MachineId: [''],
    // imeiAddress: [''],
    // mobModelBrowserVers: [''],
    tango: ['1'],
  })

}

//Add user form actions
get f() { return this.LoginForm.controls; }

GetIpAddrress() {
  this.loginService.GetIpAddrress().subscribe(resp => {
    this.ipInfo = resp;
    this.LoginForm.controls['ipAddress'].setValue(this.ipInfo.ip);
  })
}

  Login() {
    if (!this.LoginForm.valid) {
      return;
    }

    this.loginService.Login(this.LoginForm.value).subscribe(resp => {

      if (resp.response && resp.description.status == "Success") {
        this.LoginForm.reset();
        this.toastr.success(resp.description.result);
        this.tokenService.setToken(resp.response.AuthToken);
        if(this.ipInfo){
          this.tokenService.setIpAddrress(this.ipInfo.ip);
        }

        // this.tokenService.setType(resp.type);
        this.router.navigate(['dashboard']);
      }
      else {
        this.toastr.error(resp.description.result);
        // this.router.navigate(['dashboard']);
      }
    }, err => {
      //this.toastr.error("Error Occured");
      // alert(err)
    })
  }

}