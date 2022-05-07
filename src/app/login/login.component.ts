import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenService } from '../services/token.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  isSubmitted  =  false;
 
  constructor( private loginService: LoginService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this. LoginForm  =  this.fb.group({
      context: ['Web',Validators.required],
      Username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  get f() 
  { return this. LoginForm.controls; }

  login(){
    console.log(this. LoginForm.value);
    this.isSubmitted = true;
    if(this. LoginForm.invalid){
      return;
    }
    // this.authService.login(this.loginForm.value);
    // this.router.navigateByUrl('/admin');
  }
}
