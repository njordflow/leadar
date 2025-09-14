import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Users, Settings, Copy, Trash2, Play, Pause, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NewProjectDialog } from '@/components/NewProjectDialog';
import { EditProjectDialog } from '@/components/EditProjectDialog';
import { Skeleton } from '@/components/ui/skeleton';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const projects = [
    {
      id: 1,
      name: 'PR NL agency drivers',
      description: 'Target logistics and transportation companies in Netherlands for driver recruitment campaigns with focus on experienced drivers.',
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
      description: 'Focus on emerging technology startups across European Union markets including fintech, healthtech, and AI companies.',
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
      description: 'Target healthcare and medical device companies in United States with focus on innovation and patient care solutions.',
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

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatEmployeeRange = (min: number, max: number) => {
    const format = (num: number) => {
      if (num >= 10000) return '10k+';
      if (num >= 1000) return `${num / 1000}k`;
      return num.toString();
    };
    return `${format(min)} – ${format(max)} employees`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="rounded-xl border shadow-sm">
              <CardHeader className="pb-3">
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and configure your lead generation projects</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button 
            onClick={() => setIsNewProjectOpen(true)}
            className="gap-2 shadow-sm"
          >
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
            
            <div className="flex items-center gap-2">
              {['all', 'active', 'paused', 'completed'].map((status) => (
                <Button
                  key={status}
                  variant="outline"
                  size="sm"
                  className="capitalize"
                >
                  {status}
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

      {/* Projects Grid or Empty State */}
      {filteredProjects.length === 0 && searchQuery ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found matching "{searchQuery}"</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <Users className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-6">Get started by creating your first project</p>
          <Button onClick={() => setIsNewProjectOpen(true)}>
            Create your first project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      project.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg leading-tight truncate">{project.name}</h3>
                      {project.status === 'active' && (
                        <Badge variant="outline" className="mt-2 text-xs bg-green-50 text-green-700 border-green-200">
                          active
                        </Badge>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => console.log('Set Active:', project.id)}>
                        <Play className="h-4 w-4 mr-2" />
                        Set Active
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditingProject(project.id)}>
                        <Settings className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log('Duplicate:', project.id)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => console.log('Delete:', project.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                
                {/* Employee Range */}
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{formatEmployeeRange(project.companySizeMin, project.companySizeMax)}</span>
                </div>
                
                {/* Exclusions */}
                {(project.excludeRecruitment || project.excludeConsulting) && (
                  <div className="flex flex-wrap gap-2">
                    {project.excludeConsulting && (
                      <Badge variant="outline" className="text-xs">
                        Exclude Consulting
                      </Badge>
                    )}
                    {project.excludeRecruitment && (
                      <Badge variant="outline" className="text-xs">
                        Exclude Recruitment
                      </Badge>
                    )}
                  </div>
                )}
                
                {/* Stats Footer */}
                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Companies: <span className="font-medium text-foreground">{project.totalCompanies}</span></span>
                    <span className="text-muted-foreground">Active Jobs: <span className="font-medium text-foreground">{project.activeJobs}</span></span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Updated {project.lastUpdated}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialogs */}
      <NewProjectDialog 
        open={isNewProjectOpen} 
        onOpenChange={setIsNewProjectOpen}
        onSave={(data) => {
          console.log('New project:', data);
          setIsNewProjectOpen(false);
          // Show success toast
        }}
      />
      
      {editingProject && (
        <EditProjectDialog
          open={!!editingProject}
          onOpenChange={(open) => !open && setEditingProject(null)}
          project={projects.find(p => p.id === editingProject)}
          onSave={(data) => {
            console.log('Edit project:', data);
            setEditingProject(null);
            // Show success toast
          }}
        />
      )}
    </div>
  );
};

export default Projects;