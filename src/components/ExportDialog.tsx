import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalCompanies: number;
  currentPageCompanies: number;
}

const ExportDialog: React.FC<ExportDialogProps> = ({ 
  open, 
  onOpenChange, 
  totalCompanies, 
  currentPageCompanies 
}) => {
  const [exportType, setExportType] = useState('thisPage');
  const [format, setFormat] = useState('xlsx');
  const [customCount, setCustomCount] = useState('');

  const handleExport = () => {
    console.log('Exporting...', { exportType, format, customCount });
    // Implement actual export logic here
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Export companies</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Number of companies */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Number of companies</Label>
            <RadioGroup value={exportType} onValueChange={setExportType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="thisPage" id="thisPage" />
                <Label htmlFor="thisPage" className="text-sm font-normal cursor-pointer">
                  This page ({currentPageCompanies} companies)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="text-sm font-normal cursor-pointer">
                  All ({totalCompanies} companies)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom" className="text-sm font-normal cursor-pointer">
                  Custom
                </Label>
              </div>
            </RadioGroup>
            
            {exportType === 'custom' && (
              <Input
                type="number"
                placeholder="Enter number of companies"
                value={customCount}
                onChange={(e) => setCustomCount(e.target.value)}
                className="mt-2"
              />
            )}
          </div>

          {/* Format */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Format</Label>
            <RadioGroup value={format} onValueChange={setFormat}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="xlsx" id="xlsx" />
                <Label htmlFor="xlsx" className="text-sm font-normal cursor-pointer flex items-center gap-2">
                  .XLSX 📊 Excel
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="text-sm font-normal cursor-pointer">
                  .CSV (comma separated values)
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700">
            Export
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;