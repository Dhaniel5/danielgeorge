import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, Eye, EyeOff, ArrowLeft, X, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

const BlogEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    tags: [] as string[],
    published: false,
  });
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate('/blog');
  }, [user, authLoading]);

  useEffect(() => {
    if (isEditing && id) fetchPost(id);
  }, [id]);

  const fetchPost = async (postId: string) => {
    const { data } = await supabase.from('blog_posts').select('*').eq('id', postId).single();
    if (data) {
      setForm({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || '',
        content: data.content,
        cover_image: data.cover_image || '',
        tags: data.tags || [],
        published: data.published,
      });
    }
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((f) => ({ ...f, title, slug: !isEditing ? generateSlug(title) : f.slug }));
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) {
      setForm((f) => ({ ...f, tags: [...f.tags, tag] }));
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  };

  const handleSave = async (published?: boolean) => {
    if (!user) return;
    if (!form.title.trim() || !form.content.trim()) {
      toast({ title: 'Title and content are required.', variant: 'destructive' });
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim() || generateSlug(form.title),
      excerpt: form.excerpt.trim() || null,
      content: form.content.trim(),
      cover_image: form.cover_image.trim() || null,
      tags: form.tags,
      published: published !== undefined ? published : form.published,
      author_id: user.id,
    };

    let error;
    if (isEditing && id) {
      ({ error } = await supabase.from('blog_posts').update(payload).eq('id', id));
    } else {
      ({ error } = await supabase.from('blog_posts').insert(payload));
    }

    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: isEditing ? 'Post updated!' : 'Post saved!' });
      navigate('/blog');
    }
    setSaving(false);
  };

  if (authLoading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground font-heading">Loading...</p></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8 flex-wrap gap-4"
          >
            <button onClick={() => navigate('/blog')} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-heading">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPreview((p) => !p)}
                className="inline-flex items-center gap-2 text-sm font-heading px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
              >
                {preview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {preview ? 'Edit' : 'Preview'}
              </button>
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="inline-flex items-center gap-2 text-sm font-heading px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="inline-flex items-center gap-2 text-sm font-heading px-5 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {saving ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </motion.div>

          {preview ? (
            <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-8">
              <h1 className="font-heading text-3xl font-bold mb-4">{form.title || 'Untitled'}</h1>
              {form.excerpt && <p className="text-muted-foreground mb-6 italic">{form.excerpt}</p>}
              {form.content.split('\n').map((p, i) =>
                p.trim() ? <p key={i} className="text-foreground/90 leading-relaxed mb-4 font-body">{p}</p> : <br key={i} />
              )}
            </motion.div>
          ) : (
            <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Title */}
              <div className="glass-card rounded-xl p-6 space-y-4">
                <div>
                  <label className="block text-xs font-heading text-muted-foreground mb-1.5 uppercase tracking-wide">Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={handleTitleChange}
                    placeholder="Your post title..."
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-xl font-heading font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading text-muted-foreground mb-1.5 uppercase tracking-wide">Slug</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                    placeholder="post-url-slug"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading text-muted-foreground mb-1.5 uppercase tracking-wide">Excerpt</label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                    placeholder="Short summary of your post..."
                    rows={2}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    maxLength={300}
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading text-muted-foreground mb-1.5 uppercase tracking-wide">Cover Image URL</label>
                  <input
                    type="url"
                    value={form.cover_image}
                    onChange={(e) => setForm((f) => ({ ...f, cover_image: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {form.cover_image && (
                    <img src={form.cover_image} alt="Cover preview" className="mt-2 w-full h-32 object-cover rounded-lg" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  )}
                </div>
                {/* Tags */}
                <div>
                  <label className="block text-xs font-heading text-muted-foreground mb-1.5 uppercase tracking-wide">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 text-xs font-heading px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-destructive transition-colors ml-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add tag..."
                      className="flex-1 px-3 py-1.5 bg-background border border-border rounded-lg text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <button onClick={addTag} className="px-3 py-1.5 bg-muted rounded-lg text-sm font-heading hover:bg-muted/80 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="glass-card rounded-xl p-6">
                <label className="block text-xs font-heading text-muted-foreground mb-1.5 uppercase tracking-wide">Content *</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  placeholder="Write your post here..."
                  rows={20}
                  className="w-full px-3 py-3 bg-background border border-border rounded-lg text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y leading-relaxed"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
