import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  submitted = false;
  hide = true;

  usersList: User[] = [];

  loginForm = this.formBuilder.group({
    // [lo que debe Tener, {[validaciones], updateOn: 'change'}]
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
        updateOn: 'change',
      },
    ],
    password: [
      '',
      {
        validators: [Validators.required, Validators.minLength(8)],
        updateOn: 'change',
      },
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((response: any) => {
      this.usersList = response;
    });
  }

  submitForm() {
    const foundUser = this.usersList.find((user: User) => {
      return (
        user.email == this.loginForm?.get('email')?.value &&
        user.password == this.loginForm?.get('password')?.value
      );
    });
  
    if (foundUser) {
      // Guardar el usuario en localStorage
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
  
      // Ir al dashboard
      this.router.navigate(['/plants']);
    } else {
      // Mostrar alerta si el usuario no es encontrado
      alert('User not found. An error has occurred.');
    }
  }
  getErrorEmailMessage() {
    if (this.loginForm?.get('email')?.hasError('email')) {
      return 'Please, enter a valid email address';
    }
    return 'Please, enter an email address';
  }

  getErrorPasswordMessage() {
    if (this.loginForm?.get('password')?.hasError('minlength')) {
      return 'Please, enter a password at least 8 characters';
    }
    return 'Please, enter a password';
  }
}
