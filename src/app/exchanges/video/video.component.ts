import { AfterViewInit, Component, OnInit,ElementRef, Input } from '@angular/core';
declare const videojs: any;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  @Input() public tvurl : any;
  seekbarTracker: any = {
    duration: 0,
    time: 0,
    seekPercent: 0,
    hasDVR: false,
  };
  seekTime: any ;
  private player: any;
  constructor(elementRef: ElementRef) {
    this.player = false;
   }

  ngOnInit(): void {
    // this.player.play();
  }

  ngAfterViewInit() {
    const self = this;
    this.player = videojs(document.getElementById('sxmvideo'));
    // console.log(this.player);
    this.player.muted(true);
    this.player.on('timeupdate', () => {
      let hasDVR = false;
      let duration = Math.floor(this.getDuration(this.player) * 1000);
      let time;
      let seekPercent;
      // this.player.controls(true);
      // this.player.play();
      // console.log(this.player.currentTime(), this.getDuration(this.player));


    });
  }
  getDuration(player:any) {
    var seekable = player.seekable();
    return seekable && seekable.length ? seekable.end(0) - seekable.start(0) : 0;
  }

  onSeekPercentChange(player:any, seekPercent:any, duration:any) {
    var seekable = player.seekable();

    if (seekable && seekable.length) {
      // constrain currentTime
      player.currentTime(Math.max(0, Math.min(seekable.end(0), seekable.start(0) + (seekPercent * duration))));
    }
  }

  isLive() {
    if (!isFinite(this.player.duration())) {
      return true;
    }

    var acceptableDelay = 30;
    var seekable = this.player.seekable();
    return seekable && seekable.length && seekable.end(0) - this.player.currentTime() < acceptableDelay;
  }

  ngOnDestroy() {

    // this.player.dispose();
  }

}
