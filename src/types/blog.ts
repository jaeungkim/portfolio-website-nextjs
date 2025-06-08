export interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
}

export type PostData = {
  slug: string;
  id: string;
  content: React.ReactNode;
  date: string;
  title: string;
  summary: string;
};
