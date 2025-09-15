import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Download, Plus, MoreHorizontal, Globe, Linkedin, Calendar, Users, TrendingUp, Target, ExternalLink, MessageSquare, CheckCircle2, AlertTriangle, Copy, Eye, ArrowUp, ArrowDown } from 'lucide-react';
import ProspectDetails from '@/components/ProspectDetails';
import FilterDialog from '@/components/FilterDialog';
import ExportDialog from '@/components/ExportDialog';
import JobsDialog from '@/components/JobsDialog';
import Pagination from '@/components/Pagination';
import CommentsDialog from '@/components/CommentsDialog';
import StatusChangePopover from '@/components/StatusChangePopover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const LeadDashboard = () => {
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProspect, setSelectedProspect] = useState<any>(null);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<any>({});
  const [selectedCompanyJobs, setSelectedCompanyJobs] = useState<any>(null);
  const [isJobsDialogOpen, setIsJobsDialogOpen] = useState(false);
  const [withComments, setWithComments] = useState(false);
  const [isCommentsDialogOpen, setIsCommentsDialogOpen] = useState(false);
  const [selectedCompanyComments, setSelectedCompanyComments] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [urlParams, setUrlParams] = useState(new URLSearchParams());

  // URL sync effect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUrlParams(params);
    
    // Apply filters from URL
    if (params.get('status') && params.get('status') !== 'all') {
      setSelectedStatus(params.get('status') || 'all');
    }
    if (params.get('with_comments') === 'true') {
      setWithComments(true);
    }
    if (params.get('q')) {
      setSearchQuery(params.get('q') || '');
    }
  }, []);

  // Update URL when filters change
  const updateURL = (newParams: Record<string, string | null>) => {
    const url = new URL(window.location.href);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });
    window.history.replaceState({}, '', url.toString());
  };

  // Mock comments data
  const commentsData: Record<number, any[]> = {
    1: [
      { id: 1, author: 'John Smith', content: 'Reached out via LinkedIn, waiting for response.', timestamp: '2 hours ago', avatar: 'JS' },
      { id: 2, author: 'Sarah Wilson', content: 'Company is actively hiring, looks promising.', timestamp: '1 day ago', avatar: 'SW' }
    ],
    2: [
      { id: 3, author: 'Mike Johnson', content: 'Had a call with their HR team.', timestamp: '3 hours ago', avatar: 'MJ' }
    ],
    5: [
      { id: 4, author: 'Lisa Chen', content: 'Very responsive team, good fit for our services.', timestamp: '1 hour ago', avatar: 'LC' },
      { id: 5, author: 'Tom Brown', content: 'Sent proposal, expecting response next week.', timestamp: '2 days ago', avatar: 'TB' },
      { id: 6, author: 'Emma Davis', content: 'CEO is interested, scheduling a demo.', timestamp: '3 days ago', avatar: 'ED' }
    ],
    16: [
      { id: 7, author: 'Alex Turner', content: 'Government contract in discussion.', timestamp: '4 hours ago', avatar: 'AT' }
    ],
    18: [
      { id: 8, author: 'Nina Rodriguez', content: 'Perfect match for our consulting services.', timestamp: '6 hours ago', avatar: 'NR' },
      { id: 9, author: 'David Lee', content: 'Meeting scheduled for next week.', timestamp: '1 day ago', avatar: 'DL' }
    ]
  };


  const allProspects = [
    {
      id: 1,
      company: 'Carbon Robotics',
      logo: 'CR',
      status: 'new',
      size: '51-200',
      industry: 'Robotics',
      jobs: 5,
      firstJob: '06/15/25',
      lastJob: '06/17/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'carbonrobotics.com',
      linkedin: 'carbon-robotics',
      indeed: null,
      comments_count: 2
    },
    {
      id: 2,
      company: 'St. Paul Group',
      logo: 'SP',
      status: 'new',
      size: '51-200',
      industry: 'Consulting',
      jobs: 1,
      firstJob: '06/15/25',
      lastJob: '06/15/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'stpaulgroup.com',
      linkedin: 'st-paul-group',
      indeed: 'st-paul-group-jobs',
      comments_count: 1
    },
    {
      id: 3,
      company: 'Electronic Logistics BV',
      logo: 'EL',
      status: 'new',
      size: '51-200',
      industry: 'Logistics',
      jobs: 2,
      firstJob: '06/15/25',
      lastJob: '06/15/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'electronic-logistics.nl',
      linkedin: 'electronic-logistics-bv',
      indeed: null,
      comments_count: 0
    },
    {
      id: 4,
      company: 'Schmidt Global Relocations',
      logo: 'SG',
      status: 'verified',
      size: '51-200',
      industry: 'Relocation',
      jobs: 2,
      firstJob: '06/15/25',
      lastJob: '06/17/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'schmidt-relocation.com',
      linkedin: 'schmidt-global',
      indeed: 'schmidt-relocations',
      comments_count: 0
    },
    {
      id: 5,
      company: 'TechFlow Solutions',
      logo: 'TF',
      status: 'verified',
      size: '201-500',
      industry: 'Technology',
      jobs: 8,
      firstJob: '06/14/25',
      lastJob: '06/18/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'techflow.com',
      linkedin: 'techflow-solutions',
      indeed: 'techflow-careers',
      comments_count: 3
    },
    {
      id: 6,
      company: 'HealthCare Plus',
      logo: 'HC',
      status: 'new',
      size: '501-1000',
      industry: 'Healthcare',
      jobs: 12,
      firstJob: '06/13/25',
      lastJob: '06/19/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'healthcareplus.com',
      linkedin: 'healthcare-plus',
      indeed: null
    },
    {
      id: 7,
      company: 'FinanceGrow',
      logo: 'FG',
      status: 'excluded',
      size: '11-50',
      industry: 'Finance',
      jobs: 3,
      firstJob: '06/16/25',
      lastJob: '06/16/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'financegrow.com',
      linkedin: 'finance-grow',
      indeed: 'financegrow-jobs'
    },
    {
      id: 8,
      company: 'ManufacturingCorp',
      logo: 'MC',
      status: 'new',
      size: '1001-5000',
      industry: 'Manufacturing',
      jobs: 15,
      firstJob: '06/12/25',
      lastJob: '06/20/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'manufacturingcorp.com',
      linkedin: 'manufacturing-corp',
      indeed: 'manufacturing-corp-careers'
    },
    {
      id: 9,
      company: 'RetailMax',
      logo: 'RM',
      status: 'verified',
      size: '5000+',
      industry: 'Retail',
      jobs: 25,
      firstJob: '06/10/25',
      lastJob: '06/22/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'retailmax.com',
      linkedin: 'retail-max',
      indeed: null
    },
    {
      id: 10,
      company: 'EduTech Innovations',
      logo: 'ET',
      status: 'new',
      size: '51-200',
      industry: 'Education',
      jobs: 6,
      firstJob: '06/17/25',
      lastJob: '06/19/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'edutech.com',
      linkedin: 'edutech-innovations',
      indeed: 'edutech-jobs'
    },
    {
      id: 11,
      company: 'BuildRight Construction',
      logo: 'BR',
      status: 'new',
      size: '201-500',
      industry: 'Construction',
      jobs: 18,
      firstJob: '06/11/25',
      lastJob: '06/21/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'buildright.com',
      linkedin: 'buildright-construction',
      indeed: 'buildright-careers'
    },
    {
      id: 12,
      company: 'TransportLogic',
      logo: 'TL',
      status: 'verified',
      size: '501-1000',
      industry: 'Transportation',
      jobs: 9,
      firstJob: '06/14/25',
      lastJob: '06/18/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'transportlogic.com',
      linkedin: 'transport-logic',
      indeed: null
    },
    {
      id: 13,
      company: 'GreenEnergy Corp',
      logo: 'GE',
      status: 'new',
      size: '1001-5000',
      industry: 'Energy',
      jobs: 14,
      firstJob: '06/09/25',
      lastJob: '06/23/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'greenenergy.com',
      linkedin: 'green-energy-corp',
      indeed: 'greenenergy-jobs'
    },
    {
      id: 14,
      company: 'PropertyPro Realty',
      logo: 'PP',
      status: 'excluded',
      size: '51-200',
      industry: 'Real Estate',
      jobs: 4,
      firstJob: '06/18/25',
      lastJob: '06/19/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'propertypro.com',
      linkedin: 'property-pro-realty',
      indeed: null
    },
    {
      id: 15,
      company: 'MediaStream Studios',
      logo: 'MS',
      status: 'new',
      size: '11-50',
      industry: 'Media',
      jobs: 7,
      firstJob: '06/16/25',
      lastJob: '06/20/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'mediastream.com',
      linkedin: 'mediastream-studios',
      indeed: 'mediastream-careers'
    },
    {
      id: 16,
      company: 'GovTech Solutions',
      logo: 'GT',
      status: 'verified',
      size: '201-500',
      industry: 'Government',
      jobs: 11,
      firstJob: '06/13/25',
      lastJob: '06/17/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'govtech.com',
      linkedin: 'govtech-solutions',
      indeed: 'govtech-jobs'
    },
    {
      id: 17,
      company: 'HelpingHands Nonprofit',
      logo: 'HH',
      status: 'new',
      size: '1-10',
      industry: 'Non-profit',
      jobs: 2,
      firstJob: '06/19/25',
      lastJob: '06/20/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'helpinghands.org',
      linkedin: 'helping-hands-nonprofit',
      indeed: null
    },
    {
      id: 18,
      company: 'ConsultPro Services',
      logo: 'CP',
      status: 'verified',
      size: '51-200',
      industry: 'Consulting',
      jobs: 8,
      firstJob: '06/15/25',
      lastJob: '06/18/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'consultpro.com',
      linkedin: 'consultpro-services',
      indeed: 'consultpro-careers'
    },
    {
      id: 19,
      company: 'LogiMove Logistics',
      logo: 'LM',
      status: 'new',
      size: '501-1000',
      industry: 'Logistics',
      jobs: 13,
      firstJob: '06/12/25',
      lastJob: '06/22/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'logimove.com',
      linkedin: 'logimove-logistics',
      indeed: 'logimove-jobs'
    },
    {
      id: 20,
      company: 'RoboFuture Technologies',
      logo: 'RF',
      status: 'duplicate',
      size: '201-500',
      industry: 'Robotics',
      jobs: 10,
      firstJob: '06/14/25',
      lastJob: '06/19/25',
      people: 'Apollo',
      notes: 'Open',
      website: 'robofuture.com',
      linkedin: 'robofuture-tech',
      indeed: 'robofuture-careers'
    }
  ];

  const totalProspects = allProspects.length;
  const excludedCount = allProspects.filter(p => p.status === 'excluded').length;
  const duplicatesCount = allProspects.filter(p => p.status === 'duplicate').length;

  const stats = [
    { 
      title: 'Total Prospects', 
      value: '2,847', 
      change: '+12% WoW', 
      changePositive: true,
      icon: Users, 
      color: 'text-primary',
      clickable: false
    },
    { 
      title: 'New This Week', 
      value: '156', 
      change: '+24% WoW', 
      changePositive: true,
      icon: Calendar, 
      color: 'text-warning',
      clickable: true,
      onClick: () => {
        setSelectedStatus('all');
        updateURL({ created_at: 'last7d', status: null });
        // Scroll to table
        setTimeout(() => {
          document.querySelector('[data-table]')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    },
    { 
      title: 'Verified Leads', 
      value: '1,243', 
      change: '+7% WoW', 
      changePositive: true,
      icon: CheckCircle2, 
      color: 'text-success',
      clickable: true,
      onClick: () => {
        setSelectedStatus('verified');
        updateURL({ status: 'verified' });
      }
    },
    { 
      title: 'Jobs Processed', 
      value: '10,823', 
      change: '+156 this week', 
      changePositive: true,
      icon: CheckCircle2, 
      color: 'text-success',
      clickable: false
    },
  ];

  const filteredProspects = useMemo(() => {
    let filtered = allProspects;

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(prospect => prospect.status === selectedStatus);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(prospect =>
        prospect.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prospect.industry.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by comments
    if (withComments) {
      filtered = filtered.filter(prospect => prospect.comments_count > 0);
    }

    // Apply additional filters
    if (filters.industries && filters.industries.length > 0) {
      filtered = filtered.filter(prospect => filters.industries.includes(prospect.industry));
    }

    if (filters.companySizeMin || filters.companySizeMax) {
      // Simple size filtering - in real app you'd convert size ranges to numbers
      filtered = filtered.filter(prospect => {
        if (filters.companySizeMin && prospect.size !== filters.companySizeMin) return false;
        if (filters.companySizeMax && prospect.size !== filters.companySizeMax) return false;
        return true;
      });
    }

    return filtered;
  }, [selectedStatus, searchQuery, filters, withComments]);

  // Add remaining prospects with comments_count
  allProspects.slice(5).forEach(prospect => {
    if (!prospect.hasOwnProperty('comments_count')) {
      prospect.comments_count = 0;
    }
  });
  // Add comments to some prospects
  if (allProspects[15]) allProspects[15].comments_count = 1;
  if (allProspects[17]) allProspects[17].comments_count = 2;

  const handleStatusChange = async (prospectId: number, newStatus: string, reason?: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update prospect status optimistically
      const prospectIndex = allProspects.findIndex(p => p.id === prospectId);
      if (prospectIndex !== -1) {
        allProspects[prospectIndex].status = newStatus;
      }
      
      toast({
        title: "Status updated",
        description: `Status changed to ${newStatus}${reason ? ` (${reason})` : ''}`,
      });
    } catch (error) {
      toast({
        title: "Update failed", 
        description: "Failed to update status. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = async (prospectId: number, content: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newComment = {
        id: Date.now(),
        author: 'Current User',
        content,
        timestamp: 'Just now',
        avatar: 'CU'
      };
      
      if (!commentsData[prospectId]) {
        commentsData[prospectId] = [];
      }
      commentsData[prospectId].unshift(newComment);
      
      // Update comments count
      const prospectIndex = allProspects.findIndex(p => p.id === prospectId);
      if (prospectIndex !== -1) {
        allProspects[prospectIndex].comments_count++;
      }
      
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully.",
      });
    } catch (error) {
      toast({
        title: "Failed to add comment",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCardClick = (stat: any) => {
    if (!stat.clickable) return;
    stat.onClick?.();
  };

  const handleClearFilters = () => {
    setSelectedStatus('all');
    setSearchQuery('');
    setWithComments(false);
    setFilters({});
    updateURL({ 
      status: null, 
      q: null, 
      with_comments: null, 
      created_at: null 
    });
  };

  const paginatedProspects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProspects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProspects, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProspects.length / itemsPerPage);

  const statusColors = {
    new: 'status-new',
    verified: 'status-verified',
    excluded: 'status-excluded',
    duplicate: 'status-duplicate'
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Prospect Intelligence</h1>
          <p className="text-muted-foreground">AI-powered lead generation from job postings</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={() => setIsExportDialogOpen(true)}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className={`hover-lift bg-gradient-card border-0 shadow-sm ${stat.clickable ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
            onClick={() => handleCardClick(stat)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</p>
                  
                  {stat.value && (
                    <div>
                      <p className="text-2xl font-bold mb-1">{stat.value}</p>
                      {stat.change && (
                        <div className={`flex items-center gap-1 text-sm ${stat.changePositive ? 'text-success' : 'text-destructive'}`}>
                          {stat.changePositive ? (
                            <ArrowUp className="h-3 w-3" />
                          ) : (
                            <ArrowDown className="h-3 w-3" />
                          )}
                          {stat.change}
                        </div>
                      )}
                    </div>
                  )}
                  
                </div>
                
                <div className="flex flex-col items-end">
                  <div className={`p-2 rounded-lg bg-primary-light ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies, industries, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-input focus:border-input-focus"
              />
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              {['all', 'new', 'verified', 'excluded', 'duplicate'].map((status) => {
                const getStatusCount = (status: string) => {
                  if (status === 'all') return totalProspects;
                  if (status === 'new') return allProspects.filter(p => p.status === 'new').length;
                  if (status === 'verified') return allProspects.filter(p => p.status === 'verified').length;
                  if (status === 'excluded') return excludedCount;
                  if (status === 'duplicate') return duplicatesCount;
                  return 0;
                };
                
                return (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedStatus(status);
                      updateURL({ status: status === 'all' ? null : status });
                    }}
                    className={selectedStatus === status ? "bg-primary hover:bg-primary-hover" : ""}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)} ({getStatusCount(status)})
                  </Button>
                );
              })}
              
              <Button
                variant={withComments ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setWithComments(!withComments);
                  updateURL({ with_comments: !withComments ? 'true' : null });
                }}
                className={`gap-2 ${withComments ? "bg-primary hover:bg-primary-hover" : ""}`}
              >
                <MessageSquare className="h-3 w-3" />
                With comments
              </Button>
            </div>

            <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsFilterDialogOpen(true)}>
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Prospects Table */}
      <Card className="border-0 shadow-sm" data-table>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Prospects</span>
            <Badge variant="secondary" className="bg-primary-light text-primary">
              {filteredProspects.length} companies
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-12" />
                </div>
              ))}
            </div>
          ) : filteredProspects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">No prospects match your filters</p>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">Company</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Size</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Industry</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Jobs</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Date Range</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Notes</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {paginatedProspects.map((prospect) => (
                  <tr 
                    key={prospect.id} 
                    className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedProspect(prospect)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://logo.clearbit.com/${prospect.website}`} />
                          <AvatarFallback className="bg-primary-light text-primary font-medium">
                            {prospect.logo}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{prospect.company}</p>
                           <div className="flex items-center gap-2 mt-1">
                             <Button
                               variant="ghost"
                               size="sm"
                               className={`h-5 w-5 p-0 ${prospect.website ? 'hover:bg-primary/10' : 'opacity-30 cursor-not-allowed'}`}
                               disabled={!prospect.website}
                               onClick={(e) => {
                                 e.stopPropagation();
                                 if (prospect.website) window.open(`https://${prospect.website}`, '_blank');
                               }}
                             >
                               <Globe className="h-3 w-3" />
                             </Button>
                             <Button
                               variant="ghost"
                               size="sm"
                               className={`h-5 w-5 p-0 ${prospect.linkedin ? 'hover:bg-blue-50' : 'opacity-30 cursor-not-allowed'}`}
                               disabled={!prospect.linkedin}
                               onClick={(e) => {
                                 e.stopPropagation();
                                 if (prospect.linkedin) window.open(`https://linkedin.com/company/${prospect.linkedin}`, '_blank');
                               }}
                             >
                               <Linkedin className="h-3 w-3" />
                             </Button>
                               <Button
                                 variant="ghost"
                                 size="sm"
                                 className={`h-5 w-5 p-0 ${prospect.indeed ? 'hover:bg-blue-50 text-blue-600' : 'opacity-30 cursor-not-allowed'}`}
                                 disabled={!prospect.indeed}
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   if (prospect.indeed) window.open(`https://indeed.com/cmp/${prospect.indeed}`, '_blank');
                                 }}
                               >
                                 <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                                   <path d="M14.822 10.308a3.018 3.018 0 111.32-4.038 3.006 3.006 0 01-1.32 4.044zM11.6.572c2.47-.901 5.294-.852 7.408.982a3.587 3.587 0 011.023 1.37c.213.69-.749-.07-.88-.168a9.407 9.407 0 00-2.15-1.095C12.837.386 8.897 2.707 6.463 6.316a19.505 19.505 0 00-2.248 5.126 2.918 2.918 0 01-.213.642c-.107.204-.049-.547-.049-.572a15.821 15.821 0 01.43-2.239C5.511 5.34 8.01 2.065 11.6.565zm.037 20.993v-8.763c.249.025.486.037.736.037a6.167 6.167 0 003.219-.895v9.62c0 .822-.15 1.43-.52 1.826A1.874 1.874 0 0113.62 24a1.825 1.825 0 01-1.427-.609c-.368-.404-.56-1.013-.56-1.825z"/>
                                 </svg>
                               </Button>
                           </div>
                        </div>
                      </div>
                    </td>
                     <td className="p-4" onClick={(e) => e.stopPropagation()}>
                       <StatusChangePopover
                         currentStatus={prospect.status}
                         onStatusChange={(status, reason) => handleStatusChange(prospect.id, status, reason)}
                       >
                         <Badge className={`${statusColors[prospect.status as keyof typeof statusColors]} border cursor-pointer hover:opacity-80 transition-opacity`}>
                           {prospect.status.charAt(0).toUpperCase() + prospect.status.slice(1)}
                         </Badge>
                       </StatusChangePopover>
                     </td>
                    <td className="p-4 text-muted-foreground">{prospect.size}</td>
                    <td className="p-4 text-muted-foreground">{prospect.industry}</td>
                     <td className="p-4">
                       <Button
                         variant="outline"
                         size="sm"
                         className="gap-2 bg-secondary-light text-secondary border-secondary/20 hover:bg-secondary hover:text-secondary-foreground"
                         onClick={(e) => {
                           e.stopPropagation();
                           setSelectedCompanyJobs(prospect);
                           setIsJobsDialogOpen(true);
                         }}
                       >
                         <Search className="h-3 w-3" />
                         {prospect.jobs} jobs
                       </Button>
                     </td>
                     <td className="p-4 text-sm text-muted-foreground">
                       <div>{prospect.firstJob}</div>
                       <div className="text-xs">to {prospect.lastJob}</div>
                     </td>
                     <td className="p-4">
                       <Button
                         variant="ghost"
                         size="sm"
                         className={`gap-2 ${prospect.comments_count > 0 ? 'text-primary hover:text-primary-hover' : 'text-muted-foreground opacity-60'}`}
                         onClick={(e) => {
                           e.stopPropagation();
                           setSelectedCompanyComments({
                             ...prospect,
                             comments: commentsData[prospect.id] || []
                           });
                           setIsCommentsDialogOpen(true);
                         }}
                       >
                         <MessageSquare className="h-3 w-3" />
                         {prospect.comments_count > 0 ? prospect.comments_count : ''}
                       </Button>
                     </td>
                    <td className="p-4">
                       <div className="flex items-center gap-2">
                         <Button variant="outline" size="sm" className="gap-1">
                           Open
                           <ExternalLink className="h-3 w-3" />
                         </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Verified</DropdownMenuItem>
                            <DropdownMenuItem>Add Note</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Exclude</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
        
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredProspects.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(items) => {
            setItemsPerPage(items);
            setCurrentPage(1);
          }}
        />
      </Card>

      {/* Dialogs */}
      <FilterDialog
        open={isFilterDialogOpen}
        onOpenChange={setIsFilterDialogOpen}
        onApplyFilters={setFilters}
      />

      <ExportDialog
        open={isExportDialogOpen}
        onOpenChange={setIsExportDialogOpen}
        totalCompanies={filteredProspects.length}
        currentPageCompanies={paginatedProspects.length}
      />

      {/* Jobs Dialog */}
      <JobsDialog
        open={isJobsDialogOpen}
        onOpenChange={setIsJobsDialogOpen}
        companyName={selectedCompanyJobs?.company || ''}
        jobs={[]}
      />

      {/* Comments Dialog */}
      <CommentsDialog
        open={isCommentsDialogOpen}
        onOpenChange={setIsCommentsDialogOpen}
        companyName={selectedCompanyComments?.company || ''}
        comments={selectedCompanyComments?.comments || []}
        onAddComment={(content) => handleAddComment(selectedCompanyComments?.id, content)}
      />

      {/* Prospect Details Modal */}
      {selectedProspect && (
        <ProspectDetails 
          prospect={selectedProspect} 
          onClose={() => setSelectedProspect(null)} 
        />
      )}
    </div>
  );
};

export default LeadDashboard;