export class HardSkill {
  id?: number;
  name: string;
  percentage: number;
  img: string;
  type_img: string;
  constructor(name: string, percentage: number, img: string, type_img: string) {
    (this.name = name),
      (this.percentage = percentage),
      (this.img = img),
      (this.type_img = type_img);
  }
}
