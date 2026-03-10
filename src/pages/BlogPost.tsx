import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, Tag, Heart, MessageCircle, Share2,
  ArrowLeft, Twitter, Send, Copy, Check, Pencil, Trash2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';

type BlogPostType = Tables<'blog_posts'>;
type BlogComment = Tables<'blog_comments'>;
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [post, setPost] = useState<BlogPostType | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [commentForm, setCommentForm] = useState({ author_name: '', author_email: '', content: '' });
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (slug) fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    const { data: postData } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (!postData) { navigate('/blog'); return; }
    setPost(postData);

    const [commentsRes, likesRes] = await Promise.all([
      supabase.from('blog_comments').select('*').eq('post_id', postData.id).order('created_at', { ascending: false }),
      supabase.from('blog_likes').select('id, user_id').eq('post_id', postData.id),
    ]);

    setComments(commentsRes.data || []);
    setLikeCount(likesRes.data?.length || 0);
    if (user) setLiked(likesRes.data?.some((l) => l.user_id === user.id) || false);
    setLoading(false);
  };

  const handleLike = async () => {
    if (!user || !post) {
      toast({ title: 'Sign in to like posts', description: 'You need to be logged in to like posts.' });
      return;
    }
    if (liked) {
      await supabase.from('blog_likes').delete().eq('post_id', post.id).eq('user_id', user.id);
      setLiked(false);
      setLikeCount((c) => c - 1);
    } else {
      await supabase.from('blog_likes').insert({ post_id: post.id, user_id: user.id });
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;
    if (!commentForm.author_name.trim() || !commentForm.content.trim()) {
      toast({ title: 'Please fill in name and comment.' });
      return;
    }
    setSubmittingComment(true);
    const { error } = await supabase.from('blog_comments').insert({
      post_id: post.id,
      author_name: commentForm.author_name.trim(),
      author_email: commentForm.author_email.trim() || null,
      content: commentForm.content.trim(),
    });
    if (error) {
      toast({ title: 'Failed to post comment', variant: 'destructive' });
    } else {
      toast({ title: 'Comment posted!' });
      setCommentForm({ author_name: '', author_email: '', content: '' });
      fetchPost();
    }
    setSubmittingComment(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: 'Link copied!' });
  };

  const handleDelete = async () => {
    if (!post || !confirm('Delete this post?')) return;
    await supabase.from('blog_posts').delete().eq('id', post.id);
    navigate('/blog');
  };

  const readingTime = (content: string) => Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 container mx-auto px-6 max-w-3xl">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const shareUrl = window.location.href;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Back */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-heading">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 text-xs font-heading px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    <Tag className="w-3 h-3" />{tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-6 border-b border-border">
              <div className="flex items-center gap-4 text-sm text-muted-foreground font-heading">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {readingTime(post.content)} min read
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Like */}
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 text-sm font-heading px-3 py-1.5 rounded-lg border transition-all ${
                    liked ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'border-border text-muted-foreground hover:border-red-500/30 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-red-400' : ''}`} />
                  {likeCount}
                </button>

                {/* Share */}
                <div className="relative">
                  <button
                    onClick={() => setShareOpen(!shareOpen)}
                    className="flex items-center gap-1.5 text-sm font-heading px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:border-primary/30 hover:text-primary transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  {shareOpen && (
                    <div className="absolute right-0 top-10 glass-card rounded-xl p-3 space-y-2 w-48 z-10 shadow-xl">
                      <a href={twitterUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-lg hover:bg-muted font-heading"
                        onClick={() => setShareOpen(false)}
                      >
                        <Twitter className="w-4 h-4" /> Share on X
                      </a>
                      <a href={telegramUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-lg hover:bg-muted font-heading"
                        onClick={() => setShareOpen(false)}
                      >
                        <Send className="w-4 h-4" /> Share on Telegram
                      </a>
                      <button
                        onClick={() => { handleCopyLink(); setShareOpen(false); }}
                        className="w-full flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-lg hover:bg-muted font-heading"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy link'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Author controls */}
                {user && user.id === post.author_id && (
                  <div className="flex items-center gap-2">
                    <Link to={`/blog/edit/${post.id}`}
                      className="flex items-center gap-1 text-sm font-heading px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button onClick={handleDelete}
                      className="flex items-center gap-1 text-sm font-heading px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Cover image */}
          {post.cover_image && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={post.cover_image}
              alt={post.title}
              className="w-full rounded-xl mb-8 object-cover max-h-96"
            />
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose-custom mb-12"
          >
            {post.content.split('\n').map((paragraph, i) => (
              paragraph.trim() ? (
                <p key={i} className="text-foreground/90 leading-relaxed mb-4 text-base font-body">
                  {paragraph}
                </p>
              ) : <br key={i} />
            ))}
          </motion.div>

          {/* Like CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 py-8 border-y border-border mb-12"
          >
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 text-base font-heading px-6 py-3 rounded-xl border transition-all ${
                liked ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'border-border text-muted-foreground hover:border-red-500/30 hover:text-red-400'
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-red-400' : ''}`} />
              {liked ? 'Liked!' : 'Like this post'} · {likeCount}
            </button>
          </motion.div>

          {/* Comments */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              Comments ({comments.length})
            </h2>

            {/* Comment form */}
            <form onSubmit={handleComment} className="glass-card rounded-xl p-6 mb-8 space-y-4">
              <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wide">Leave a comment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading text-muted-foreground mb-1.5">Name *</label>
                  <input
                    type="text"
                    value={commentForm.author_name}
                    onChange={(e) => setCommentForm((f) => ({ ...f, author_name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    maxLength={100}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading text-muted-foreground mb-1.5">Email (optional)</label>
                  <input
                    type="email"
                    value={commentForm.author_email}
                    onChange={(e) => setCommentForm((f) => ({ ...f, author_email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-heading text-muted-foreground mb-1.5">Comment *</label>
                <textarea
                  value={commentForm.content}
                  onChange={(e) => setCommentForm((f) => ({ ...f, content: e.target.value }))}
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  maxLength={2000}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submittingComment}
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-heading font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {submittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </form>

            {/* Comments list */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8">No comments yet. Be the first!</p>
              ) : (
                comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-xl p-5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading font-semibold text-sm text-foreground">{comment.author_name}</span>
                      <span className="text-xs text-muted-foreground font-heading">
                        {new Date(comment.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed font-body">{comment.content}</p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.section>
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

export default BlogPostPage;
