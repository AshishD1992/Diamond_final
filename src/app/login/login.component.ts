import { Component, OnInit } from '@angular/core';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm:any = FormGroup;
submitted = false;
constructor( private formBuilder: FormBuilder,
 ){}
//Add user form actions
get f() { return this.LoginForm.controls; }
onSubmit() {
  
  this.submitted = true;
  // stop here if form is invalid
  if (this.LoginForm.invalid) {
      return;
  }

  
  //True if all the fields are filled
  if(this.submitted)
  {
    alert("Great!!");
  }
 
}
  ngOnInit() {
    //Add User form validations
    this.LoginForm = this.formBuilder.group({
    user: ['', [Validators.required]],
    password: ['', [Validators.required]]
    });
  }
}