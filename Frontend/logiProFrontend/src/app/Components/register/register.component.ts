import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  msgVisible!:Boolean
  msgVisible2!:Boolean
  errorMsg!:string
  successMsg!:string

  registerForm!:FormGroup

  constructor(private fb:FormBuilder){
    this.registerForm = this.fb.group({

    })

  }

  registerUser(){}


}
