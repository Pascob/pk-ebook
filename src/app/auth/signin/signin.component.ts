import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
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
    this.signinForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)])
    });
  }

  onSubmit(): any{
    this.authService.signUser(this.signinForm.get("username")?.value, this.signinForm.get("password")?.value).subscribe(data => {
      if(data.length ==1 ){
        this.authService.userToSession(data[0]);
        console.log(data[0]);
        
        this.authService.emitAuth(true);
        this.router.navigate(['/books']);
      }else{
        this.errorMsg = "Non d'utilisateur ou mot de passe invalide !";
      }
      
    },
      error => {
        this.errorMsg = "error";
        console.log(error);
      });
  }

}
