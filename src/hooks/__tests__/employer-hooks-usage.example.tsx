// Example usage of the new employer hooks
// This file demonstrates how to use the API-integrated data hooks

import React from 'react';
import { useEmployerJobs } from '../use-employer-jobs';
import { useEmployerStats } from '../use-employer-stats';
import { useEmployerApplications } from '../use-employer-applications';

// Example component using useEmployerJobs
export const JobsListExample = () => {
  const { 
    filteredJobs, 
    loading, 
    error, 
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    addJob,
    updateJob,
    deleteJob 
  } = useEmployerJobs();

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <input 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search jobs..."
      />
      
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      {filteredJobs.map(job => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.company} - {job.location}</p>
          <button onClick={() => updateJob(job.id, { is_active: !job.is_active })}>
            {job.is_active ? 'Deactivate' : 'Activate'}
          </button>
          <button onClick={() => deleteJob(job.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

// Example component using useEmployerStats
export const StatsExample = () => {
  const { stats, isLoading, error, percentageChanges } = useEmployerStats();

  if (isLoading) return <div>Loading stats...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stats) return null;

  return (
    <div>
      <h2>Dashboard Statistics</h2>
      <div>
        <p>Total Jobs: {stats.totalJobs} ({percentageChanges.totalJobsChange}%)</p>
        <p>Active Jobs: {stats.activeJobs} ({percentageChanges.activeJobsChange}%)</p>
        <p>Total Applications: {stats.totalApplications} ({percentageChanges.applicationsChange}%)</p>
        <p>Average Applications per Job: {stats.avgApplicationsPerJob.toFixed(1)}</p>
      </div>
    </div>
  );
};

// Example component using useEmployerApplications
export const ApplicationsExample = () => {
  const {
    filteredApplications,
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    jobFilter,
    setJobFilter,
    searchQuery,
    setSearchQuery,
    reviewApplication,
    stats,
    uniqueJobs
  } = useEmployerApplications();

  if (isLoading) return <div>Loading applications...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Applications ({stats.total})</h2>
      
      <div>
        <input 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search applicants..."
        />
        
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending ({stats.pending})</option>
          <option value="reviewed">Reviewed ({stats.reviewed})</option>
          <option value="accepted">Accepted ({stats.accepted})</option>
          <option value="rejected">Rejected ({stats.rejected})</option>
        </select>

        <select value={jobFilter} onChange={(e) => setJobFilter(e.target.value)}>
          <option value="all">All Jobs</option>
          {uniqueJobs.map(job => (
            <option key={job.id} value={job.id}>{job.title}</option>
          ))}
        </select>
      </div>

      {filteredApplications.map(app => (
        <div key={app.id}>
          <h4>{app.applicantInfo.name}</h4>
          <p>{app.applicantInfo.email}</p>
          <p>Applied for: {app.jobInfo.title}</p>
          <p>Status: {app.status}</p>
          <p>Applied on: {app.appliedDate}</p>
          
          {app.status === 'Pending' && (
            <div>
              <button onClick={() => reviewApplication(app.id, 'Reviewed')}>
                Mark as Reviewed
              </button>
              <button onClick={() => reviewApplication(app.id, 'Accepted')}>
                Accept
              </button>
              <button onClick={() => reviewApplication(app.id, 'Rejected')}>
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
