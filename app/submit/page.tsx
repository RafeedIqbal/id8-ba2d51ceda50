"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal, ArrowLeft } from 'lucide-react';
import { TerminalLayout } from '../../components/TerminalLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';

export default function SubmitPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 20) + 10;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          router.push('/');
        }, 500);
      }
      setProgress(currentProgress);
    }, 150);
  };

  return (
    <TerminalLayout activeRoute="submit">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <header className="border-b border-primary/30 pb-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors text-sm uppercase mb-4">
            <ArrowLeft className="w-4 h-4" /> Cancel_Process
          </button>
          <h1 className="text-2xl font-bold uppercase tracking-widest">{"// Initialize_New_Request"}</h1>
          <p className="text-primary/60 text-sm mt-1">Define the parameters for your feature proposal.</p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm uppercase tracking-wider text-primary/80 flex items-center gap-2">
              <span className="text-primary">$</span> SET TITLE
            </label>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a concise name for the feature..."
              disabled={isSubmitting}
              required
              className="text-lg h-12"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm uppercase tracking-wider text-primary/80 flex items-center gap-2">
              <span className="text-primary">$</span> SET DESCRIPTION
            </label>
            <Textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail the use case, benefits, and specifications..."
              disabled={isSubmitting}
              required
              className="min-h-[200px] text-base leading-relaxed p-4"
            />
          </div>

          <div className="pt-4">
            {isSubmitting ? (
              <div className="w-full flex flex-col gap-2">
                <div className="flex justify-between text-xs uppercase tracking-widest">
                  <span>Executing Sequence...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-4 bg-primary/10 border border-primary/40 relative overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-primary transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <Button 
                type="submit" 
                size="lg" 
                variant="solid"
                className="w-full gap-3 text-lg h-14"
              >
                <Terminal className="w-6 h-6" />
                EXECUTE_SUBMISSION
              </Button>
            )}
          </div>
        </form>
      </div>
    </TerminalLayout>
  );
}
