import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';
import { countries } from '@/lib/countries';

interface EditProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: any;
  onSave: (data: any) => void;
}

const sizeStops = [
  { value: 1, label: '1' },
  { value: 10, label: '10' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 500, label: '500' },
  { value: 1000, label: '1k' },
  { value: 10000, label: '10k' },
];

const roles = [
  'Owner', 'Founder', 'C-suite', 'Partner', 'VP', 'Head', 
  'Director', 'Manager', 'Senior', 'Entry', 'Intern'
];

const jobRoles = [
  'Software Engineer', 'Data Scientist', 'Product Manager', 'Designer',
  'Sales Manager', 'Marketing Manager', 'HR Manager', 'Operations Manager',
  'Business Analyst', 'Project Manager', 'Account Manager', 'Developer',
  'DevOps Engineer', 'QA Engineer', 'Machine Learning Engineer',
  'Digital Marketing Specialist', 'Content Manager', 'Customer Success Manager'
];

export function EditProjectDialog({ open, onOpenChange, project, onSave }: EditProjectDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    companySizeMin: 50,
    companySizeMax: 500,
    selectedRoles: [] as string[],
    selectedCountries: [] as string[],
    selectedJobRoles: [] as string[],
    excludeConsulting: false,
    excludeRecruitment: false,
  });

  // Initialize form with project data
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        companySizeMin: project.companySizeMin || 50,
        companySizeMax: project.companySizeMax || 500,
        selectedRoles: project.selectedRoles || ['C-suite', 'VP', 'Director'], // Mock data
        selectedCountries: project.selectedCountries || ['US', 'NL', 'DE'], // Mock data
        selectedJobRoles: project.selectedJobRoles || ['Software Engineer', 'Product Manager'], // Mock data
        excludeConsulting: project.excludeConsulting || false,
        excludeRecruitment: project.excludeRecruitment || false,
      });
    }
  }, [project]);

  const handleSizeChange = (type: 'min' | 'max', value: number) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (type === 'min') {
        newData.companySizeMin = value;
        if (value > prev.companySizeMax) {
          newData.companySizeMax = value;
        }
      } else {
        newData.companySizeMax = value;
        if (value < prev.companySizeMin) {
          newData.companySizeMin = value;
        }
      }
      return newData;
    });
  };

  const toggleRole = (role: string) => {
    setFormData(prev => ({
      ...prev,
      selectedRoles: prev.selectedRoles.includes(role)
        ? prev.selectedRoles.filter(r => r !== role)
        : [...prev.selectedRoles, role]
    }));
  };

  const toggleCountry = (countryCode: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCountries: prev.selectedCountries.includes(countryCode)
        ? prev.selectedCountries.filter(c => c !== countryCode)
        : [...prev.selectedCountries, countryCode]
    }));
  };

  const toggleJobRole = (jobRole: string) => {
    setFormData(prev => ({
      ...prev,
      selectedJobRoles: prev.selectedJobRoles.includes(jobRole)
        ? prev.selectedJobRoles.filter(jr => jr !== jobRole)
        : [...prev.selectedJobRoles, jobRole]
    }));
  };

  const formatSize = (value: number) => {
    if (value >= 10000) return '10k';
    if (value >= 1000) return `${value / 1000}k`;
    return value.toString();
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter a project name.",
        variant: "destructive",
      });
      return;
    }

    onSave({ ...formData, id: project?.id });
    toast({
      title: "Project updated",
      description: `${formData.name} has been updated successfully.`,
    });
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter project name"
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your project goals and target criteria"
              className="min-h-[80px] resize-none"
              rows={3}
            />
          </div>

          <Separator />

          {/* Target Countries */}
          <div className="space-y-4">
            <div>
              <Label>Target Countries</Label>
              <p className="text-sm text-muted-foreground mt-1">Select countries to target for lead generation</p>
            </div>
            
            <div className="flex gap-2 flex-wrap max-h-32 overflow-y-auto">
              {countries.slice(0, 20).map((country) => (
                <Badge
                  key={country.code}
                  variant={formData.selectedCountries.includes(country.code) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-accent transition-colors px-3 py-1"
                  onClick={() => toggleCountry(country.code)}
                >
                  {country.name}
                  {formData.selectedCountries.includes(country.code) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
            {formData.selectedCountries.length > 0 && (
              <div className="text-sm text-muted-foreground">
                Selected: {formData.selectedCountries.map(code => countries.find(c => c.code === code)?.name).join(', ')}
              </div>
            )}
          </div>

          <Separator />

          {/* Job Roles Keywords */}
          <div className="space-y-4">
            <div>
              <Label>Job Roles Keywords</Label>
              <p className="text-sm text-muted-foreground mt-1">Select the types of roles companies are hiring for</p>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {jobRoles.map((jobRole) => (
                <Badge
                  key={jobRole}
                  variant={formData.selectedJobRoles.includes(jobRole) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-accent transition-colors px-3 py-1"
                  onClick={() => toggleJobRole(jobRole)}
                >
                  {jobRole}
                  {formData.selectedJobRoles.includes(jobRole) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Company Size */}
          <div className="space-y-4">
            <div>
              <Label>Company Size</Label>
              <p className="text-sm text-muted-foreground mt-1">Select the range of employees</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Minimum Size</Label>
                <div className="flex gap-2 flex-wrap">
                  {sizeStops.map((stop) => (
                    <Button
                      key={`min-${stop.value}`}
                      variant={formData.companySizeMin === stop.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSizeChange('min', stop.value)}
                      className="h-8 px-3 text-xs"
                    >
                      {stop.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Maximum Size</Label>
                <div className="flex gap-2 flex-wrap">
                  {sizeStops.map((stop) => (
                    <Button
                      key={`max-${stop.value}`}
                      variant={formData.companySizeMax === stop.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSizeChange('max', stop.value)}
                      className="h-8 px-3 text-xs"
                      disabled={stop.value < formData.companySizeMin}
                    >
                      {stop.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-3 text-sm">
                Selected: {formatSize(formData.companySizeMin)} – {formatSize(formData.companySizeMax)} employees
              </div>
            </div>
          </div>

          <Separator />

          {/* Decision Maker Roles */}
          <div className="space-y-4">
            <div>
              <Label>Decision Maker Roles</Label>
              <p className="text-sm text-muted-foreground mt-1">Select target roles for your outreach</p>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {roles.map((role) => (
                <Badge
                  key={role}
                  variant={formData.selectedRoles.includes(role) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-accent transition-colors px-3 py-1"
                  onClick={() => toggleRole(role)}
                >
                  {role}
                  {formData.selectedRoles.includes(role) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Exclusions */}
          <div className="space-y-4">
            <Label>Company Sectors</Label>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="exclude-consulting" className="text-sm font-medium">
                    Exclude Consulting companies
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Skip management and professional consulting firms
                  </p>
                </div>
                <Switch
                  id="exclude-consulting"
                  checked={formData.excludeConsulting}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, excludeConsulting: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="exclude-recruitment" className="text-sm font-medium">
                    Exclude Recruiting companies
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Skip staffing and recruitment agencies
                  </p>
                </div>
                <Switch
                  id="exclude-recruitment"
                  checked={formData.excludeRecruitment}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, excludeRecruitment: checked }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Actions */}
        <div className="sticky bottom-0 flex justify-end gap-3 pt-4 border-t bg-background">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}