import React, { useState, useMemo } from 'react';
import { Search, Download, Calendar, MapPin, DollarSign, ExternalLink, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Pagination from '@/components/Pagination';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary?: string;
  posted: string;
  url?: string;
  description: string;
}

interface JobsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyName: string;
  jobs: Job[];
}

const JobsDialog: React.FC<JobsDialogProps> = ({
  open,
  onOpenChange,
  companyName,
  jobs
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mock jobs data sorted by most recent
  const mockJobs: Job[] = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $180,000',
      posted: '2025-06-20',
      url: 'https://example.com/job1',
      description: 'We are looking for a senior software engineer to join our team...'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100,000 - $150,000',
      posted: '2025-06-19',
      url: 'https://example.com/job2',
      description: 'Lead product development and strategy...'
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$80,000 - $120,000',
      posted: '2025-06-18',
      description: 'Create amazing user experiences...'
    },
    {
      id: 4,
      title: 'Data Scientist',
      department: 'Data',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$110,000 - $160,000',
      posted: '2025-06-17',
      url: 'https://example.com/job4',
      description: 'Analyze data and build machine learning models...'
    },
    {
      id: 5,
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Los Angeles, CA',
      type: 'Full-time',
      salary: '$60,000 - $90,000',
      posted: '2025-06-16',
      description: 'Drive marketing campaigns and growth...'
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$95,000 - $140,000',
      posted: '2025-06-15',
      url: 'https://example.com/job6',
      description: 'Manage infrastructure and deployment pipelines...'
    },
    {
      id: 7,
      title: 'Sales Manager',
      department: 'Sales',
      location: 'Chicago, IL',
      type: 'Full-time',
      salary: '$70,000 - $120,000',
      posted: '2025-06-14',
      description: 'Lead sales team and drive revenue growth...'
    },
    {
      id: 8,
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$85,000 - $125,000',
      posted: '2025-06-13',
      url: 'https://example.com/job8',
      description: 'Build beautiful and responsive user interfaces...'
    },
    {
      id: 9,
      title: 'HR Business Partner',
      department: 'Human Resources',
      location: 'Miami, FL',
      type: 'Full-time',
      salary: '$75,000 - $105,000',
      posted: '2025-06-12',
      description: 'Support business leaders with HR strategy...'
    },
    {
      id: 10,
      title: 'QA Engineer',
      department: 'Engineering',
      location: 'Denver, CO',
      type: 'Full-time',
      salary: '$70,000 - $100,000',
      posted: '2025-06-11',
      url: 'https://example.com/job10',
      description: 'Ensure quality through comprehensive testing...'
    },
    {
      id: 11,
      title: 'Business Analyst',
      department: 'Operations',
      location: 'Philadelphia, PA',
      type: 'Full-time',
      salary: '$65,000 - $95,000',
      posted: '2025-06-10',
      description: 'Analyze business processes and requirements...'
    },
    {
      id: 12,
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Portland, OR',
      type: 'Full-time',
      salary: '$60,000 - $90,000',
      posted: '2025-06-09',
      url: 'https://example.com/job12',
      description: 'Ensure customer satisfaction and retention...'
    }
  ];

  const allJobs = jobs.length > 0 ? jobs : mockJobs;

  const filteredJobs = useMemo(() => {
    if (!searchQuery) return allJobs;
    
    return allJobs.filter(job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allJobs, searchQuery]);

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredJobs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredJobs, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handleExportToExcel = () => {
    // Mock export functionality
    const csvContent = [
      ['Title', 'Department', 'Location', 'Type', 'Salary', 'Posted Date'],
      ...filteredJobs.map(job => [
        job.title,
        job.department,
        job.location,
        job.type,
        job.salary || 'Not specified',
        job.posted
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${companyName.replace(/\s+/g, '_')}_jobs.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Jobs at {companyName}</DialogTitle>
          <div className="flex items-center justify-end">
            <Button variant="outline" size="sm" onClick={handleExportToExcel} className="gap-2">
              <Download className="h-4 w-4" />
              Export to Excel
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, department, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Jobs List */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {paginatedJobs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No jobs found matching your search.
              </div>
            ) : (
              paginatedJobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {job.department}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {job.type}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </div>
                        {job.salary && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {job.salary}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Posted {formatDate(job.posted)}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {job.description}
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0 ml-4">
                      {job.url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => window.open(job.url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                          View Job
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex-shrink-0">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredJobs.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(items) => {
                  setItemsPerPage(items);
                  setCurrentPage(1);
                }}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobsDialog;