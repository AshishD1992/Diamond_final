import { Component, OnInit ,NgModule} from '@angular/core';

import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Just Study

$(document).on('click', '.tab-list li a', function() {
  var $this = $(this),
      $tabList = $this.parents('ul'),
      _idx = $this.closest('li').index();
  
  $tabList.children().eq(_idx).addClass('in').siblings().removeClass('in');
  $tabList.next().children().eq(_idx).addClass('in').siblings().removeClass('in');
});

}

}