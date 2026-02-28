"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ChevronUp, User, Clock, MessageSquare, Send, TerminalSquare } from 'lucide-react';
import { TerminalLayout } from '../../../components/TerminalLayout';
import { MOCK_FEATURE_REQUESTS, MOCK_USERS } from '../../../data/mock';
import { FeatureRequest, FeatureRequestStatus, Comment } from '../../../types';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import { Badge } from '../../../components/ui/badge';
import { formatDate } from '../../../lib/utils';

// Local mock fallback to guarantee safe rendering if MOCK_COMMENTS isn't strictly exported
const FALLBACK_COMMENTS: Comment[] = [
  { id: "c_001", featureRequestId: "fr_101", authorId: "u_003", content: "We absolutely need this for our CI/CD pipelines. Passwords are too risky to hardcode.", createdAt: "2023-10-26T08:15:00Z" },
  { id: "c_002", featureRequestId: "fr_101", authorId: "u_005", content: "Agreed. I've been waiting for this feature for months. Any timeline on when it moves to in-progress?", createdAt: "2023-10-27T14:20:00Z" },
  { id: "c_003", featureRequestId: "fr_102", authorId: "u_002", content: "This is a must-have. My retinas are burning.", createdAt: "2023-10-21T09:00:00Z" },
];

export default function DetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [request, setRequest] = useState<FeatureRequest | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    let mounted = true;
    Promise.resolve().then(() => {
      if (!mounted) return;
      const found = MOCK_FEATURE_REQUESTS.find(r => r.id === id);
      if (found) {
        setRequest(found);
        setComments(FALLBACK_COMMENTS.filter(c => c.featureRequestId === id));
      }
    });
    return () => { mounted = false; };
  }, [id]);

  const handleUpvote = () => {
    if (request) {
      setRequest({ ...request, upvotes: request.upvotes + 1 });
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !request) return;

    const newC: Comment = {
      id: `c_new_${Date.now()}`,
      featureRequestId: request.id,
      authorId: "u_001", // Assuming admin role for demo
      content: newComment,
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, newC]);
    setNewComment("");
  };

  const getAuthorName = (authorId: string) => {
    return MOCK_USERS.find(u => u.id === authorId)?.name || 'unknown_user';
  };

  const getBadgeVariant = (status: FeatureRequestStatus) => {
    switch(status) {
      case 'open': return 'outline';
      case 'planned': return 'warning';
      case 'in-progress': return 'default';
      case 'completed': return 'success';
      case 'declined': return 'destructive';
      default: return 'outline';
    }
  };

  if (!request) {
    return (
      <TerminalLayout activeRoute="detail">
         <div className="flex flex-col items-center justify-center py-32 text-center">
            <TerminalSquare className="w-16 h-16 text-primary/30 mb-4" />
            <h2 className="text-2xl font-bold mb-2 uppercase tracking-widest">ERR: 404_NOT_FOUND</h2>
            <p className="text-primary/60 mb-8 uppercase">The requested data block could not be located in memory.</p>
            <Button onClick={() => router.push('/')} variant="outline"><ArrowLeft className="w-4 h-4 mr-2"/> Return to Base</Button>
         </div>
      </TerminalLayout>
    );
  }

  return (
    <TerminalLayout activeRoute="detail">
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        <header className="flex flex-col gap-6 border-b border-primary/30 pb-6">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors text-sm uppercase self-start">
            <ArrowLeft className="w-4 h-4" /> CD ..
          </button>
          
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-primary leading-tight">{request.title}</h1>
              <Button 
                variant="solid" 
                size="lg" 
                className="gap-2 shrink-0 px-6"
                onClick={handleUpvote}
              >
                <ChevronUp className="w-5 h-5" />
                <span className="text-lg">{request.upvotes}</span>
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-primary/60 uppercase">
              <Badge variant={getBadgeVariant(request.status)} className="px-3 py-1 text-sm">{request.status}</Badge>
              <div className="flex items-center gap-1.5 border-l border-primary/30 pl-4">
                <User className="w-4 h-4" />
                <span>{getAuthorName(request.authorId)}</span>
              </div>
              <div className="flex items-center gap-1.5 border-l border-primary/30 pl-4">
                <Clock className="w-4 h-4" />
                <span>{formatDate(request.createdAt)}</span>
              </div>
            </div>
          </div>
        </header>

        <section className="bg-primary/5 border border-primary/20 p-6 md:p-8 text-lg leading-relaxed text-primary/90 shadow-[inset_0_0_20px_rgba(0,255,0,0.05)]">
          {request.description}
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-primary/30 pb-3">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold uppercase tracking-widest">Thread_Log</h3>
            <Badge variant="outline" className="ml-auto">{comments.length} ENTRIES</Badge>
          </div>

          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border border-primary/20 bg-black p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-primary/10 pb-2 text-xs text-primary/50 uppercase">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <span className="text-primary/70">{getAuthorName(comment.authorId)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(comment.createdAt)}</span>
                  </div>
                </div>
                <p className="text-sm text-primary/80">{comment.content}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="mt-4 flex flex-col gap-4 border border-primary/30 p-4 bg-primary/5">
            <label className="text-sm uppercase tracking-wider text-primary/80 flex items-center gap-2">
              <span className="text-primary">$</span> APPEND_COMMENT
            </label>
            <Textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Type your transmission here..."
              className="min-h-[100px] bg-black"
            />
            <Button type="submit" className="self-end gap-2" disabled={!newComment.trim()}>
              <Send className="w-4 h-4" />
              TRANSMIT
            </Button>
          </form>
        </section>
      </div>
    </TerminalLayout>
  );
}
