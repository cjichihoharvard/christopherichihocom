export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Welcome to My Portfolio",
    date: "2024-01-15",
    excerpt: "Introducing my new portfolio website and what you can expect to find here.",
    content: "Welcome to my portfolio! This space showcases my journey, projects, and thoughts on strategy, timing, and taking calculated risks. Feel free to explore and reach out if you'd like to connect."
  },
  {
    id: "2",
    title: "The Art of Timing",
    date: "2024-02-20",
    excerpt: "Exploring how timing can be the difference between success and failure.",
    content: "In both poker and life, timing is everything. Knowing when to act, when to wait, and when to walk away has been a consistent theme throughout my educational and personal journey. This post explores the parallels between strategic timing in games and real-world decision making."
  }
];
