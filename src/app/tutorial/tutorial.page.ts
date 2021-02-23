import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  constructor(public route: Router) { }


  slideOpts = {
    initialSlide: 0,
    speed: 400
  };



  ngOnInit() {
  }
  continue() {
    this.route.navigate(['/home']);
  }

}
