import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  AlertCircle,
  Bookmark,
  Heart,
  Loader2,
  MessageCircle,
  MoreVertical,
  Play,
  Send,
  Share2,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

import { SeekerTabs } from '../kit';
import { useNav } from '../nav';
import { reels as seedReels, type ReelComment, type ReelModel } from '../reelsData';
import {
  reelsFeedIndex,
  setReelsFeedIndex,
  setReportReelId,
  useBlockedCompanies,
} from '../reelsState';
import { toggleSavedJob, useSavedJobIds } from './seekerApp';

function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(n);
}

function ActionBtn({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" className={active ? 'reel-action on' : 'reel-action'} onClick={onClick}>
      <span className="reel-action-icon">{children}</span>
      <em>{label}</em>
    </button>
  );
}

function CommentsSheet({
  reel,
  comments,
  onClose,
  onLikeComment,
  onAddComment,
}: {
  reel: ReelModel;
  comments: ReelComment[];
  onClose: () => void;
  onLikeComment: (id: string) => void;
  onAddComment: (text: string) => void;
}) {
  const [draft, setDraft] = useState('');

  return (
    <div className="reel-comments">
      <button type="button" className="reel-comments-backdrop" aria-label="Close comments" onClick={onClose} />
      <div className="reel-comments-sheet" role="dialog" aria-modal="true" aria-label="Comments">
        <div className="reel-comments-head">
          <div>
            <strong>{formatCount(comments.length)} comments</strong>
            <p>{reel.jobTitle || reel.company}</p>
          </div>
          <button type="button" className="reel-icon-soft" aria-label="Close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="reel-comments-list">
          {comments.length === 0 ? (
            <p className="reel-comments-empty">Be the first to comment.</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="reel-comment">
                <span className="reel-comment-avatar" style={{ background: c.color }}>
                  {c.initials}
                </span>
                <div className="reel-comment-body">
                  <div className="reel-comment-meta">
                    <strong>{c.user}</strong>
                    <span>{c.time}</span>
                  </div>
                  <p>{c.text}</p>
                </div>
                <button
                  type="button"
                  className={c.liked ? 'reel-comment-like on' : 'reel-comment-like'}
                  aria-label="Like comment"
                  onClick={() => onLikeComment(c.id)}
                >
                  <Heart size={14} fill={c.liked ? '#ef4444' : 'none'} color={c.liked ? '#ef4444' : 'currentColor'} />
                  <em>{c.likes}</em>
                </button>
              </div>
            ))
          )}
        </div>

        <form
          className="reel-comments-composer"
          onSubmit={(e) => {
            e.preventDefault();
            const text = draft.trim();
            if (!text) return;
            onAddComment(text);
            setDraft('');
          }}
        >
          <span className="reel-comment-avatar sm" style={{ background: '#4432ff' }}>
            AR
          </span>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a comment…"
            aria-label="Add a comment"
          />
          <button type="submit" className="reel-send" aria-label="Send" disabled={!draft.trim()}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

function ReelSlide({
  reel,
  active,
  load,
  muted,
  liked,
  likeCount,
  commentCount,
  shareCount,
  saved,
  onToggleMute,
  onLike,
  onComment,
  onShare,
  onSave,
  onMore,
}: {
  reel: ReelModel;
  active: boolean;
  load: boolean;
  muted: boolean;
  liked: boolean;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  saved: boolean;
  onToggleMute: () => void;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onSave: () => void;
  onMore: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [shareFlash, setShareFlash] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!load) {
      video.pause();
      setPlaying(false);
      return;
    }

    if (!active || error) {
      video.pause();
      setPlaying(false);
      return;
    }

    const tryPlay = () => {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };

    if (video.readyState >= 2) {
      setLoading(false);
      setHasFrame(true);
      tryPlay();
      return;
    }

    if (!hasFrame) setLoading(true);

    const onReady = () => {
      setLoading(false);
      setHasFrame(true);
      tryPlay();
    };

    video.addEventListener('loadeddata', onReady);
    video.addEventListener('canplay', onReady);
    return () => {
      video.removeEventListener('loadeddata', onReady);
      video.removeEventListener('canplay', onReady);
    };
  }, [active, load, error, hasFrame]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
  }, [muted]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || error || !load) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => undefined);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const handleShare = () => {
    onShare();
    setShareFlash(true);
    window.setTimeout(() => setShareFlash(false), 1400);
  };

  const showSpinner = loading && !error && !hasFrame;

  return (
    <article className="reel-slide">
      <div className="reel-video-shell" onClick={togglePlay}>
        <video
          ref={videoRef}
          className="reel-video"
          src={load ? reel.videoUrl : undefined}
          playsInline
          loop
          muted={muted}
          preload={active ? 'auto' : load ? 'metadata' : 'none'}
          onLoadStart={() => {
            if (!hasFrame) setLoading(true);
            setError(false);
          }}
          onLoadedData={() => {
            setHasFrame(true);
            setLoading(false);
            setError(false);
          }}
          onCanPlay={() => {
            setLoading(false);
            setError(false);
          }}
          onPlaying={() => {
            setLoading(false);
            setHasFrame(true);
            setPlaying(true);
            setError(false);
          }}
          onWaiting={() => {
            const video = videoRef.current;
            if (video && video.readyState < 2 && !hasFrame) setLoading(true);
          }}
          onPause={() => setPlaying(false)}
          onError={() => {
            setLoading(false);
            setError(true);
            setPlaying(false);
          }}
        />

        {showSpinner ? (
          <div className="reel-state">
            <Loader2 size={28} className="reel-spin" color="#fff" />
          </div>
        ) : null}

        {error ? (
          <div className="reel-state soft">
            <AlertCircle size={22} color="#fff" />
            <p>Video could not load</p>
            <button
              type="button"
              className="reel-retry"
              onClick={(e) => {
                e.stopPropagation();
                setError(false);
                setHasFrame(false);
                setLoading(true);
                const video = videoRef.current;
                if (video) {
                  video.load();
                  if (active) {
                    video.play().catch(() => setError(true));
                  }
                }
              }}
            >
              Retry
            </button>
          </div>
        ) : null}

        {!playing && !showSpinner && !error && hasFrame ? (
          <div className="reel-play-hint" aria-hidden>
            <Play size={34} fill="#fff" color="#fff" />
          </div>
        ) : null}

        <div className="reel-side" onClick={(e) => e.stopPropagation()}>
          <ActionBtn label={formatCount(likeCount)} active={liked} onClick={onLike}>
            <Heart size={26} fill={liked ? '#ef4444' : 'none'} color={liked ? '#ef4444' : '#fff'} />
          </ActionBtn>
          <ActionBtn label={formatCount(commentCount)} onClick={onComment}>
            <MessageCircle size={26} color="#fff" />
          </ActionBtn>
          <ActionBtn label={saved ? 'Saved' : 'Save'} active={saved} onClick={onSave}>
            <Bookmark size={24} fill={saved ? '#fff' : 'none'} color="#fff" />
          </ActionBtn>
          <ActionBtn label={shareFlash ? 'Shared' : formatCount(shareCount)} onClick={handleShare}>
            <Share2 size={24} color="#fff" />
          </ActionBtn>
          <ActionBtn label={muted ? 'Mute' : 'Unmute'} onClick={onToggleMute}>
            {muted ? <VolumeX size={24} color="#fff" /> : <Volume2 size={24} color="#fff" />}
          </ActionBtn>
          <ActionBtn label="More" onClick={onMore}>
            <MoreVertical size={24} color="#fff" />
          </ActionBtn>
        </div>
      </div>
    </article>
  );
}

/** Jobseeker Posts tab — videos with like, comment, share, save, and more. */
export function Reels() {
  const nav = useNav();
  const savedIds = useSavedJobIds();
  const { blocked } = useBlockedCompanies();
  const [muted, setMuted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(() => reelsFeedIndex);
  const [items, setItems] = useState(() =>
    seedReels.map((r) => ({ ...r, commentList: r.commentList.map((c) => ({ ...c })) })),
  );
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [likeDelta, setLikeDelta] = useState<Record<string, number>>({});
  const [shareBump, setShareBump] = useState<Record<string, number>>({});
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState('');
  const [commentsOpenFor, setCommentsOpenFor] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const wrappingRef = useRef(false);
  const restoredRef = useRef(false);

  const visibleItems = items.filter((r) => !blocked.has(r.company));

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 1600);
  };

  // Extra clone of the first reel at the end so swipe-after-last returns to video 1.
  const feedItems = visibleItems.length > 0 ? [...visibleItems, visibleItems[0]] : [];

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed || restoredRef.current || visibleItems.length === 0) return;
    const index = Math.min(reelsFeedIndex, visibleItems.length - 1);
    restoredRef.current = true;
    feed.scrollTop = index * feed.clientHeight;
    setActiveIndex(index);
  }, [visibleItems.length]);

  const onScroll = useCallback(() => {
    const feed = feedRef.current;
    if (!feed || wrappingRef.current || visibleItems.length === 0) return;

    const h = feed.clientHeight || 1;
    const next = Math.round(feed.scrollTop / h);

    // Reached the cloned first reel → jump back to the real first video.
    if (next >= visibleItems.length) {
      wrappingRef.current = true;
      feed.style.scrollSnapType = 'none';
      feed.scrollTop = 0;
      setActiveIndex(0);
      setReelsFeedIndex(0);
      requestAnimationFrame(() => {
        feed.style.scrollSnapType = '';
        wrappingRef.current = false;
      });
      return;
    }

    const clamped = Math.max(0, Math.min(visibleItems.length - 1, next));
    setActiveIndex(clamped);
    setReelsFeedIndex(clamped);
  }, [visibleItems.length]);

  const activeCommentsReel = items.find((r) => r.id === commentsOpenFor) ?? null;

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = !prev[id];
      setLikeDelta((d) => ({ ...d, [id]: (d[id] ?? 0) + (next ? 1 : -1) }));
      return { ...prev, [id]: next };
    });
  };

  const likeComment = (reelId: string, commentId: string) => {
    setItems((list) =>
      list.map((reel) => {
        if (reel.id !== reelId) return reel;
        return {
          ...reel,
          commentList: reel.commentList.map((c) => {
            if (c.id !== commentId) return c;
            const likedNow = !c.liked;
            return { ...c, liked: likedNow, likes: c.likes + (likedNow ? 1 : -1) };
          }),
        };
      }),
    );
  };

  const addComment = (reelId: string, text: string) => {
    setItems((list) =>
      list.map((reel) => {
        if (reel.id !== reelId) return reel;
        const next: ReelComment = {
          id: `new-${Date.now()}`,
          user: 'ananya.rao',
          initials: 'AR',
          color: '#4432ff',
          text,
          likes: 0,
          time: 'now',
        };
        return {
          ...reel,
          comments: reel.comments + 1,
          commentList: [next, ...reel.commentList],
        };
      }),
    );
  };

  return (
    <div className="reels-screen">
      <div className="reels-feed" ref={feedRef} onScroll={onScroll}>
        {visibleItems.length === 0 ? (
          <div className="reels-empty">
            <p>No posts to show</p>
          </div>
        ) : null}
        {feedItems.map((reel, index) => {
          const isClone = index >= visibleItems.length;
          const logicalIndex = isClone ? 0 : index;
          const nearActive =
            Math.abs(logicalIndex - activeIndex) <= 1 ||
            (activeIndex === visibleItems.length - 1 && logicalIndex === 0);

          const isSaved = reel.jobId ? savedIds.has(reel.jobId) : Boolean(bookmarked[reel.id]);

          return (
            <ReelSlide
              key={isClone ? `${reel.id}-loop` : reel.id}
              reel={reel}
              active={!isClone && index === activeIndex && !commentsOpenFor}
              load={nearActive || (!isClone && index === activeIndex)}
              muted={muted}
              liked={Boolean(liked[reel.id])}
              likeCount={reel.likes + (likeDelta[reel.id] ?? 0)}
              commentCount={reel.commentList.length}
              shareCount={reel.shares + (shareBump[reel.id] ?? 0)}
              saved={isSaved}
              onToggleMute={() => setMuted((m) => !m)}
              onLike={() => toggleLike(reel.id)}
              onComment={() => setCommentsOpenFor(reel.id)}
              onShare={() => setShareBump((s) => ({ ...s, [reel.id]: (s[reel.id] ?? 0) + 1 }))}
              onSave={() => {
                if (reel.jobId) {
                  const wasSaved = savedIds.has(reel.jobId);
                  toggleSavedJob(reel.jobId);
                  showToast(wasSaved ? 'Removed from saved' : 'Post saved');
                } else {
                  const next = !bookmarked[reel.id];
                  setBookmarked((prev) => ({ ...prev, [reel.id]: next }));
                  showToast(next ? 'Post saved' : 'Removed from saved');
                }
              }}
              onMore={() => {
                setReportReelId(reel.id);
                setReelsFeedIndex(activeIndex);
                nav.push('js-report-post');
              }}
            />
          );
        })}
      </div>

      {activeCommentsReel ? (
        <CommentsSheet
          reel={activeCommentsReel}
          comments={activeCommentsReel.commentList}
          onClose={() => setCommentsOpenFor(null)}
          onLikeComment={(id) => likeComment(activeCommentsReel.id, id)}
          onAddComment={(text) => addComment(activeCommentsReel.id, text)}
        />
      ) : null}

      {toast ? <div className="reel-toast">{toast}</div> : null}

      <SeekerTabs active="js-reels" />
    </div>
  );
}
