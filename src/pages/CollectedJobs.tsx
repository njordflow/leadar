import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Calendar, Briefcase, TrendingUp, Copy, Globe, Building, ExternalLink, Star, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ExportDialog from '@/components/ExportDialog';
import JobDetails from '@/components/JobDetails';
import ProspectDetails from '@/components/ProspectDetails';
import Pagination from '@/components/Pagination';
import { toast } from 'sonner';
import indeedLogo from '@/assets/indeed-logo.svg';

const CollectedJobs = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState(null);
  const [isProspectDetailsOpen, setIsProspectDetailsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const stats = [
    { title: 'Total Jobs', value: '4,256', change: '+18%', icon: Briefcase, color: 'text-primary' },
    { title: 'This Week', value: '284', change: '+35%', icon: Calendar, color: 'text-success' },
    { title: 'Duplicates Found', value: '89', change: '-12%', icon: Copy, color: 'text-warning' },
    { title: 'Active Companies', value: '1,847', change: '+8%', icon: Building, color: 'text-secondary' },
  ];

  const jobs = [
    {
      id: 1,
      company: 'Carbon Robotics',
      logo: 'CR',
      title: 'Senior Software Engineer',
      location: 'Seattle, WA',
      posted: '2 hours ago',
      deadline: '30 days',
      salary: '$120k - $160k',
      type: 'Full-time',
      remote: true,
      website: 'carbonrobotics.com',
      source: 'indeed',
      url: 'https://indeed.com/job/senior-software-engineer-123',
      aiRating: 4.5,
      aiFeedback: { totalRatings: 12, lastRated: '1 day ago' },
      ai_match: 'qualified' as const,
      ai_reasoning: 'Strong technical requirements match with comprehensive benefits package. The role aligns well with senior-level expectations and includes modern tech stack.',
      ai_updated_at: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      company: 'St. Paul Group',
      logo: 'SP',
      title: 'Marketing Manager',
      location: 'Amsterdam, NL',
      posted: '4 hours ago',
      deadline: '25 days',
      salary: '€65k - €85k',
      type: 'Full-time',
      remote: false,
      website: 'stpaulgroup.com',
      source: 'linkedin',
      url: 'https://linkedin.com/jobs/marketing-manager-456',
      aiRating: 3.2,
      aiFeedback: { totalRatings: 8, lastRated: '3 hours ago' },
      ai_match: 'not_a_match' as const,
      ai_reasoning: 'Marketing role does not align with technical service offerings. Company focus appears to be in different industry vertical.',
      ai_updated_at: '2024-01-15T08:45:00Z'
    },
    {
      id: 3,
      company: 'Electronic Logistics BV',
      logo: 'EL',
      title: 'DevOps Engineer',
      location: 'Rotterdam, NL',
      posted: '6 hours ago',
      deadline: '20 days',
      salary: '€70k - €95k',
      type: 'Full-time',
      remote: true,
      website: 'electronic-logistics.nl',
      source: 'indeed',
      url: 'https://indeed.com/job/devops-engineer-789',
      aiRating: null,
      aiFeedback: null,
      ai_match: 'not_analyzed' as const,
      ai_reasoning: null,
      ai_updated_at: null
    },
    {
      id: 4,
      company: 'Schmidt Global Relocations',
      logo: 'SG',
      title: 'Data Analyst',
      location: 'Berlin, DE',
      posted: '1 day ago',
      deadline: '15 days',
      salary: '€55k - €75k',
      type: 'Full-time',
      remote: false,
      website: 'schmidt-relocation.com',
      source: 'linkedin',
      url: 'https://linkedin.com/jobs/data-analyst-101',
      aiRating: 4.8,
      aiFeedback: { totalRatings: 5, lastRated: '2 hours ago' },
      ai_match: 'qualified' as const,
      ai_reasoning: 'Data analytics role with growth potential. Company size and requirements indicate good fit for expanding data capabilities.',
      ai_updated_at: '2024-01-15T06:20:00Z'
    }
  ];

  const filterCounts = {
    all: 4256,
    today: 142,
    'last 3 days': 387,
    'this week': 524
  };

  // Filter jobs based on search query
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Calculate pagination
  const totalItems = filteredJobs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleExport = () => {
    toast.success("Export completed successfully!");
    setIsExportDialogOpen(false);
  };

  const handleJobClick = (job: any) => {
    setSelectedJob(job);
    setIsJobDetailsOpen(true);
  };

  const handleOpenProspect = (companyName: string) => {
    // Create a mock prospect based on the company
    const mockProspect = {
      id: Math.random(),
      company: companyName,
      industry: 'Technology & Software',
      employees: '51-200',
      revenue: '$10M - $50M',
      location: 'Seattle, WA',
      website: `${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
      founded: '2018',
      status: 'New',
      priority: 'High',
      lastContact: '2 days ago',
      source: 'Job Board',
      tags: ['Tech Company', 'Hiring']
    };
    
    setSelectedProspect(mockProspect);
    setIsProspectDetailsOpen(true);
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'indeed':
        return <img src={indeedLogo} alt="Indeed" className="h-4 w-4" />;
      case 'linkedin':
        return <div className="h-4 w-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">in</div>;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Collected Jobs</h1>
          <p className="text-muted-foreground">Monitor and analyze job postings from target companies</p>
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
          <Card key={index} className="hover-lift bg-gradient-card border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-success">{stat.change}</p>
                </div>
                <div className={`p-2 rounded-lg bg-primary-light ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
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
                placeholder="Search jobs, companies, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-input focus:border-input-focus"
              />
            </div>
            
            <div className="flex items-center gap-2">
              {['all', 'today', 'last 3 days', 'this week'].map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(status)}
                  className={selectedStatus === status ? "bg-primary hover:bg-primary-hover" : ""}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)} ({filterCounts[status as keyof typeof filterCounts]})
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Job Postings</span>
            <Badge variant="secondary" className="bg-primary-light text-primary">
              {jobs.length} active jobs
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">Source</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Company & Job</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Location</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Salary</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Posted</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Type</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">AI Fit</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentJobs.map((job) => (
                  <tr 
                    key={job.id} 
                    className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={(e) => {
                      // Only open job details if clicking on a non-interactive element
                      const target = e.target as HTMLElement;
                      const isButton = target.closest('button');
                      const isLink = target.closest('a');
                      const isBadge = target.closest('.cursor-pointer');
                      
                      if (!isButton && !isLink && !isBadge) {
                        handleJobClick(job);
                      }
                    }}
                  >
                    <td className="p-4">
                      <div 
                        className="flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJobClick(job);
                        }}
                      >
                        {getSourceIcon(job.source)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://logo.clearbit.com/${job.website}`} />
                          <AvatarFallback className="bg-primary-light text-primary font-medium">
                            {job.logo}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">{job.company}</span>
                            {job.aiRating && (
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs font-medium text-yellow-600">{job.aiRating.toFixed(1)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{job.location}</span>
                        {job.remote && (
                          <Badge variant="outline" className="ml-2 text-xs bg-success-light text-success border-success/20">
                            Remote
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground text-sm">{job.salary}</td>
                    <td className="p-4 text-sm text-muted-foreground">{job.posted}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-secondary-light text-secondary border-secondary/20">
                        {job.type}
                      </Badge>
                    </td>
                     <td className="p-4">
                      <div className="flex items-center justify-center">
                        {job.ai_match === 'qualified' && (
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                            title={`AI Fit: Yes${job.ai_updated_at ? ` • Updated ${new Date(job.ai_updated_at).toLocaleDateString()}` : ''}`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Yes
                          </span>
                        )}
                        {job.ai_match === 'not_a_match' && (
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap bg-rose-50 text-rose-700 ring-1 ring-rose-200"
                            title={`AI Fit: No${job.ai_updated_at ? ` • Updated ${new Date(job.ai_updated_at).toLocaleDateString()}` : ''}`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                            No
                          </span>
                        )}
                        {job.ai_match === 'not_analyzed' && (
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap bg-slate-50 text-slate-600 ring-1 ring-slate-200"
                            title="AI Fit: Pending"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                            Pending
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJobClick(job);
                        }}
                      >
                        <ExternalLink className="h-3 w-3" />
                        Open
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </CardContent>
      </Card>

      <ExportDialog
        open={isExportDialogOpen}
        onOpenChange={setIsExportDialogOpen}
        totalCompanies={filteredJobs.length}
        currentPageCompanies={currentJobs.length}
      />

      <JobDetails
        job={selectedJob}
        open={isJobDetailsOpen}
        onOpenChange={setIsJobDetailsOpen}
        onOpenProspect={handleOpenProspect}
      />

      {isProspectDetailsOpen && selectedProspect && (
        <ProspectDetails
          prospect={selectedProspect}
          onClose={() => {
            setIsProspectDetailsOpen(false);
            setSelectedProspect(null);
          }}
        />
      )}
    </div>
  );
};

export default CollectedJobs;