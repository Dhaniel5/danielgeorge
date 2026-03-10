import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight, Heart, MessageCircle, PenSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (data) {
      setPosts(data);
      // Fetch counts
      const postIds = data.map((p) => p.id);
      if (postIds.length > 0) {
        const [likesRes, commentsRes] = await Promise.all([
          supabase.from('blog_likes').select('post_id').in('post_id', postIds),
          supabase.from('blog_comments').select('post_id').in('post_id', postIds),
        ]);
        const lc: Record<string, number> = {};
        const cc: Record<string, number> = {};
        likesRes.data?.forEach((l) => { lc[l.post_id] = (lc[l.post_id] || 0) + 1; });
        commentsRes.data?.forEach((c) => { cc[c.post_id] = (cc[c.post_id] || 0) + 1; });
        setLikeCounts(lc);
        setCommentCounts(cc);
      }
    }
    setLoading(false);
  };

  const readingTime = (content: string) => {
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold gradient-text mb-4">Blog</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Thoughts on Web3, blockchain, AI, and building a better world.
            </p>
          </motion.div>

          {/* Write button for author */}
          {user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-end mb-8"
            >
              <Link
                to="/blog/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-heading font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                <PenSquare className="w-4 h-4" />
                Write Post
              </Link>
            </motion.div>
          )}

          {/* Posts */}
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card rounded-xl p-6 animate-pulse">
                  <div className="h-6 bg-muted rounded w-3/4 mb-3" />
                  <div className="h-4 bg-muted rounded w-full mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">No posts yet. Check back soon!</p>
              {user && (
                <Link
                  to="/blog/new"
                  className="mt-4 inline-flex items-center gap-2 text-primary hover:underline font-heading"
                >
                  Write your first post <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </motion.div>
          ) : (
            <div className="space-y-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card rounded-xl overflow-hidden group hover:glow-purple transition-all duration-300"
                >
                  {post.cover_image && (
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-xs font-heading px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    {post.excerpt && (
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-heading">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {readingTime(post.content)} min read
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Heart className="w-3.5 h-3.5" />
                          {likeCounts[post.id] || 0}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {commentCounts[post.id] || 0}
                        </span>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-heading text-primary hover:text-primary/80 transition-colors"
                        >
                          Read more <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-muted-foreground font-heading">
          © 2026 Daniel George Agbo. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Blog;
