import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Plus, MoreHorizontal, Globe, Linkedin, Calendar, Users, TrendingUp, Target, ExternalLink } from 'lucide-react';
import ProspectDetails from '@/components/ProspectDetails';
import FilterDialog from '@/components/FilterDialog';
import ExportDialog from '@/components/ExportDialog';
import JobsDialog from '@/components/JobsDialog';
import Pagination from '@/components/Pagination';
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
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<any>({});
  const [selectedCompanyJobs, setSelectedCompanyJobs] = useState<any>(null);
  const [isJobsDialogOpen, setIsJobsDialogOpen] = useState(false);

  const stats = [
    { title: 'Total Prospects', value: '2,847', change: '+12%', icon: Users, color: 'text-primary' },
    { title: 'Verified Leads', value: '1,243', change: '+8%', icon: Target, color: 'text-success' },
    { title: 'Conversion Rate', value: '43.7%', change: '+2.1%', icon: TrendingUp, color: 'text-secondary' },
    { title: 'New This Week', value: '156', change: '+24%', icon: Calendar, color: 'text-warning' },
  ];

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
      indeed: null
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
      indeed: 'st-paul-group-jobs'
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
      indeed: null
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
      indeed: 'schmidt-relocations'
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
      indeed: 'techflow-careers'
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
  }, [selectedStatus, searchQuery, filters]);

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

            <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsFilterDialogOpen(true)}>
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
              {filteredProspects.length} companies
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
                               className={`h-5 w-5 p-0 ${prospect.indeed ? 'hover:bg-green-50' : 'opacity-30 cursor-not-allowed'}`}
                               disabled={!prospect.indeed}
                               onClick={(e) => {
                                 e.stopPropagation();
                                 if (prospect.indeed) window.open(`https://indeed.com/cmp/${prospect.indeed}`, '_blank');
                               }}
                             >
                               <ExternalLink className="h-3 w-3" />
                             </Button>
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