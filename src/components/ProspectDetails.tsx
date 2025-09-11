import React, { useState } from 'react';
import { X, Globe, Linkedin, ExternalLink, MapPin, Calendar, Users, Building, DollarSign, FileText, MessageCircle, Star, Copy, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface ProspectDetailsProps {
  prospect: any;
  onClose: () => void;
}

const ProspectDetails: React.FC<ProspectDetailsProps> = ({ prospect, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const [commentType, setCommentType] = useState('comment');

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl shadow-2xl border border-border max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-card border-b border-border p-6">
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
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="text-sm font-medium">{companyInfo.rating}</span>
                    <span className="text-xs text-muted-foreground">({companyInfo.reviews} reviews)</span>
                  </div>
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
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-5 w-5" />
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
            </div>

            {/* Right Column - Location & Quick Actions */}
            <div className="space-y-6">
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

              {/* Quick Actions */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full gap-2 bg-gradient-primary hover:shadow-glow">
                    <Phone className="h-4 w-4" />
                    Schedule Call
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Mail className="h-4 w-4" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Copy className="h-4 w-4" />
                    Export Data
                  </Button>
                  <Separator />
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Mark as Verified
                    </Button>
                    <Button variant="outline" size="sm" className="w-full text-destructive">
                      Exclude Prospect
                    </Button>
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
    </div>
  );
};

export default ProspectDetails;