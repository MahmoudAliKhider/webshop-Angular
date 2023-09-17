import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  private readonly dispose$ = new Subject();
  registerForm: FormGroup | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accoutServices: AuthUserService,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
this.initRegisterForm();
  }
  private initRegisterForm(){
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(
            "(?=^.{6,10}$)(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*s).*$"
          ),
        ],
      ],
      passwordConfirm: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(
            "(?=^.{6,10}$)(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*s).*$"
          ),
        ],
      ],
    });
  }

  onSubmit() {
    this.accoutServices.register(this.registerForm?.value).subscribe(
      () => {
        this.toaster.success('Sucess Register');
        this.router.navigateByUrl('/');
      },
      (error) => {
        this.toaster.warning(error.error.errors[0].msg);
        console.error(error.error.errors[0].msg);
      }
    );
  }
  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }
}
