import React, { useState } from 'react';
import { X, Globe, Linkedin, ExternalLink, MapPin, Calendar, Users, Building, DollarSign, FileText, MessageCircle, Star, Copy, Phone, Mail, AlertTriangle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';

interface ProspectDetailsProps {
  prospect: any;
  onClose: () => void;
}

// Prospect Rating Component
const ProspectRating: React.FC = () => {
  const [selectedRating, setSelectedRating] = useState<'positive' | 'negative' | null>(null);
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(false);

  const handleRatingClick = (rating: 'positive' | 'negative') => {
    setSelectedRating(rating);
    setShowComment(rating === 'negative');
    
    if (rating === 'positive') {
      setComment('');
      // Submit positive feedback immediately
      toast.success("Thanks for your feedback! This helps improve future prospect evaluation.");
    }
  };

  const handleSubmitComment = () => {
    if (!comment.trim()) {
      toast.error("Please explain what was wrong with this prospect");
      return;
    }
    // Submit negative feedback with comment
    toast.success("Thanks for your detailed feedback! This helps improve our prospect evaluation.");
    setSelectedRating(null);
    setComment('');
    setShowComment(false);
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">
          Rate this prospect to help improve future searches
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleRatingClick('positive')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all hover:scale-105 ${
              selectedRating === 'positive'
                ? 'border-emerald-300 bg-emerald-50 text-emerald-700' 
                : 'border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/30'
            }`}
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="text-sm font-medium">Good</span>
          </button>
          
          <button
            onClick={() => handleRatingClick('negative')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all hover:scale-105 ${
              selectedRating === 'negative'
                ? 'border-rose-300 bg-rose-50 text-rose-700' 
                : 'border-gray-200 hover:border-rose-200 hover:bg-rose-50/30'
            }`}
          >
            <ThumbsDown className="h-4 w-4" />
            <span className="text-sm font-medium">Poor</span>
          </button>
        </div>
      </div>
      
      {showComment && (
        <div className="space-y-3 p-4 bg-rose-50 border border-rose-200 rounded-lg">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-rose-600" />
            <span className="text-sm font-medium text-rose-700">
              Help us improve - what went wrong?
            </span>
          </div>
          <Textarea
            placeholder="Please describe what was inaccurate about this prospect..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[80px] resize-none border-rose-200 focus:border-rose-400"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSubmitComment} className="gap-1">
              <MessageCircle className="h-3 w-3" />
              Submit Feedback
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => {
                setShowComment(false);
                setSelectedRating(null);
                setComment('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const ProspectDetails: React.FC<ProspectDetailsProps> = ({ prospect, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const [commentType, setCommentType] = useState('comment');
  const [actionDialog, setActionDialog] = useState<{ open: boolean; type: string; title: string } | null>(null);
  const [actionComment, setActionComment] = useState('');
  const { toast: useToastHook } = useToast();

  const jobs = [
    {
      id: 1,
      source: 'Indeed',
      title: 'Truck Driver and Equipment Operator',
      location: 'Utrecht',
      country: 'NL',
      postedAt: '06/17/25',
      url: '#'
    },
    {
      id: 2,
      source: 'Indeed',
      title: 'Truck Driver and Equipment Operator', 
      location: 'Rotterdam',
      country: 'NL',
      postedAt: '06/17/25',
      url: '#'
    },
    {
      id: 3,
      source: 'Indeed',
      title: 'Vrachtwagenchauffeur',
      location: '5644 Eindhoven',
      country: 'NL',
      postedAt: '06/17/25',
      url: '#'
    },
    {
      id: 4,
      source: 'LinkedIn',
      title: 'Truck Driver and Equipment Operator',
      location: 'Netherlands',
      country: 'NL',
      postedAt: '06/15/25',
      url: '#'
    }
  ];

  const comments = [
    {
      id: 1,
      author: 'Alex Johnson',
      type: 'note',
      content: 'High-potential prospect. Company is expanding rapidly in EU market.',
      createdAt: '2 hours ago'
    },
    {
      id: 2,
      author: 'Sarah Wilson',
      type: 'call',
      content: 'Spoke with HR manager. They are interested in our automation solutions.',
      createdAt: '1 day ago'
    }
  ];

  const companyInfo = {
    website: prospect.website,
    industry: 'Agricultural Technology & Robotics',
    size: '51-200 employees',
    revenue: '$10M - $50M',
    country: 'United States',
    headquarters: '2211 Elliott Ave, Seattle, WA 98121',
    founded: '2018',
    description: 'Carbon Robotics develops AI-powered robotic systems for sustainable farming. Their technology helps farmers reduce chemical usage while maintaining crop yields through precision weeding and autonomous field operations.',
    rating: 4.8,
    reviews: 142
  };

  const handleSaveComment = () => {
    if (newComment.trim()) {
      // Here you would save the comment
      setNewComment('');
    }
  };

  const handleActionSubmit = () => {
    if (actionDialog && actionComment.trim()) {
      // Save the action comment
      useToastHook({
        title: "Action completed",
        description: `${actionDialog.type} action completed with comment.`,
      });
      setActionDialog(null);
      setActionComment('');
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="h-4 w-4 text-[#0077B5]" />;
      case 'indeed':
        return <div className="h-4 w-4 bg-[#2164f3] rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">i</span>
        </div>;
      default:
        return <Globe className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative bg-background rounded-2xl shadow-2xl border border-border max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Close button - positioned absolutely in top-right corner */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-[70] h-8 w-8 p-0 rounded-full hover:bg-muted border border-border/20 bg-background/80 backdrop-blur-sm"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Header */}
        <div className="bg-gradient-card border-b border-border p-6 pr-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 ring-4 ring-primary/20">
                <AvatarImage src={`https://logo.clearbit.com/${prospect.website}`} />
                <AvatarFallback className="bg-primary-light text-primary text-xl font-bold">
                  {prospect.logo}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold gradient-text">{prospect.company}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <Badge className={`status-${prospect.status} border`}>
                    {prospect.status.charAt(0).toUpperCase() + prospect.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                Website
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M14.822 10.308a3.018 3.018 0 111.32-4.038 3.006 3.006 0 01-1.32 4.044zM11.6.572c2.47-.901 5.294-.852 7.408.982a3.587 3.587 0 011.023 1.37c.213.69-.749-.07-.88-.168a9.407 9.407 0 00-2.15-1.095C12.837.386 8.897 2.707 6.463 6.316a19.505 19.505 0 00-2.248 5.126 2.918 2.918 0 01-.213.642c-.107.204-.049-.547-.049-.572a15.821 15.821 0 01.43-2.239C5.511 5.34 8.01 2.065 11.6.565zm.037 20.993v-8.763c.249.025.486.037.736.037a6.167 6.167 0 003.219-.895v9.62c0 .822-.15 1.43-.52 1.826A1.874 1.874 0 0113.62 24a1.825 1.825 0 01-1.427-.609c-.368-.404-.56-1.013-.56-1.825z"/>
                </svg>
                Indeed
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Left Column - Company Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    Company Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Industry</p>
                      <p className="font-medium">{companyInfo.industry}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Company Size</p>
                      <p className="font-medium">{companyInfo.size}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="font-medium">{companyInfo.revenue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Founded</p>
                      <p className="font-medium">{companyInfo.founded}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Description</p>
                    <p className="text-sm leading-relaxed">{companyInfo.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Jobs */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Active Job Postings
                    </div>
                    <Badge variant="secondary" className="bg-primary-light text-primary">
                      {jobs.length} jobs
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b bg-muted/50">
                        <tr>
                          <th className="text-left p-4 font-medium text-muted-foreground">Source</th>
                          <th className="text-left p-4 font-medium text-muted-foreground">Job Title</th>
                          <th className="text-left p-4 font-medium text-muted-foreground">Location</th>
                          <th className="text-left p-4 font-medium text-muted-foreground">Posted</th>
                          <th className="text-left p-4 font-medium text-muted-foreground">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobs.map((job) => (
                          <tr key={job.id} className="border-b hover:bg-muted/30 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                {getSourceIcon(job.source)}
                                <span className="text-sm font-medium">{job.source}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <p className="font-medium">{job.title}</p>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">{job.location}, {job.country}</span>
                              </div>
                            </td>
                            <td className="p-4 text-sm text-muted-foreground">{job.postedAt}</td>
                            <td className="p-4">
                              <Button variant="ghost" size="sm" className="gap-1">
                                <ExternalLink className="h-3 w-3" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Comments */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Comments & Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add Comment */}
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <Textarea
                        placeholder="Add a note or comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1"
                      />
                      <div className="flex flex-col gap-2">
                        <Select value={commentType} onValueChange={setCommentType}>
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="comment">Note</SelectItem>
                            <SelectItem value="call">Call</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="meeting">Meeting</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button 
                          onClick={handleSaveComment}
                          disabled={!newComment.trim()}
                          size="sm"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-3">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border rounded-lg p-4 bg-card">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <Badge variant="outline">
                              {comment.type}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Prospect Rating */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Rate This Prospect</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProspectRating />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Quick Actions & Location */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full gap-2 bg-gradient-primary hover:shadow-glow">
                    <Users className="h-4 w-4" />
                    Find people: Apollo.io
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => setActionDialog({ open: true, type: 'Mark as Verified', title: 'Mark as Verified' })}
                  >
                    <Star className="h-4 w-4" />
                    Mark as Verified
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => setActionDialog({ open: true, type: 'Mark as Duplicate', title: 'Mark as Duplicate' })}
                  >
                    <Copy className="h-4 w-4" />
                    Mark as Duplicate
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2 text-destructive hover:bg-destructive/10"
                    onClick={() => setActionDialog({ open: true, type: 'Exclude Prospect', title: 'Exclude Prospect' })}
                  >
                    <X className="h-4 w-4" />
                    Exclude Prospect
                  </Button>
                  <Separator />
                  <Button 
                    variant="destructive" 
                    className="w-full gap-2 bg-destructive hover:bg-destructive/90"
                    onClick={() => setActionDialog({ open: true, type: 'Report an Issue', title: 'Report an Issue' })}
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Report an Issue
                  </Button>
                </CardContent>
              </Card>
              
              {/* Location */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Headquarters</p>
                    <p className="font-medium">{companyInfo.headquarters}</p>
                    <p className="text-sm text-muted-foreground">{companyInfo.country}</p>
                  </div>
                  
                  {/* Map Placeholder */}
                  <div className="w-full h-48 bg-muted rounded-lg border flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Interactive Map</p>
                      <Button variant="outline" size="sm" className="mt-2 gap-2">
                        <ExternalLink className="h-3 w-3" />
                        Open in Google Maps
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a href={`https://${companyInfo.website}`} className="text-sm text-primary hover:underline">
                        {companyInfo.website}
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-[#0077B5]" />
                      <a href="#" className="text-sm text-primary hover:underline">
                        linkedin.com/company/{prospect.linkedin}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Action Dialog */}
      <Dialog open={actionDialog?.open} onOpenChange={(open) => !open && setActionDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{actionDialog?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please provide additional information or reason for this action:
            </p>
            <Textarea
              placeholder="Enter your comment or reason..."
              value={actionComment}
              onChange={(e) => setActionComment(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Cancel
            </Button>
            <Button onClick={handleActionSubmit} disabled={!actionComment.trim()}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProspectDetails;