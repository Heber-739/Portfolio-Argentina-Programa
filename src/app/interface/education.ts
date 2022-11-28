import { Tag } from './tag';

export class Education {
  id?: number;
  name: string;
  link: string;
  finish: boolean;
  img: string;
  type_img: string;
  tags?: Tag[];
  constructor(
    name: string,
    link: string,
    finish: boolean,
    img: string,
    type_img: string
  ) {
    this.name = name;
    this.link = link;
    this.finish = finish;
    this.img = img;
    this.type_img = type_img;
  }
}
