import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "b-01",
    title: "5 Wardrobe Staples Every Closet Needs This Season",
    slug: "wardrobe-staples-this-season",
    excerpt: "From tailored blazers to versatile denim, here are the pieces worth investing in.",
    content:
      "From tailored blazers to versatile denim, here are the pieces worth investing in this season. A well-cut blazer instantly elevates a casual outfit, while a classic pair of jeans works for nearly any occasion. Layering pieces like lightweight jackets give you flexibility as the weather shifts, and a crisp white shirt remains one of the most reliable items you can own. Finally, a good pair of everyday sneakers ties the whole rotation together, taking you from errands to evenings out without missing a beat.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
    date: "2026-06-24",
    comments: 8,
    author: "Priya Sharma",
  },
  {
    id: "b-02",
    title: "Crossbody, Tote, or Backpack: Picking the Right Everyday Bag",
    slug: "styling-statement-accessories",
    excerpt: "A guide to matching your bag to how you actually move through the day.",
    content:
      "The right bag comes down to how you move through your day, not just how it looks. A crossbody keeps your hands free and works well for quick errands, a tote has the room for a laptop and groceries in one trip, and a backpack distributes weight best for commuting or travel. Neutral tones go further across outfits than you'd think, and good hardware — zippers that glide, straps that don't fray — is the real sign of a bag built to last.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
    date: "2026-06-10",
    comments: 5,
    author: "Daniel Cho",
  },
  {
    id: "b-03",
    title: "Chinos vs. Joggers: Finding Your Everyday Pant",
    slug: "home-office-setup-focus",
    excerpt: "What actually separates smart-casual chinos from a good pair of joggers.",
    content:
      "Chinos and joggers both aim for comfort, but they solve different problems. Chinos hold a cleaner line and work in more settings — pair them with a polo or a crew neck tee and they read as put-together without trying hard. Joggers trade that structure for ease of movement and a relaxed waistband, better suited to travel days or weekends. The simplest rule: if you're not sure which to wear, check the room you're walking into.",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
    date: "2026-05-28",
    comments: 12,
    author: "Priya Sharma",
  },
  {
    id: "b-04",
    title: "Choosing Running Shoes: What Actually Matters",
    slug: "choosing-running-shoes",
    excerpt: "Cutting through the marketing to focus on fit, drop, and cushioning.",
    content:
      "It's easy to get lost in marketing claims when shopping for running shoes. What actually matters is fit through the midfoot, a heel-to-toe drop that matches your stride, and cushioning that suits the surfaces you run on most. Trying shoes on later in the day, when feet are slightly more swollen, gives a more realistic sense of fit than trying them first thing in the morning.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    date: "2026-05-05",
    comments: 3,
    author: "Marcus Webb",
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
