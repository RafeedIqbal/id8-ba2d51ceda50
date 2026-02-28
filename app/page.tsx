"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronUp, User, Clock } from 'lucide-react';
import { TerminalLayout } from '../components/TerminalLayout';
import { MOCK_FEATURE_REQUESTS, MOCK_USERS } from '../data/mock';
import { FeatureRequest, FeatureRequestStatus } from '../types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { formatDate } from '../lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<FeatureRequest[]>(MOCK_FEATURE_REQUESTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("upvotes");

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRequests(prev => prev.map(req =>
      req.id === id ? { ...req, upvotes: req.upvotes + 1 } : req
    ));
  };

  const filteredRequests = useMemo(() => {
    let result = [...requests];
    if (statusFilter !== 'all') {
      result = result.filter(r => r.status === statusFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.description.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'upvotes') {
      result.sort((a, b) => b.upvotes - a.upvotes);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return result;
  }, [requests, statusFilter, search, sortBy]);

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

  return (
    <TerminalLayout activeRoute="dashboard">
      <div className="flex flex-col gap-6">
        <header className="border-b border-primary/30 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-widest">{"// Feature_Requests"}</h1>
            <p className="text-primary/60 text-sm mt-1">Execute queries to filter and sort platform ideas.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
              <Input 
                placeholder="grep -i 'search...'" 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <select 
                className="flex h-10 w-full sm:w-auto border border-primary/50 bg-black px-3 py-2 text-sm text-primary focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(0,255,0,0.4)] appearance-none cursor-pointer uppercase"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">STATUS=ALL</option>
                <option value="open">STATUS=OPEN</option>
                <option value="planned">STATUS=PLANNED</option>
                <option value="in-progress">STATUS=IN_PROGRESS</option>
                <option value="completed">STATUS=COMPLETED</option>
                <option value="declined">STATUS=DECLINED</option>
              </select>
              <select 
                className="flex h-10 w-full sm:w-auto border border-primary/50 bg-black px-3 py-2 text-sm text-primary focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(0,255,0,0.4)] appearance-none cursor-pointer uppercase"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="upvotes">SORT=UPVOTES</option>
                <option value="newest">SORT=NEWEST</option>
              </select>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRequests.map(req => (
            <Card key={req.id} className="cursor-pointer group hover:shadow-[0_0_15px_rgba(0,255,0,0.2)] flex flex-col" onClick={() => router.push(`/request/${req.id}`)}>
              <CardHeader className="pb-3 border-b-0">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <Badge variant={getBadgeVariant(req.status)}>{req.status}</Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 gap-1.5 px-2 bg-black hover:bg-primary/20"
                    onClick={(e) => handleUpvote(req.id, e)}
                  >
                    <ChevronUp className="w-3 h-3" />
                    <span>{req.upvotes}</span>
                  </Button>
                </div>
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">{req.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4 flex-grow">
                <p className="text-primary/70 text-sm line-clamp-3 leading-relaxed">
                  {req.description}
                </p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between text-xs text-primary/50 border-t-0 pb-4">
                <div className="flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  <span>{getAuthorName(req.authorId)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(req.createdAt)}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
          {filteredRequests.length === 0 && (
            <div className="col-span-full py-12 text-center text-primary/50 border border-dashed border-primary/30 flex flex-col items-center gap-2">
              <Search className="w-8 h-8 mb-2 opacity-50" />
              <p className="uppercase tracking-widest">NO_RESULTS_FOUND</p>
              <p className="text-sm">Adjust your filter parameters and try again.</p>
            </div>
          )}
        </div>
      </div>
    </TerminalLayout>
  );
}
