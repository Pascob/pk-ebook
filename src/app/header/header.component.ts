import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuth = false;
  constructor(private authService: AuthService, private router: Router,) { }

  ngOnInit(): void {
    this.isAuth = this.authService.isAuth();
    this.authService.authStream.subscribe(statut => {
      this.isAuth=this.authService.isAuth();
    });
  }

  signOut(){
    this.isAuth = false;
    this.authService.signOut();
    this.authService.emitAuth(false);
    this.router.navigate(['/books']);
  }

  ngOnDestroy(){
    this.authService.authStream._subscribe;
  }

}
