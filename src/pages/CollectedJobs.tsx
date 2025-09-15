import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, Briefcase, TrendingUp, Copy, MoreHorizontal, Globe, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ExportDialog from '@/components/ExportDialog';
import { toast } from 'sonner';

const CollectedJobs = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

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
    }
  ];

  const filterCounts = {
    all: 4256,
    today: 142,
    'last 3 days': 387,
    'this week': 524
  };

  const handleExport = () => {
    toast.success("Export completed successfully!");
    setIsExportDialogOpen(false);
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
                  <th className="text-left p-4 font-medium text-muted-foreground">Company & Job</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Location</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Salary</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Posted</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Type</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr 
                    key={job.id} 
                    className="border-b hover:bg-muted/30 transition-colors"
                  >
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
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Globe className="h-3 w-3" />
                          View
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Save Job</DropdownMenuItem>
                            <DropdownMenuItem>Add to Prospects</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Mark as Duplicate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <ExportDialog
        open={isExportDialogOpen}
        onOpenChange={setIsExportDialogOpen}
        totalCompanies={jobs.length}
        currentPageCompanies={jobs.length}
      />
    </div>
  );
};

export default CollectedJobs;