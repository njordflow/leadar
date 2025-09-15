import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: any) => void;
}

const FilterDialog: React.FC<FilterDialogProps> = ({ open, onOpenChange, onApplyFilters }) => {
  const [companySizeMin, setCompanySizeMin] = useState('');
  const [companySizeMax, setCompanySizeMax] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [showWithComments, setShowWithComments] = useState(false);

  const companySizes = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501-1000', label: '501-1000 employees' },
    { value: '1001-5000', label: '1001-5000 employees' },
    { value: '5000+', label: '5000+ employees' }
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Education',
    'Construction',
    'Transportation',
    'Energy',
    'Real Estate',
    'Media',
    'Government',
    'Non-profit',
    'Consulting',
    'Logistics',
    'Robotics',
    'Relocation'
  ];

  const handleIndustryChange = (industry: string, checked: boolean) => {
    if (checked) {
      setSelectedIndustries([...selectedIndustries, industry]);
    } else {
      setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
    }
  };

  const handleApply = () => {
    onApplyFilters({
      companySizeMin,
      companySizeMax,
      industries: selectedIndustries,
      withComments: showWithComments
    });
    onOpenChange(false);
  };

  const handleReset = () => {
    setCompanySizeMin('');
    setCompanySizeMax('');
    setSelectedIndustries([]);
    setShowWithComments(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>More Filters</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Company Size */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Company Size</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">From</Label>
                <Select value={companySizeMin} onValueChange={setCompanySizeMin}>
                  <SelectTrigger>
                    <SelectValue placeholder="Min size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">To</Label>
                <Select value={companySizeMax} onValueChange={setCompanySizeMax}>
                  <SelectTrigger>
                    <SelectValue placeholder="Max size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Industry */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Industry</Label>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center space-x-2">
                  <Checkbox
                    id={industry}
                    checked={selectedIndustries.includes(industry)}
                    onCheckedChange={(checked) => handleIndustryChange(industry, !!checked)}
                  />
                  <Label
                    htmlFor={industry}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {industry}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* With Comments Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Comments</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="withComments"
                checked={showWithComments}
                onCheckedChange={(checked) => setShowWithComments(!!checked)}
              />
              <Label
                htmlFor="withComments"
                className="text-sm font-normal cursor-pointer"
              >
                Show only companies with comments
              </Label>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;