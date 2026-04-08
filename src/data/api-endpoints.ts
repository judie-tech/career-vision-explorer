export const apiEndpoints = [
  {
    category: "Authentication API",
    endpoints: [
      { 
        method: "POST", 
        path: "/api/auth/login", 
        description: "Authenticate user with credentials",
        params: ["email", "password"],
        example: `const response = await AuthApi.login({
  email: 'user@example.com',
  password: 'password123'
});`,
        response: `{
  "success": true,
  "user": {...},
  "token": "auth_token_...",
  "message": "Login successful"
}`
      },
      { 
        method: "POST", 
        path: "/api/auth/signup", 
        description: "Create new user account",
        params: ["name", "email", "password", "role", "phoneNumber", "countryCode", "profileImage"],
        example: `const response = await AuthApi.signup({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  role: 'jobseeker'
});`,
        response: `{
  "success": true,
  "user": {...},
  "token": "auth_token_...",
  "message": "Account created successfully"
}`
      },
      { 
        method: "POST", 
        path: "/api/auth/logout", 
        description: "Logout current user",
        example: `await AuthApi.logout();`
      },
      { 
        method: "POST", 
        path: "/api/auth/refresh", 
        description: "Refresh authentication token",
        example: `const response = await AuthApi.refreshToken();`
      },
    ]
  },
  {
    category: "Theme API",
    endpoints: [
      { 
        method: "GET", 
        path: "/api/theme", 
        description: "Get current theme settings (light mode only)",
        example: `const theme = await ThemeApi.getTheme();`,
        response: `{
  "theme": "light",
  "customization": {
    "primaryColor": "#3b82f6",
    "secondaryColor": "#64748b"
  }
}`
      },
      { 
        method: "PUT", 
        path: "/api/theme/customize", 
        description: "Update theme customization (colors only)",
        params: ["primaryColor", "secondaryColor", "accentColor"],
        example: `const result = await ThemeApi.updateCustomization({
  primaryColor: '#3b82f6',
  secondaryColor: '#64748b',
  accentColor: '#10b981'
});`,
        response: `{
  "success": true,
  "message": "Theme customization updated"
}`
      },
    ]
  },
  {
    category: "Jobs API",
    endpoints: [
      { 
        method: "GET", 
        path: "/api/jobs", 
        description: "Search jobs with advanced filters",
        params: ["query", "location", "type", "experienceLevel", "skills", "salaryMin", "salaryMax", "page", "limit", "isRemote"],
        example: `const results = await JobsApi.searchJobs({
  query: 'frontend developer',
  location: 'Nairobi',
  experienceLevel: 'Senior',
  isRemote: true,
  page: 1,
  limit: 10
});`,
        response: `{
  "jobs": [...],
  "total": 150,
  "page": 1,
  "limit": 10,
  "hasMore": true
}`
      },
      { 
        method: "GET", 
        path: "/api/jobs/:id", 
        description: "Get detailed job information by ID",
        params: ["id"],
        example: `const job = await JobsApi.getJobById('job123');`,
        response: `{
  "id": "job123",
  "title": "Senior Frontend Developer",
  "company": "TechCorp Kenya",
  "requirements": [...],
  "benefits": [...],
  "companyInfo": {...}
}`
      },
      { 
        method: "POST", 
        path: "/api/jobs/:id/save", 
        description: "Save job to user's wishlist",
        params: ["id"],
        example: `await JobsApi.saveJob('job123');`
      },
      { 
        method: "DELETE", 
        path: "/api/jobs/:id/save", 
        description: "Remove job from wishlist",
        params: ["id"],
        example: `await JobsApi.unsaveJob('job123');`
      },
      { 
        method: "GET", 
        path: "/api/jobs/saved", 
        description: "Get user's saved jobs",
        example: `const savedJobs = await JobsApi.getSavedJobs();`
      },
      { 
        method: "POST", 
        path: "/api/jobs/:id/apply", 
        description: "Submit job application",
        params: ["id", "coverLetter", "resume", "customAnswers", "portfolioLinks"],
        example: `await JobsApi.applyToJob('job123', {
  coverLetter: 'Dear Hiring Manager...',
  resume: 'resume_file_id',
  customAnswers: { question1: 'answer1' }
});`
      },
    ]
  },
  {
    category: "Profile API",
    endpoints: [
      { 
        method: "GET", 
        path: "/api/profile", 
        description: "Get authenticated user's profile",
        example: `const profile = await ProfileApi.getProfile();`,
        response: `{
  "id": "user123",
  "name": "John Doe",
  "skills": [...],
  "preferences": {...},
  "profileComplete": 85,
  "isVerified": true
}`
      },
      { 
        method: "PUT", 
        path: "/api/profile", 
        description: "Update user profile information",
        params: ["name", "bio", "skills", "location", "phone", "preferences"],
        example: `const updated = await ProfileApi.updateProfile({
  name: 'John Doe',
  bio: 'Updated bio',
  skills: ['React', 'TypeScript'],
  preferences: {
    jobTypes: ['Full-time'],
    remoteWork: true
  }
});`
      },
      { 
        method: "POST", 
        path: "/api/profile/image", 
        description: "Upload and update profile image",
        params: ["imageFile"],
        example: `const imageUrl = await ProfileApi.uploadProfileImage(file);`
      },
      { 
        method: "POST", 
        path: "/api/profile/resume", 
        description: "Upload resume document",
        params: ["resumeFile"],
        example: `const resumeId = await ProfileApi.uploadResume(file);`
      },
      { 
        method: "DELETE", 
        path: "/api/profile", 
        description: "Delete user profile and all data",
        example: `await ProfileApi.deleteProfile();`
      },
    ]
  },
  {
    category: "Applications API",
    endpoints: [
      { 
        method: "GET", 
        path: "/api/applications", 
        description: "Get all user's job applications",
        example: `const applications = await ApplicationsApi.getApplications();`,
        response: `[{
  "id": "app123",
  "status": "Interview",
  "interviewDate": "2024-06-20",
  "feedback": "...",
  "matchScore": 95
}]`
      },
      { 
        method: "GET", 
        path: "/api/applications/:id", 
        description: "Get specific application details",
        params: ["id"],
        example: `const app = await ApplicationsApi.getApplicationById('app123');`
      },
      { 
        method: "POST", 
        path: "/api/applications", 
        description: "Submit new job application",
        params: ["jobId", "coverLetter", "resume", "customAnswers", "portfolioLinks", "availableStartDate"],
        example: `const app = await ApplicationsApi.submitApplication({
  jobId: 'job123',
  coverLetter: 'My cover letter...',
  availableStartDate: '2024-07-01',
  salaryExpectation: 'KES 150,000/month'
});`
      },
      { 
        method: "PUT", 
        path: "/api/applications/:id/status", 
        description: "Update application status (admin only)",
        params: ["id", "status"],
        example: `await ApplicationsApi.updateApplicationStatus('app123', 'Interview');`
      },
      { 
        method: "DELETE", 
        path: "/api/applications/:id", 
        description: "Withdraw job application",
        params: ["id"],
        example: `await ApplicationsApi.withdrawApplication('app123');`
      },
      { 
        method: "GET", 
        path: "/api/applications/stats", 
        description: "Get application statistics",
        example: `const stats = await ApplicationsApi.getApplicationStats();`,
        response: `{
  "total": 15,
  "pending": 8,
  "interviews": 3,
  "offers": 1
}`
      },
    ]
  },
  {
    category: "Career Paths API",
    endpoints: [
      { 
        method: "GET", 
        path: "/api/career-paths", 
        description: "Get all available career paths",
        example: `const paths = await CareerPathsApi.getCareerPaths();`
      },
      { 
        method: "GET", 
        path: "/api/career-paths/:id", 
        description: "Get career path by ID",
        params: ["id"],
        example: `const path = await CareerPathsApi.getCareerPathById('path123');`
      },
      { 
        method: "POST", 
        path: "/api/career-paths/:id/enroll", 
        description: "Enroll in career path",
        params: ["id"],
        example: `await CareerPathsApi.enrollInCareerPath('path123');`
      },
      { 
        method: "PUT", 
        path: "/api/career-paths/:pathId/steps/:stepId", 
        description: "Update step progress",
        params: ["pathId", "stepId", "completed"],
        example: `await CareerPathsApi.updateStepProgress('path123', 'step456', true);`
      },
    ]
  },
  {
    category: "Skills API",
    endpoints: [
      { 
        method: "GET", 
        path: "/api/skills", 
        description: "Get user skills",
        example: `const skills = await SkillsApi.getUserSkills();`
      },
      { 
        method: "POST", 
        path: "/api/skills", 
        description: "Add new skill",
        params: ["name", "category", "level"],
        example: `const skill = await SkillsApi.addSkill('Vue.js', 'Frontend');`
      },
      { 
        method: "POST", 
        path: "/api/skills/:id/assess", 
        description: "Start skill assessment",
        params: ["id"],
        example: `const questions = await SkillsApi.startSkillAssessment('skill123');`
      },
      { 
        method: "POST", 
        path: "/api/skills/:id/submit", 
        description: "Submit skill assessment",
        params: ["id", "answers"],
        example: `const result = await SkillsApi.submitSkillAssessment('skill123', [0, 2, 1, 3]);`
      },
    ]
  },
  {
    category: "Messaging API",
    endpoints: [
      { 
        method: "GET", 
        path: "/api/messages/freelancer-inbox", 
        description: "Get messages from potential clients",
        example: `const messages = await MessagingApi.getFreelancerInbox();`,
        response: `[{
  "id": "msg123",
  "clientName": "TechCorp Ltd",
  "subject": "Web Development Project",
  "preview": "We're interested in your services...",
  "timestamp": "2024-06-15T10:00:00Z",
  "isRead": false,
  "projectType": "Web Development",
  "budget": "KES 50,000 - 100,000"
}]`
      },
      { 
        method: "GET", 
        path: "/api/messages/employer-inbox", 
        description: "Get messages from freelancers",
        example: `const messages = await MessagingApi.getEmployerInbox();`,
        response: `[{
  "id": "msg456",
  "freelancerName": "Sarah Johnson",
  "freelancerRating": 4.9,
  "subject": "Project Proposal",
  "preview": "I'd love to work on your project...",
  "timestamp": "2024-06-15T12:00:00Z",
  "isRead": false,
  "skills": ["React", "Node.js"],
  "proposedRate": "KES 3,000/hour"
}]`
      },
      { 
        method: "POST", 
        path: "/api/messages/send", 
        description: "Send message to freelancer or client",
        params: ["recipientId", "subject", "message", "projectType", "budget"],
        example: `await MessagingApi.sendMessage({
  recipientId: 'user123',
  subject: 'Project Inquiry',
  message: 'I would like to discuss...',
  projectType: 'Web Development'
});`
      },
      { 
        method: "GET", 
        path: "/api/messages/conversation/:userId", 
        description: "Get conversation with specific user",
        params: ["userId"],
        example: `const conversation = await MessagingApi.getConversation('user123');`
      },
      { 
        method: "PUT", 
        path: "/api/messages/:id/read", 
        description: "Mark message as read",
        params: ["id"],
        example: `await MessagingApi.markAsRead('msg123');`
      },
    ]
  }
];

export const mobileEndpoints = [
  {
    category: "Mobile Config",
    endpoints: [
      { 
        method: "GET", 
        path: "/api/mobile/config", 
        description: "Get mobile app configuration",
        example: `const config = await MobileApi.getAppConfig();`,
        response: `{
  "appVersion": "1.0.0",
  "apiVersion": "v1",
  "features": ["offline_mode", "push_notifications"],
  "maintenanceMode": false
}`
      },
      { 
        method: "GET", 
        path: "/api/mobile/updates", 
        description: "Check for app updates",
        example: `const update = await MobileApi.checkForUpdates();`,
        response: `{
  "hasUpdate": false
}`
      },
    ]
  },
  {
    category: "Push Notifications",
    endpoints: [
      { 
        method: "POST", 
        path: "/api/mobile/notifications/register", 
        description: "Register device for notifications",
        params: ["deviceToken", "platform", "userId"],
        example: `await MobileApi.registerForPushNotifications(deviceToken);`
      },
      { 
        method: "POST", 
        path: "/api/mobile/notifications/send", 
        description: "Send push notification",
        params: ["title", "body", "data", "scheduledAt"],
        example: `await MobileApi.sendPushNotifications({
  title: "New Job Match",
  body: "We found 3 new jobs for you"
});`
      },
    ]
  },
  {
    category: "Offline Sync",
    endpoints: [
      { 
        method: "GET", 
        path: "/api/mobile/sync", 
        description: "Download offline data",
        example: `const data = await MobileApi.syncOfflineData();`,
        response: `{
  "jobs": [...],
  "profile": {...},
  "applications": [...],
  "lastSync": "2024-06-15T10:00:00Z"
}`
      },
      { 
        method: "POST", 
        path: "/api/mobile/sync", 
        description: "Upload offline changes",
        params: ["applications", "profileUpdates"],
        example: `await MobileApi.uploadOfflineData({
  applications: [...],
  profileUpdates: {...}
});`
      },
    ]
  }
];
