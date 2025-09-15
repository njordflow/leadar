import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  
  const [organizationData, setOrganizationData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@leadflow.pro',
    companyName: 'LeadFlow Pro',
    phone: '+1 (555) 123-4567'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleOrganizationChange = (field: string, value: string) => {
    setOrganizationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveOrganization = () => {
    // Simulate saving organization data
    toast({
      title: "Organization details saved",
      description: "Your account information has been updated successfully.",
    });
  };

  const handleSavePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    // Simulate saving password
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
  };

  return (
    <div className="p-6 space-y-6 h-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences.
        </p>
      </div>

      <Separator />

      {/* Two column layout for better space utilization */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full">
        {/* Organization Details */}
        <Card className="h-fit">
          <CardHeader className="pb-4">
            <CardTitle>Organization details</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage your account information.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm">First Name</Label>
                <Input
                  id="firstName"
                  value={organizationData.firstName}
                  onChange={(e) => handleOrganizationChange('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  className="h-9"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                <Input
                  id="lastName"
                  value={organizationData.lastName}
                  onChange={(e) => handleOrganizationChange('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  className="h-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                value={organizationData.email}
                onChange={(e) => handleOrganizationChange('email', e.target.value)}
                placeholder="Enter your email address"
                className="h-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm">Company Name</Label>
              <Input
                id="companyName"
                value={organizationData.companyName}
                onChange={(e) => handleOrganizationChange('companyName', e.target.value)}
                placeholder="Enter your company name"
                className="h-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={organizationData.phone}
                onChange={(e) => handleOrganizationChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                className="h-9"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={handleSaveOrganization} size="sm">
                Save changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Password Section */}
        <Card className="h-fit">
          <CardHeader className="pb-4">
            <CardTitle>Password</CardTitle>
            <p className="text-sm text-muted-foreground">
              Define a new password. If not filled, no password modification will be applied.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-sm">Current password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                placeholder="Leave empty if you don't want to change it."
                className="h-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-sm">New password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                placeholder="Enter new password"
                className="h-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm">New password confirmation</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                placeholder="Confirm new password"
                className="h-9"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button 
                onClick={handleSavePassword}
                size="sm"
                disabled={!passwordData.newPassword || !passwordData.confirmPassword}
              >
                Save changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;