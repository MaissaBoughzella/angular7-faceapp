import { Component } from '@angular/core';
import { ServiceService } from './service.service';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'faceapp';

  path = '../assets/camera.png';
  emotion = '';
  gender = '';
  age = '';
  glasses = '';
  imgNaturalWidth = 0;
  imgNaturalHeight = 0;

  constructor(private serv: ServiceService ) {}

  linkPic(text) {

  this.path = text;
  console.log(this.path);

  const rect : HTMLElement = document.getElementById('rec');
  const image: HTMLElement = document.getElementById('img');

  this.serv.getData(this.path).subscribe((data: any) => {
  rect.style.width = (data[0].faceRectangle.width * image.clientWidth) / this.imgNaturalWidth + 'px';
  rect.style.height = (data[0].faceRectangle.height * image.clientHeight) / this.imgNaturalHeight + 'px';
  rect.style.left = (data[0].faceRectangle.left * image.clientWidth) / this.imgNaturalWidth + 'px';
  rect.style.top = (data[0].faceRectangle.top* image.clientHeight) / this.imgNaturalHeight + 'px';
  console.log(rect.style.width);
  rect.style.visibility = 'visible';
  })

  }

imgDetails(){
  const list: HTMLElement = document.getElementById('list');
  const image: HTMLElement = document.getElementById('img');

  this.serv.getData(this.path).subscribe((data: any) => {
    console.log(data);
    this.age = data[0].faceAttributes.age;
    this.gender = data[0].faceAttributes.gender;
    this.glasses = data[0].faceAttributes.glasses;
    list.style.top = (data[0].faceRectangle.top * image.clientHeight) / this.imgNaturalHeight + 20 + 'px';
    list.style.left = (data[0].faceRectangle.left * image.clientWidth) / this.imgNaturalWidth - 255 + 'px';

    if (data[0].faceAttributes.emotion.happiness > 0) {
      this.emotion = 'happy';
    } else
    if (data[0].faceAttributes.emotion.sadness >0) {
      this.emotion = 'sad';
    } else {this.emotion = 'neutre';}
  })
  list.style.visibility = 'visible';

}

listBye() {
    const list: HTMLElement = document.getElementById('list');
    list.style.visibility = 'hidden';
  }

imageLoad(event) {

    console.log(event);
    console.log(event.target.naturalWidth);
    console.log(event.target.naturalHeight);
    this.imgNaturalHeight = event.target.naturalHeight;
    this.imgNaturalWidth = event.target.naturalWidth;
  }
}
