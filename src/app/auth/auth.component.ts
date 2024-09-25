import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NbAuthModule, NbAuthResult, NbAuthService, NbLoginComponent, NbTokenService } from '@nebular/auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule, NbLayoutModule, NbRestoreScrollTopHelper, NbSidebarModule, NbSidebarService, NbStatusService } from '@nebular/theme';
import { catchError, of } from 'rxjs';
import { Error } from '../models/error.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterOutlet, 
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule, 
    NbAuthModule,
    NbEvaIconsModule,
    NbAlertModule,
    CommonModule,
    NbCheckboxModule,
    RouterModule,
    FormsModule,
    NbInputModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [
    NbStatusService, 
    NbSidebarService, 
    NbAuthService, 
    NbTokenService, 
    NbRestoreScrollTopHelper,
  ]
})
export class AuthComponent extends NbLoginComponent  {

  error!: Error;


  override login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.error = result.getResponse().error.details ||  { message: 'Error de autenticación', details: result.getErrors() } ;
        this.errors = result.getErrors();
      }

      console.log(result);
      console.log(result.getResponse().error.details);
      console.log(this.showMessages.error);
      console.log(this.error?.details?.length);
      
      

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

  onCloseAlert() {
    this.errors = [];
  }
}
