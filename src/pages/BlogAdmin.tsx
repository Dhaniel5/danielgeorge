import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PenSquare, Pencil, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

type BlogPost = Tables<'blog_posts'>;

const BlogAdmin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('author_id', user.id)
      .order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const togglePublish = async (post: BlogPost) => {
    const { error } = await supabase
      .from('blog_posts')
      .update({ published: !post.published })
      .eq('id', post.id);
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: post.published ? 'Unpublished' : 'Published' });
      fetchPosts();
    }
  };

  const deletePost = async (post: BlogPost) => {
    if (!confirm(`Delete "${post.title}"?`)) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', post.id);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Post deleted' });
      fetchPosts();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-10 flex-wrap gap-4"
          >
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold gradient-text mb-2">
                Blog Admin
              </h1>
              <p className="text-muted-foreground text-sm font-body">
                Manage your posts — create, edit, publish, or delete.
              </p>
            </div>
            <Link
              to="/blog/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-heading font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              <PenSquare className="w-4 h-4" />
              New Post
            </Link>
          </motion.div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card rounded-xl p-5 animate-pulse">
                  <div className="h-5 bg-muted rounded w-1/2 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="glass-card rounded-xl p-12 text-center">
              <p className="text-muted-foreground mb-4 font-body">No posts yet.</p>
              <Link
                to="/blog/new"
                className="inline-flex items-center gap-2 text-primary hover:underline font-heading text-sm"
              >
                <PenSquare className="w-4 h-4" /> Write your first post
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-heading font-semibold text-foreground truncate">
                        {post.title}
                      </h3>
                      <span
                        className={`text-xs font-heading px-2 py-0.5 rounded-full border ${
                          post.published
                            ? 'bg-green-500/10 text-green-400 border-green-500/30'
                            : 'bg-muted text-muted-foreground border-border'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-heading">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                      {' · '}/{post.slug}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {post.published && (
                      <Link
                        to={`/blog/${post.slug}`}
                        className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                        title="View"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                    <button
                      onClick={() => togglePublish(post)}
                      className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                      title={post.published ? 'Unpublish' : 'Publish'}
                    >
                      {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <Link
                      to={`/blog/edit/${post.id}`}
                      className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => deletePost(post)}
                      className="p-2 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;
