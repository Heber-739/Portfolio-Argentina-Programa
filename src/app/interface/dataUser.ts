export class DataUser {
  name: string;
  surname: string;
  age: number;
  img: string;
  type_img: string;
  username: string;
  github: string;
  linkedin: string;
  description: string;
  constructor(
    name: string,
    surname: string,
    age: number,
    img: string,
    type_img: string,
    username: string,
    github: string,
    linkedin: string,
    description: string
  ) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.img = img;
    this.type_img = type_img;
    this.username = username;
    this.github = github;
    this.linkedin = linkedin;
    this.description = description;
  }
}
