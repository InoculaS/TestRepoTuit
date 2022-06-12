import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  videos = [
    'https://www.youtube.com/embed/23IdBSaMkpM',
    'https://www.youtube.com/embed/W-0H7TczFRc',
    'https://www.youtube.com/embed/Tc167cpmTHw',
    'https://www.youtube.com/embed/L0Hf-kpKxgc',
    'https://www.youtube.com/embed/TFc77TOe6TI'
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
