import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { TokenService } from '../services/token.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MustMatch } from '../helpers/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder) {
  
    this.form = fb.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, { 
      validator: MustMatch ('password', 'confirm_password')
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
    
  get f(){
    return this.form.controls;
  }
   
  submit(){
    console.log(this.form.value);
  }
}