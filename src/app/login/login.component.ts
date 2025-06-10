import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  showPassword: boolean = false;

  email = '';
  password = '';
  message = '';
  alertType = 'danger';

  constructor(private auth: AuthService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    const credentials = { email: this.email, password: this.password };
    this.auth.login(credentials).subscribe({
      next: (res: any) => {
        this.auth.setToken(res.token);
        localStorage.setItem(
          'userData',
          JSON.stringify({ id: res.id, email: res.email, EmployeeId: res.EmployeeId })
        );
        this.message = '';

        const role = this.auth.getRoleFromToken();
        if (role === 'USER') this.router.navigate(['user-home']);
        else if (role === 'HR') this.router.navigate(['hr-home']);
        else if (role === 'MANAGER') this.router.navigate(['manager-home']);
        else if (role === 'SENIORHR') this.router.navigate(['senior-hr-home']);
        else this.router.navigate(['/login']);
      },
      error: (err) => {
        this.message = err.error || 'Login failed';
      },
    });
  }
}
