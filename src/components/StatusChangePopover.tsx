import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface StatusChangePopoverProps {
  currentStatus: string;
  onStatusChange: (status: string, reason?: string) => void;
  children: React.ReactNode;
}

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'verified', label: 'Verified' },
  { value: 'excluded', label: 'Excluded' },
  { value: 'duplicate', label: 'Duplicate' }
];

const StatusChangePopover = ({ currentStatus, onStatusChange, children }: StatusChangePopoverProps) => {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [reason, setReason] = useState('');

  const handleSave = () => {
    onStatusChange(selectedStatus, reason.trim() || undefined);
    setOpen(false);
    setReason('');
  };

  const handleCancel = () => {
    setSelectedStatus(currentStatus);
    setReason('');
    setOpen(false);
  };

  const needsReason = selectedStatus === 'excluded' || selectedStatus === 'duplicate';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Change status</h4>
          
          <RadioGroup value={selectedStatus} onValueChange={setSelectedStatus}>
            {statusOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {needsReason && (
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-sm text-muted-foreground">
                Reason (optional)
              </Label>
              <Input
                id="reason"
                placeholder="Optional reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="text-sm"
              />
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleSave}
              size="sm"
              className="flex-1"
              disabled={selectedStatus === currentStatus}
            >
              <Check className="h-3 w-3 mr-1" />
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="ghost"
              size="sm"
              className="flex-1"
            >
              <X className="h-3 w-3 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default StatusChangePopover;