## Goal

Make the blog admin-only (just you) and remove all sign-in/sign-up UI from public view, while giving you a clear, private place to write and manage posts.

## Changes

### 1. Lock signup to you only
- Disable public signups in the auth settings so no one else can create an account.
- Your existing account stays active — you'll be the only person who can ever sign in.

### 2. Hide auth UI from visitors
- Remove the "Sign In" / "Sign Out" links from the Navbar (desktop + mobile).
- Remove the "New Post" / "Edit" buttons that currently show on the Blog and BlogPost pages.
- Visitors will only see: Blog list, individual posts, like, comment, share. No hint that an admin area exists.

### 3. Hidden admin access for you
- Keep `/blog/auth` as a route but unlinked — you reach it by typing the URL directly (bookmark it).
- After signing in, you get redirected to a new `/blog/admin` dashboard page showing:
  - "New Post" button
  - List of all your posts (drafts + published) with Edit, Publish/Unpublish, and Delete actions
- The existing `/blog/new` and `/blog/edit/:id` editor pages stay, but are only reachable when signed in.

### 4. Route protection
- Wrap `/blog/admin`, `/blog/new`, `/blog/edit/:id` so that if you're not signed in, you're sent to `/blog/auth`.
- Visitors who somehow land on these URLs see the sign-in page (which only works for your account).

### 5. Small signed-in-only nav helper
- When you (and only you) are signed in, show a small "Admin" link in the Navbar that goes to `/blog/admin`. Visitors never see this because they can never sign in.

## Technical notes

- Use `supabase--configure_auth` with `disable_signup: true`.
- Add a `RequireAuth` wrapper component for admin routes.
- Build a new `src/pages/BlogAdmin.tsx` that queries all `blog_posts` where `author_id = auth.uid()` (RLS already allows this).
- Update `Navbar.tsx` to drop public auth links and conditionally render "Admin" only when `user` is set.
- Update `Blog.tsx` and `BlogPost.tsx` to remove author-only action buttons from the public view (or gate them behind `user &&`).

## What stays the same

- Blog reading, likes, comments, sharing — all unchanged for visitors.
- Your existing posts, likes, and comments in the database — untouched.
