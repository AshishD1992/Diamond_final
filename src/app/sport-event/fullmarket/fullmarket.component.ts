import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-fullmarket',
  templateUrl: './fullmarket.component.html',
  styleUrls: ['./fullmarket.component.scss']
})
export class FullmarketComponent implements OnInit {

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
