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
  ChangePwdForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
 
    private loginServie: LoginService,
    private tokenService: TokenService,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    $(document).ready(function () {
      $('.pass_show').append('<span class="ptxt">Show</span>');
    });
    $(document).on('click', '.pass_show .ptxt', function () {

      $(this).text($(this).text() == "Show" ? "Hide" : "Show");

      $(this).prev().attr('type', function (index, attr) { return attr == 'password' ? 'text' : 'password'; });

    });

    this.ChangePwdForm = this.formBuilder.group({
      context: ['Web', Validators.required],
      changeBy: ['navcl', Validators.required],
      confirmpassword: ['', Validators.required],
      newPwd: ['', Validators.required],
      oldPwd: ['', Validators.required],
    }, {
      validator: MustMatch('newPwd', 'confirmpassword')
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.ChangePwdForm.controls; }

  changePwd() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ChangePwdForm.invalid) {
      return;
    }

    console.log(this.ChangePwdForm.value);
    this.loginServie.ChangePwd(this.ChangePwdForm.value).subscribe(data => {

      console.log(data)
      if (data.status == 'Success') {
        this.toastr.success(data.result);
        // this.ChangePwdForm.reset();
        // this.resetFrom();
        this.tokenService.removeToken();

        this.submitted = false
      } else {
        this.toastr.error(data.result);
      }
    });
  }
 


}






