import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, first } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `
    ]
})
export class LoginComponent implements OnInit {
    valCheck: string[] = ['remember'];
    loading = false;
    submitted = false;
    error = '';

    form!: FormGroup;

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (this.authService.userValue) {
            this.router.navigate(['/']);
        }

        this.form = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]]
        });
    }

    get f() { return this.form.controls; }

    login() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.error = '';
        this.loading = true;
        this.authService
            .login(
                this.form.controls['email'].value,
                this.form.controls['password'].value
            )
            .pipe(first())
            .subscribe({
                next: () => {
                    const returnUrl =
                        this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigate([returnUrl]);
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}
