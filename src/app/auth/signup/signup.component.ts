import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMsg?: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm():any {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)])
    });
  }

  onSubmit(): any{
    let user = new User(0, this.signupForm.get("username")?.value, this.signupForm.get("password")?.value);
    this.authService.saveUser(user).subscribe(
      () => {
        this.router.navigate(['/books']);
      },
      error => {
        this.errorMsg = "error";
        console.log(error);
      }
      
    )
  }

}
