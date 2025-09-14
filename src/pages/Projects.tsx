import React, { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, MapPin, Users, Building, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState([1, 10000]);

  const projects = [
    {
      id: 1,
      name: 'PR NL agency drivers',
      description: 'Target logistics and transportation companies in Netherlands for driver recruitment',
      region: 'Netherlands',
      color: 'bg-primary',
      excludeRecruitment: true,
      excludeConsulting: true,
      companySizeMin: 50,
      companySizeMax: 500,
      totalCompanies: 247,
      activeJobs: 89,
      lastUpdated: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      name: 'Tech Startups EU',
      description: 'Focus on emerging technology startups across European Union markets',
      region: 'European Union',
      color: 'bg-secondary',
      excludeRecruitment: false,
      excludeConsulting: true,
      companySizeMin: 10,
      companySizeMax: 200,
      totalCompanies: 1284,
      activeJobs: 456,
      lastUpdated: '1 day ago',
      status: 'active'
    },
    {
      id: 3,
      name: 'Healthcare US',
      description: 'Target healthcare and medical device companies in United States',
      region: 'United States',
      color: 'bg-success',
      excludeRecruitment: true,
      excludeConsulting: false,
      companySizeMin: 100,
      companySizeMax: 5000,
      totalCompanies: 892,
      activeJobs: 234,
      lastUpdated: '3 days ago',
      status: 'paused'
    }
  ];

  const companySizeLabels = ['1', '10', '50', '100', '500', '1k', '10k', '10k+'];
  const companySizeValues = [1, 10, 50, 100, 500, 1000, 10000, 10000];

  const getSizeLabel = (value: number) => {
    const index = companySizeValues.indexOf(value);
    return index !== -1 ? companySizeLabels[index] : value.toString();
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Projects</h1>
          <p className="text-muted-foreground">Manage and configure your lead generation projects</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="gap-2 bg-gradient-primary hover:shadow-glow transition-all duration-300">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-input focus:border-input-focus"
              />
            </div>
            
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>

          {/* Company Size Filter */}
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Company Size Filter</h3>
            <div className="space-y-3">
              <div className="px-3">
                <Slider
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  max={7}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground px-3">
                {companySizeLabels.map((label, index) => (
                  <span key={index}>{label}</span>
                ))}
              </div>
              <div className="text-sm text-center">
                Selected range: {getSizeLabel(companySizeValues[selectedSize[0]])} - {getSizeLabel(companySizeValues[selectedSize[1]])} employees
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover-lift bg-gradient-card border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${project.color}`} />
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={project.status === 'active' ? 'default' : 'secondary'}
                    className={project.status === 'active' ? 'bg-success text-success-foreground' : ''}
                  >
                    {project.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        {project.status === 'active' ? 'Pause' : 'Archive'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Description */}
              <p className="text-sm text-muted-foreground">{project.description}</p>
              
              {/* Region */}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{project.region}</span>
              </div>
              
              {/* Company Size */}
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{project.companySizeMin} - {project.companySizeMax} employees</span>
              </div>
              
              {/* Exclusions */}
              <div className="flex flex-wrap gap-2">
                {project.excludeRecruitment && (
                  <Badge variant="outline" className="text-xs">
                    Exclude Recruitment
                  </Badge>
                )}
                {project.excludeConsulting && (
                  <Badge variant="outline" className="text-xs">
                    Exclude Consulting
                  </Badge>
                )}
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">Companies</p>
                  <p className="text-lg font-semibold">{project.totalCompanies}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Active Jobs</p>
                  <p className="text-lg font-semibold">{project.activeJobs}</p>
                </div>
              </div>
              
              {/* Last Updated */}
              <div className="text-xs text-muted-foreground">
                Updated {project.lastUpdated}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;