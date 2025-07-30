import React, { useState, useEffect } from 'react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  UserCircle, 
  Plus, 
  Check,
  Loader2,
  ChevronDown
} from "lucide-react";
import { roleService, UserRoles } from "@/services/role.service";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

export function RoleSwitcher() {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [roles, setRoles] = useState<UserRoles | null>(null);
  const [loading, setLoading] = useState(false);
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    if (user) {
      loadRoles();
    }
  }, [user]);

  const loadRoles = async () => {
    try {
      setLoading(true);
      const userRoles = await roleService.getMyRoles();
      setRoles(userRoles);
    } catch (error) {
      console.error('Failed to load roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchRole = async (role: string) => {
    if (role === roles?.active_role) return;

    try {
      setSwitching(true);
      console.log('RoleSwitcher: Switching to role:', role);
      const result = await roleService.switchRole(role);
      console.log('RoleSwitcher: Switch result:', result);
      toast.success(result.message);
      
      // Reload roles
      await loadRoles();
      
      // Refresh auth profile to get updated role from backend
      await refreshProfile();
      
      // Force a page reload to ensure all components get the updated auth state
      // and navigate to appropriate dashboard
      if (role === 'freelancer') {
        window.location.href = '/freelancer/dashboard';
      } else if (role === 'job_seeker') {
        window.location.href = '/jobseeker/dashboard';
      } else if (role === 'employer') {
        window.location.href = '/employer/dashboard';
      }
    } catch (error) {
      toast.error('Failed to switch role');
      console.error('Role switch error:', error);
    } finally {
      setSwitching(false);
    }
  };

  const handleAddRole = async () => {
    // Determine which role to add based on current role
    const currentRole = user?.account_type || roles?.active_role;
    const newRole = currentRole === 'job_seeker' ? 'freelancer' : 'job_seeker';

    try {
      setSwitching(true);
      const result = await roleService.addRole(newRole);
      toast.success(result.message || `Added ${newRole} role successfully`);
      await loadRoles();
    } catch (error: any) {
      toast.error(error.message || 'Failed to add role');
      console.error('Add role error:', error);
    } finally {
      setSwitching(false);
    }
  };

  if (!user || loading) {
    return null;
  }

  const currentRole = roles?.active_role || user.account_type;
  const hasMultipleRoles = roles && roles.roles.length > 1;
  const canAddRole = (currentRole === 'job_seeker' || currentRole === 'freelancer') && 
                     (!roles || roles.roles.length === 1);

  const getRoleIcon = (role: string) => {
    return role === 'freelancer' ? <Briefcase className="w-4 h-4" /> : <UserCircle className="w-4 h-4" />;
  };

  const getRoleLabel = (role: string) => {
    return role === 'freelancer' ? 'Freelancer' : 
           role === 'job_seeker' ? 'Job Seeker' : 
           role === 'employer' ? 'Employer' : 'Admin';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          {getRoleIcon(currentRole)}
          <span className="hidden sm:inline">{getRoleLabel(currentRole)}</span>
          {hasMultipleRoles && <Badge variant="secondary" className="ml-1">Multi</Badge>}
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {roles?.roles.map((role) => (
          <DropdownMenuItem
            key={role}
            onClick={() => handleSwitchRole(role)}
            disabled={switching || role === currentRole}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              {getRoleIcon(role)}
              <span>{getRoleLabel(role)}</span>
            </div>
            {role === currentRole && <Check className="w-4 h-4 text-green-500" />}
          </DropdownMenuItem>
        ))}
        
        {canAddRole && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleAddRole}
              disabled={switching}
              className="flex items-center gap-2"
            >
              {switching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span>
                Add {currentRole === 'job_seeker' ? 'Freelancer' : 'Job Seeker'} Role
              </span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
