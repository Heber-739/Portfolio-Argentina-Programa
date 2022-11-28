export class Tag {
  id?: number;
  name: string;
  abbreviation: string;
  educationId?: number;
  constructor(name: string, abbreviation: string) {
    (this.name = name), (this.abbreviation = abbreviation);
  }
}
