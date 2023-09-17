import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly dispose$ = new Subject();
  loginForm: FormGroup | null = null;

  constructor(
    private accountService: AuthUserService,
    private router: Router,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['mahmoudkhider37@gmail.com', [Validators.required, Validators.email]],
      password: [
        'Pa$$w0rd',
        [
          Validators.required,
          // Validators.pattern('/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{6,}$'),
        ],
      ],
    });
  }

  onSubmit() {
    this.accountService.login(this.loginForm?.value).subscribe(
      () => {
        this.toaster.success('Sucess login');
        this.router.navigateByUrl('/');
      },
      (error) => {
        this.toaster.warning(error.error.message);
        console.error(error.error.message);
      }
    );
  }

  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }
}
