
export interface Content {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
  status: ContentStatus;
  content: string;
  excerpt: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export type ContentStatus = "draft" | "published" | "archived";
export type ContentType = "page" | "article" | "blog" | "faq";
