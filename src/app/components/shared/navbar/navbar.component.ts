import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  hideShowMenu(e:any){
    console.log(e);
    e.preventDefault();
    var wra = document.getElementById('wrapper');
    wra?.classList.toggle("toggled");
  }
}
