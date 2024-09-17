export class CreateNewsDto {
  title: string;
  content: string;
  summary?: string;
  slug: string;
  publishedAt?: Date;
  imageUrl?: string;
  tags?: string[];
}

export class UpdateNewsDto {
  title?: string;
  content?: string;
  summary?: string;
  slug?: string;
  publishedAt?: Date;
  imageUrl?: string;
  tags?: string[];
}
