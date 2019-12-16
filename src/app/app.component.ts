import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  public cellSpacing: any = [10, 10];
  public allowFloating: boolean = false;
  public cellAspectRatio: number = 100 / 90;
  public panels: any = [
    {
      'sizeX': 0,
      'sizeY': 0,
      'row': 0,
      'col': 0,
      content: '<div class="content"><button class="btn"><i class="material-icons">\n' +
        'desktop_windows\n' +
        '</i></button></div>'
    },
    {
      'sizeX': 1,
      'sizeY': 1,
      'row': 0,
      'col': 0,
      content: '<div class="content"><button class="btn"><i class="material-icons">\n' +
        'delete_outline\n' +
        '</i></button></div>'
    },
    {
      'sizeX': 1,
      'sizeY': 1,
      'row': 0,
      'col': 0,
      content: '<div class="content"><button class="btn"><i class="material-icons">\n' +
        'build\n' +
        '</i></button></div>'
    }
  ];

  x: number;
  y: number;
  px: number;
  py: number;
  width: number;
  height: number;
  minArea: number;
  draggingCorner: boolean;
  draggingWindow: boolean;
  resizer: Function;

  constructor() {
    this.x = 300;
    this.y = 100;
    this.px = 0;
    this.py = 0;
    this.width = 600;
    this.height = 300;
    this.draggingCorner = false;
    this.draggingWindow = false;
    this.minArea = 20000;
  }

  ngOnInit() {
  }

  area() {
    return this.width * this.height;
  }

  onWindowPress(event: MouseEvent) {
    this.draggingWindow = true;
    this.px = event.clientX;
    this.py = event.clientY;
  }

  topLeftResize(offsetX: number, offsetY: number) {
    this.x += offsetX;
    this.y += offsetY;
    this.width -= offsetX;
    this.height -= offsetY;
  }

  topRightResize(offsetX: number, offsetY: number) {
    this.y += offsetY;
    this.width += offsetX;
    this.height -= offsetY;
  }

  bottomLeftResize(offsetX: number, offsetY: number) {
    this.x += offsetX;
    this.width -= offsetX;
    this.height += offsetY;
  }

  bottomRightResize(offsetX: number, offsetY: number) {
    this.width += offsetX;
    this.height += offsetY;
  }

  onCornerClick(event: MouseEvent, resizer?: Function) {
    this.draggingCorner = true;
    this.px = event.clientX;
    this.py = event.clientY;
    this.resizer = resizer;
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('document:mousemove', ['$event'])
  onCornerMove(event: MouseEvent) {
    if (!this.draggingCorner) {
      return;
    }
    let offsetX = event.clientX - this.px;
    let offsetY = event.clientY - this.py;

    let lastX = this.x;
    let lastY = this.y;
    let pWidth = this.width;
    let pHeight = this.height;

    this.resizer(offsetX, offsetY);
    if (this.area() < this.minArea) {
      this.x = lastX;
      this.y = lastY;
      this.width = pWidth;
      this.height = pHeight;
    }
    this.px = event.clientX;
    this.py = event.clientY;
  }

  @HostListener('document:mouseup', ['$event'])
  onCornerRelease(event: MouseEvent) {
    this.draggingWindow = false;
    this.draggingCorner = false;
  }
}
