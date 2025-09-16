import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { X, Plus } from 'lucide-react';
import { countries } from '@/lib/countries';

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
  { value: 50000, label: '10k+' },
];

// Convert size value to slider position (0-7)
const sizeToSliderValue = (size: number) => {
  for (let i = 0; i < sizeStops.length; i++) {
    if (size <= sizeStops[i].value) return i;
  }
  return sizeStops.length - 1;
};

// Convert slider position to size value
const sliderValueToSize = (value: number) => {
  return sizeStops[Math.min(value, sizeStops.length - 1)]?.value || 1;
};

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

export function NewProjectDialog({ open, onOpenChange, onSave }: NewProjectDialogProps) {
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
  
  const [countryInput, setCountryInput] = useState('');
  const [countryOpen, setCountryOpen] = useState(false);
  const [jobRoleInput, setJobRoleInput] = useState('');

  const handleSliderChange = (values: number[]) => {
    const [minIdx, maxIdx] = values;
    const minSize = sliderValueToSize(minIdx);
    const maxSize = sliderValueToSize(maxIdx);
    
    setFormData(prev => ({
      ...prev,
      companySizeMin: minSize,
      companySizeMax: maxSize
    }));
  };

  const toggleRole = (role: string) => {
    setFormData(prev => ({
      ...prev,
      selectedRoles: prev.selectedRoles.includes(role)
        ? prev.selectedRoles.filter(r => r !== role)
        : [...prev.selectedRoles, role]
    }));
  };

  const addCountry = (countryCode: string) => {
    if (!formData.selectedCountries.includes(countryCode)) {
      setFormData(prev => ({
        ...prev,
        selectedCountries: [...prev.selectedCountries, countryCode]
      }));
    }
    setCountryInput('');
    setCountryOpen(false);
  };

  const removeCountry = (countryCode: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCountries: prev.selectedCountries.filter(c => c !== countryCode)
    }));
  };

  const addJobRole = (jobRole: string) => {
    if (jobRole.trim() && !formData.selectedJobRoles.includes(jobRole.trim())) {
      setFormData(prev => ({
        ...prev,
        selectedJobRoles: [...prev.selectedJobRoles, jobRole.trim()]
      }));
    }
    setJobRoleInput('');
  };

  const removeJobRole = (jobRole: string) => {
    setFormData(prev => ({
      ...prev,
      selectedJobRoles: prev.selectedJobRoles.filter(jr => jr !== jobRole)
    }));
  };

  const handleJobRoleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addJobRole(jobRoleInput);
    }
  };

  const formatSize = (value: number) => {
    if (value >= 50000) return '10k+';
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

    onSave({ ...formData, status: 'pending' });
    toast({
      title: "Project created. We'll review and launch it within 24 hours. Status: Pending.",
      description: `${formData.name} has been created successfully.`,
    });
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      companySizeMin: 50,
      companySizeMax: 500,
      selectedRoles: [],
      selectedCountries: [],
      selectedJobRoles: [],
      excludeConsulting: false,
      excludeRecruitment: false,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
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
              <p className="text-sm text-muted-foreground mt-1">Type to search and select countries for lead generation</p>
            </div>
            
            <Popover open={countryOpen} onOpenChange={setCountryOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={countryOpen}
                  className="w-full justify-between"
                >
                  {countryInput || "Search countries..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search countries..."
                    value={countryInput}
                    onValueChange={setCountryInput}
                  />
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {countries
                        .filter(country => 
                          country.name.toLowerCase().includes(countryInput.toLowerCase()) &&
                          !formData.selectedCountries.includes(country.code)
                        )
                        .slice(0, 10)
                        .map((country) => (
                          <CommandItem
                            key={country.code}
                            value={country.name}
                            onSelect={() => addCountry(country.code)}
                          >
                            {country.name}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {formData.selectedCountries.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {formData.selectedCountries.map((countryCode) => {
                  const country = countries.find(c => c.code === countryCode);
                  return (
                    <Badge
                      key={countryCode}
                      variant="default"
                      className="px-3 py-1"
                    >
                      {country?.name}
                      <button
                        onClick={() => removeCountry(countryCode)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          <Separator />

          {/* Job Roles Keywords */}
          <div className="space-y-4">
            <div>
              <Label>Job Roles Keywords</Label>
              <p className="text-sm text-muted-foreground mt-1">Type job roles and press Enter to add them</p>
            </div>
            
            <div className="flex gap-2">
              <Input
                value={jobRoleInput}
                onChange={(e) => setJobRoleInput(e.target.value)}
                onKeyPress={handleJobRoleKeyPress}
                placeholder="Type a job role and press Enter..."
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addJobRole(jobRoleInput)}
                disabled={!jobRoleInput.trim()}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {formData.selectedJobRoles.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {formData.selectedJobRoles.map((jobRole) => (
                  <Badge
                    key={jobRole}
                    variant="default"
                    className="px-3 py-1"
                  >
                    {jobRole}
                    <button
                      onClick={() => removeJobRole(jobRole)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Company Size */}
          <div className="space-y-4">
            <div>
              <Label>Company Size</Label>
              <p className="text-sm text-muted-foreground mt-1">Select the range of employees</p>
            </div>
            
            <div className="space-y-6">
              {/* Slider Container */}
              <div className="relative px-2">
                <Slider
                  value={[sizeToSliderValue(formData.companySizeMin), sizeToSliderValue(formData.companySizeMax)]}
                  onValueChange={handleSliderChange}
                  max={sizeStops.length - 1}
                  min={0}
                  step={1}
                  className="w-full"
                />
                
                {/* Labels below slider */}
                <div className="flex justify-between mt-3 px-1">
                  {sizeStops.map((stop, index) => (
                    <div key={stop.value} className="flex flex-col items-center">
                      <div 
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index >= sizeToSliderValue(formData.companySizeMin) && 
                          index <= sizeToSliderValue(formData.companySizeMax)
                            ? 'bg-primary' 
                            : 'bg-muted-foreground/30'
                        }`}
                      />
                      <span className="text-xs text-muted-foreground mt-1 font-medium">
                        {stop.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Range Display */}
              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground mb-1">Selected Range</div>
                <div className="text-lg font-semibold">
                  {formatSize(formData.companySizeMin)} – {formatSize(formData.companySizeMax)} employees
                </div>
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

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
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