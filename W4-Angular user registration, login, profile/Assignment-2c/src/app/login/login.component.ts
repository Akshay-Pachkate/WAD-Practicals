import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ProfileComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  user: any = null;

  login() {
    console.log(this.email);
    console.log(this.password);
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    users.forEach((user:any, index:any) => {
      if(user.email === this.email && user.password === this.password){
        this.user = user;
      }
    })

    this.email = "";
    this.password = "";

    
    
  }
}
