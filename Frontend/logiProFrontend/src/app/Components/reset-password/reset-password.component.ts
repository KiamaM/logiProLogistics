import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule, FormsModule, FooterComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
errorMsg!:string
successMsg!:string

visible = false
visible2 = false

resetPassword(newPassword:any){

}

}
