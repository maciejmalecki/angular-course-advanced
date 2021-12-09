import {Edition} from "./edition";

export interface Book {
  id: number | undefined;
  title: string;
  author: string;
  description: string;
  edition: Edition;
}
