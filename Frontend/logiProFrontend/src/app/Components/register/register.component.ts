import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../../Services/api.service';

import Swal from 'sweetalert2'


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

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){
    this.registerForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['', Validators.required], 
      email:['', [Validators.required, Validators.email]],
      phoneNumber:['', [Validators.required, Validators.minLength(10)]],
      role:['customer', Validators.required],
      password:['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'"|,.<>\\/\\\\]{8,30}$')]]
    })

  }

  registerUser(){

    const userDetails = this.registerForm.value

    this.api.registerUser(userDetails).subscribe(
      response=>{
        if(response.message){
        console.log(response);
        setTimeout(() => {
          this.registerForm.reset()
          this.router.navigate(['login'])
          
          
        }, 3000);
	
        let timerInterval:any;
        Swal.fire({
        title: 'Account created Successfully!',
        text: 'Login...!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-primary px-4'
            },
            didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
                const content = Swal.getHtmlContainer();
                if (content) {
                const b: any = content.querySelector('b');
                if (b) {
                    b.textContent = Swal.getTimerLeft();
                }
                }
            }, 100);
            },
            willClose: () => {
            clearInterval(timerInterval);
            },
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
            }
        });

      }else{
        this.msgVisible = true
        this.errorMsg = response.error
        setTimeout(() => {
          this.msgVisible = false
        }, 5000);
      }



        
      },
      error=>{
        console.error(error);
        
      }
    )
  }


}
