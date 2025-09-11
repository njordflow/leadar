import React, { useState } from 'react';
import { Search, Filter, Download, Plus, MoreHorizontal, Globe, Linkedin, Calendar, Users, TrendingUp, Target } from 'lucide-react';
import ProspectDetails from '@/components/ProspectDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const LeadDashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProspect, setSelectedProspect] = useState<any>(null);

  const stats = [
    { title: 'Total Prospects', value: '2,847', change: '+12%', icon: Users, color: 'text-primary' },
    { title: 'Verified Leads', value: '1,243', change: '+8%', icon: Target, color: 'text-success' },
    { title: 'Conversion Rate', value: '43.7%', change: '+2.1%', icon: TrendingUp, color: 'text-secondary' },
    { title: 'New This Week', value: '156', change: '+24%', icon: Calendar, color: 'text-warning' },
  ];

  const prospects = [
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
      linkedin: 'carbon-robotics'
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
      linkedin: 'st-paul-group'
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
      linkedin: 'electronic-logistics-bv'
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
      linkedin: 'schmidt-global'
    }
  ];

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
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 bg-gradient-primary hover:shadow-glow transition-all duration-300">
            <Plus className="h-4 w-4" />
            Add Prospect
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
                placeholder="Search companies, industries, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-input focus:border-input-focus"
              />
            </div>
            
            <div className="flex items-center gap-2">
              {['all', 'new', 'verified', 'excluded', 'duplicate'].map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(status)}
                  className={selectedStatus === status ? "bg-primary hover:bg-primary-hover" : ""}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>

            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Prospects Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Prospects</span>
            <Badge variant="secondary" className="bg-primary-light text-primary">
              {prospects.length} companies
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
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
                  <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {prospects.map((prospect) => (
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
                            <Globe className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{prospect.website}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={`${statusColors[prospect.status as keyof typeof statusColors]} border`}>
                        {prospect.status.charAt(0).toUpperCase() + prospect.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4 text-muted-foreground">{prospect.size}</td>
                    <td className="p-4 text-muted-foreground">{prospect.industry}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-secondary-light text-secondary border-secondary/20">
                        {prospect.jobs} jobs
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      <div>{prospect.firstJob}</div>
                      <div className="text-xs">to {prospect.lastJob}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Linkedin className="h-3 w-3" />
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
        </CardContent>
      </Card>

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