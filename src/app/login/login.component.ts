import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// usando una funcion de jquery que esta en otro archivo

declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private route:Router
  ) { 
  }
  
  ngOnInit(): void {
    init_plugins();
  }

  ingresar(){
    console.log('me estoy moviendo a otro lugar xD');
    this.route.navigate(['/dashboard'])
  }
}
