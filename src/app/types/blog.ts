export interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
}

export type PostData = {
  slug: string;
  id: string;
  tags: string[];
  content: React.ReactNode;
  date: string;
  title: string;
  summary: string;
};
