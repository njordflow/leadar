import React, { useState } from 'react';
import { ExternalLink, MapPin, Building2, DollarSign, Calendar, Eye, Briefcase, Users, Globe, Star, MessageSquare, Brain, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Job {
  id: number;
  company: string;
  logo: string;
  title: string;
  location: string;
  posted: string;
  deadline: string;
  salary: string;
  type: string;
  remote: boolean;
  website: string;
  description?: string;
  url?: string;
  source?: 'indeed' | 'linkedin';
  aiRating?: number | null;
  aiFeedback?: {
    totalRatings: number;
    lastRated: string;
  } | null;
  ai_match: 'qualified' | 'not_a_match' | 'not_analyzed';
  ai_reasoning: string | null;
  ai_updated_at: string | null;
}

interface JobDetailsProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenProspect?: (companyName: string) => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, open, onOpenChange, onOpenProspect }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  if (!job) return null;

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      toast.error("Please provide a rating");
      return;
    }
    
    // Here would be the API call to save feedback
    toast.success("Thank you for your feedback! This helps improve our AI accuracy.");
    setShowFeedback(false);
    setRating(0);
    setComment('');
    setSelectedCategories([]);
  };

  const feedbackCategories = [
    "Job description accuracy",
    "Salary range estimation", 
    "Company information",
    "Required skills matching",
    "Location details",
    "Remote work options",
    "Job level classification"
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleOpenJobUrl = () => {
    if (job.url) {
      window.open(job.url, '_blank');
    }
  };

  const handleViewProspect = () => {
    if (onOpenProspect) {
      onOpenProspect(job.company);
    }
  };

  const companyInfo = {
    industry: 'Technology & Software',
    size: '51-200 employees',
    revenue: '$10M - $50M',
    founded: '2018',
    description: `${job.company} develops innovative solutions for modern businesses. Their technology helps companies streamline operations and improve efficiency through advanced automation and data analytics.`
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`https://logo.clearbit.com/${job.website}`} />
              <AvatarFallback className="bg-primary-light text-primary font-medium">
                {job.logo}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-muted-foreground">{job.company}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* AI Analysis */}
          <Card className={`border-2 ${
            job.ai_match === 'qualified' ? 'border-success/30 bg-success/5' :
            job.ai_match === 'not_a_match' ? 'border-destructive/30 bg-destructive/5' :
            'border-muted bg-muted/10'
          }`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Match Status:</span>
                  {job.ai_match === 'qualified' && (
                    <Badge variant="default" className="bg-success text-white border-success">
                      Qualified
                    </Badge>
                  )}
                  {job.ai_match === 'not_a_match' && (
                    <Badge variant="destructive" className="bg-destructive text-white border-destructive">
                      Not a Match
                    </Badge>
                  )}
                  {job.ai_match === 'not_analyzed' && (
                    <Badge variant="outline" className="bg-muted text-muted-foreground border-muted-foreground/20">
                      Not Analyzed
                    </Badge>
                  )}
                </div>
                {job.ai_updated_at && (
                  <span className="text-xs text-muted-foreground">
                    Updated {new Date(job.ai_updated_at).toLocaleDateString()}
                  </span>
                )}
              </div>
              
              {job.ai_reasoning && job.ai_match !== 'not_analyzed' && (
                <div className="space-y-2">
                  <span className="text-sm font-medium">Reasoning:</span>
                  <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
                    {job.ai_reasoning}
                  </p>
                </div>
              )}
              
              {job.ai_match === 'not_analyzed' && (
                <p className="text-sm text-muted-foreground italic">
                  This job hasn't been analyzed by our AI yet.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Current AI Rating */}
          {job.aiRating && job.aiFeedback && (
            <Card className="border-primary/20 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-lg">{job.aiRating.toFixed(1)}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      AI Analysis Rating • {job.aiFeedback.totalRatings} reviews • Updated {job.aiFeedback.lastRated}
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                    Community Verified
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <Button 
              variant="default" 
              className="gap-2"
              onClick={handleOpenJobUrl}
              disabled={!job.url}
            >
              <ExternalLink className="h-4 w-4" />
              Open Job
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleViewProspect}>
              <Eye className="h-4 w-4" />
              View Prospect
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary" 
              onClick={() => setShowFeedback(!showFeedback)}
            >
              <Brain className="h-4 w-4" />
              {job.aiRating ? 'Update Rating' : 'Rate AI Accuracy'}
            </Button>
          </div>

          {/* AI Feedback Form */}
          {showFeedback && (
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Brain className="h-5 w-5" />
                  Help Improve Our AI
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Your feedback helps us train our AI to find better job matches. Rate the accuracy of this job analysis.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">How accurate is this job analysis? *</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star 
                          className={`h-7 w-7 transition-colors ${
                            star <= rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300 hover:text-yellow-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {rating === 1 && "🔴 Very poor match - Major issues with analysis"}
                    {rating === 2 && "🟠 Poor match - Several inaccuracies"}
                    {rating === 3 && "🟡 Okay match - Some issues to address"}
                    {rating === 4 && "🟢 Good match - Minor improvements needed"}
                    {rating === 5 && "✨ Excellent match - Highly accurate analysis"}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">What aspects need improvement? (Select all that apply)</Label>
                  <div className="flex flex-wrap gap-2">
                    {feedbackCategories.map((category) => (
                      <Button
                        key={category}
                        type="button"
                        variant={selectedCategories.includes(category) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleCategory(category)}
                        className="gap-1 text-xs"
                      >
                        {selectedCategories.includes(category) && <CheckCircle2 className="h-3 w-3" />}
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-comment" className="text-sm font-medium">
                    Additional feedback (Optional)
                  </Label>
                  <Textarea
                    id="feedback-comment"
                    placeholder="Describe specific issues or suggestions for improvement..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={handleSubmitFeedback}
                    className="gap-2"
                    disabled={rating === 0}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Submit Feedback
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowFeedback(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Separator />

          {/* Job Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Job Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Job Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{job.location}</span>
                      {job.remote && (
                        <Badge variant="outline" className="ml-2 text-xs bg-success-light text-success border-success/20">
                          Remote
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Posted {job.posted}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="outline" className="bg-secondary-light text-secondary border-secondary/20">
                        {job.type}
                      </Badge>
                    </div>
                    {job.source && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Source:</span>
                        <Badge variant="outline" className="capitalize">
                          {job.source}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Job Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p>{job.description || `We are looking for a talented ${job.title} to join our growing team at ${job.company}. This is an excellent opportunity to work with cutting-edge technologies and contribute to innovative projects that make a real impact.`}</p>
                    
                    <h4>Key Responsibilities:</h4>
                    <ul>
                      <li>Develop and maintain high-quality software solutions</li>
                      <li>Collaborate with cross-functional teams to deliver projects</li>
                      <li>Participate in code reviews and technical discussions</li>
                      <li>Contribute to architecture and design decisions</li>
                    </ul>

                    <h4>Requirements:</h4>
                    <ul>
                      <li>Bachelor's degree in Computer Science or related field</li>
                      <li>3+ years of relevant experience</li>
                      <li>Strong problem-solving and communication skills</li>
                      <li>Experience with modern development frameworks</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Company Info Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Company Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Industry</p>
                      <p className="text-sm">{companyInfo.industry}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Company Size</p>
                      <p className="text-sm flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {companyInfo.size}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                      <p className="text-sm">{companyInfo.revenue}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Founded</p>
                      <p className="text-sm">{companyInfo.founded}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                    <p className="text-sm text-muted-foreground">{companyInfo.description}</p>
                  </div>

                  <div className="pt-2 space-y-2">
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Globe className="h-3 w-3" />
                      Visit Website
                    </Button>
                    <Button variant="outline" size="sm" className="w-full gap-2" onClick={handleViewProspect}>
                      <Eye className="h-3 w-3" />
                      Open Prospect
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetails;