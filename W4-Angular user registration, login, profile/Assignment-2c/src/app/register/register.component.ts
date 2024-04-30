import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  firstName: string = "";
  lastName: string  = "";
  email: string = "";
  address: string = "";
  phone: string = "";
  gender: string = "";
  age: number = 18;
  password: string = "";
  photo: string | ArrayBuffer | null = null;

  
  register() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      address: this.address,
      phone: this.phone,
      gender: this.gender,
      age: this.age,
      password: this.password,
      profilePhoto: this.photo
    }
    

    var users = JSON.parse(localStorage.getItem('users') || '[]');
    
    users = [user, ...users];
    localStorage.setItem('users', JSON.stringify(users));

  }


  loadImage(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.photo = reader.result;
    }
    
  }


}
