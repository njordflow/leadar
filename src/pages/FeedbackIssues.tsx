import React, { useState } from 'react';
import { Plus, Search, Filter, MessageSquare, Bug, Lightbulb, AlertCircle, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

const FeedbackIssues = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState('current');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  
  // Form state for creating new feedback
  const [newFeedback, setNewFeedback] = useState({
    title: '',
    description: '',
    type: 'bug', // bug, feature, improvement, feedback
    priority: 'medium' // low, medium, high, critical
  });

  const feedbackTypes = {
    bug: { label: 'Bug Report', icon: Bug, color: 'bg-red-100 text-red-800 border-red-200' },
    feature: { label: 'Feature Request', icon: Lightbulb, color: 'bg-blue-100 text-blue-800 border-blue-200' },
    improvement: { label: 'Improvement', icon: AlertCircle, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    feedback: { label: 'General Feedback', icon: MessageSquare, color: 'bg-green-100 text-green-800 border-green-200' }
  };

  const statusConfig = {
    open: { label: 'Open', icon: Clock, color: 'bg-gray-100 text-gray-800 border-gray-200' },
    'in-progress': { label: 'In Progress', icon: Clock, color: 'bg-blue-100 text-blue-800 border-blue-200' },
    resolved: { label: 'Resolved', icon: CheckCircle, color: 'bg-green-100 text-green-800 border-green-200' },
    closed: { label: 'Closed', icon: XCircle, color: 'bg-gray-100 text-gray-800 border-gray-200' }
  };

  // Mock data
  const issues = [
    {
      id: 1,
      title: 'Search functionality not working properly',
      description: 'When searching for prospects, the results are not filtering correctly. Sometimes it shows all results instead of filtered ones.',
      type: 'bug',
      priority: 'high',
      status: 'open',
      project: 'LeadFlow CRM',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Add bulk export feature for prospects',
      description: 'It would be helpful to have a bulk export feature that allows exporting multiple prospects at once with customizable fields.',
      type: 'feature',
      priority: 'medium',
      status: 'in-progress',
      project: 'LeadFlow CRM',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12'
    },
    {
      id: 3,
      title: 'Improve loading speed of dashboard',
      description: 'The dashboard takes too long to load, especially when there are many prospects. Consider implementing pagination or lazy loading.',
      type: 'improvement',
      priority: 'medium',
      status: 'resolved',
      project: 'LeadFlow CRM',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-14'
    },
    {
      id: 4,
      title: 'Love the new filtering options!',
      description: 'The new quick filters for prospects are really helpful. Makes it much easier to find specific leads quickly.',
      type: 'feedback',
      priority: 'low',
      status: 'closed',
      project: 'LeadFlow CRM',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-06'
    }
  ];

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
    const matchesProject = selectedProject === 'all' || selectedProject === 'current';
    
    return matchesSearch && matchesStatus && matchesProject;
  });

  const handleCreateFeedback = () => {
    if (!newFeedback.title || !newFeedback.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Here you would typically make an API call to create the feedback
    toast.success('Feedback submitted successfully!');
    setIsCreateDialogOpen(false);
    setNewFeedback({
      title: '',
      description: '',
      type: 'bug',
      priority: 'medium'
    });
  };

  const handleViewDetails = (issue) => {
    setSelectedIssue(issue);
    setIsDetailsDialogOpen(true);
  };

  const getStatusCounts = () => {
    return {
      open: issues.filter(i => i.status === 'open').length,
      'in-progress': issues.filter(i => i.status === 'in-progress').length,
      resolved: issues.filter(i => i.status === 'resolved').length,
      closed: issues.filter(i => i.status === 'closed').length,
      total: issues.length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Feedback & Issues</h1>
          <p className="text-muted-foreground">
            Submit feedback, report bugs, and track your requests
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Feedback
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Submit New Feedback</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newFeedback.title}
                  onChange={(e) => setNewFeedback({...newFeedback, title: e.target.value})}
                  placeholder="Brief description of the issue or suggestion"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newFeedback.description}
                  onChange={(e) => setNewFeedback({...newFeedback, description: e.target.value})}
                  placeholder="Detailed description of the issue or feedback"
                  rows={4}
                />
              </div>
              
              <div>
                <Label>Type</Label>
                <RadioGroup
                  value={newFeedback.type}
                  onValueChange={(value) => setNewFeedback({...newFeedback, type: value})}
                  className="grid grid-cols-2 gap-4 mt-2"
                >
                  {Object.entries(feedbackTypes).map(([key, type]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <RadioGroupItem value={key} id={key} />
                      <Label htmlFor={key} className="text-sm">{type.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div>
                <Label>Priority</Label>
                <Select value={newFeedback.priority} onValueChange={(value) => setNewFeedback({...newFeedback, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateFeedback} className="flex-1">
                  Submit Feedback
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{statusCounts.total}</p>
              </div>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        {Object.entries(statusConfig).map(([key, config]) => (
          <Card key={key}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{config.label}</p>
                  <p className="text-2xl font-bold">{statusCounts[key]}</p>
                </div>
                <config.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>My Feedback & Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search feedback and issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Project</SelectItem>
                <SelectItem value="all">All Projects</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Issues List */}
          <div className="space-y-4">
            {filteredIssues.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No feedback or issues found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredIssues.map((issue) => {
                const typeConfig = feedbackTypes[issue.type];
                const statusConf = statusConfig[issue.status];
                const TypeIcon = typeConfig.icon;
                
                return (
                  <div
                    key={issue.id}
                    className="border rounded-lg p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => handleViewDetails(issue)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <TypeIcon className="h-4 w-4" />
                          <h3 className="font-medium">{issue.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {issue.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Created: {issue.createdAt}</span>
                          <span>•</span>
                          <span>Updated: {issue.updatedAt}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-4">
                        <Badge variant="outline" className={typeConfig.color}>
                          {typeConfig.label}
                        </Badge>
                        <Badge variant="outline" className={statusConf.color}>
                          {statusConf.label}
                        </Badge>
                        <Badge variant="outline" className={
                          issue.priority === 'critical' ? 'bg-red-100 text-red-800 border-red-200' :
                          issue.priority === 'high' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                          issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          'bg-gray-100 text-gray-800 border-gray-200'
                        }>
                          {issue.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedIssue && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {React.createElement(feedbackTypes[selectedIssue.type].icon, { className: "h-4 w-4" })}
                  {selectedIssue.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Badge variant="outline" className={feedbackTypes[selectedIssue.type].color}>
                    {feedbackTypes[selectedIssue.type].label}
                  </Badge>
                  <Badge variant="outline" className={statusConfig[selectedIssue.status].color}>
                    {statusConfig[selectedIssue.status].label}
                  </Badge>
                  <Badge variant="outline" className={
                    selectedIssue.priority === 'critical' ? 'bg-red-100 text-red-800 border-red-200' :
                    selectedIssue.priority === 'high' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                    selectedIssue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                    'bg-gray-100 text-gray-800 border-gray-200'
                  }>
                    {selectedIssue.priority} priority
                  </Badge>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedIssue.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-sm font-medium">Project</Label>
                    <p className="text-muted-foreground">{selectedIssue.project}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Created</Label>
                    <p className="text-muted-foreground">{selectedIssue.createdAt}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedbackIssues;