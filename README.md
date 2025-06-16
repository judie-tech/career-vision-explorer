# Career Vision Explorer - Jobs Portal

A comprehensive job portal with AI-powered features, connecting job seekers with employers through intelligent matching and skills assessment.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Git

### 1. Frontend Setup (React)

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on: **http://localhost:8080**

### 2. Backend Setup (FastAPI)

Open a new terminal and run:

```bash
# Navigate to backend directory
cd jobsportal

# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
uvicorn main:app --reload --port 8000
```

The backend API will run on: **http://localhost:8000**

### 3. Access the Application

- **Web App**: http://localhost:8080
- **API Documentation**: http://localhost:8000/docs
- **API Alternative Docs**: http://localhost:8000/redoc

## 🔧 Development Workflow

### Running Both Frontend & Backend

1. **Terminal 1 - Frontend**:
   ```bash
   npm run dev
   ```

2. **Terminal 2 - Backend**:
   ```bash
   cd jobsportal
   uvicorn main:app --reload --port 8000
   ```

### Environment Configuration

The `.env` file is already configured for local development:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_BACKEND_URL=http://localhost:8000
```

## 📱 Features

### For Job Seekers
- **Smart Job Search** with AI-powered matching
- **Skills Assessment** and gap analysis
- **Resume Analysis** with AI feedback
- **Application Tracking** and status updates
- **Career Path Recommendations**
- **Interview Preparation** with AI-generated questions

### For Employers
- **Job Posting Management**
- **Applicant Tracking System**
- **Bulk Application Processing**
- **Interview Scheduling**
- **Analytics Dashboard**

### For Administrators
- **User Management**
- **Content Management**
- **System Analytics**
- **Skills Database Management**

## 🏗️ Architecture

```
Frontend (React + TypeScript)     Backend (FastAPI + Python)
├── Web App (Port 8080)          ├── API Server (Port 8000)
├── Mobile PWA Support           ├── AI Services (Gemini)
├── Offline Capabilities         ├── Database (Supabase)
└── Real-time Updates           └── Authentication (JWT)
```

## 🔐 Authentication

### Test Accounts
You can create accounts through the registration page or use these test credentials:

**Admin Account**:
- Email: admin@visiondrill.com
- Password: admin123

**Employer Account**:
- Email: employer@visiondrill.com  
- Password: employer123

**Job Seeker Account**:
- Email: jobseeker@visiondrill.com
- Password: jobseeker123

## 🛠️ Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run lint         # Run linting
```

### Backend
```bash
cd jobsportal
uvicorn main:app --reload --port 8000    # Start development server
python -m pytest                         # Run tests
```

## 📊 Database

The application uses **Supabase (PostgreSQL)** with the following main tables:
- `profile` - User profiles and authentication
- `jobs_listing` - Job postings
- `applications` - Job applications
- `skills_listing` - Available skills
- `recommendations` - AI-generated recommendations

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Railway/Render/Heroku)
```bash
cd jobsportal
# Deploy using your preferred platform
```

## 🔧 Troubleshooting

### Common Issues

1. **Frontend can't connect to backend**:
   - Ensure backend is running on port 8000
   - Check if `.env` file has correct API URLs

2. **Database connection errors**:
   - Verify Supabase credentials in `jobsportal/.env`
   - Check network connectivity

3. **Authentication not working**:
   - Clear browser localStorage
   - Restart both frontend and backend servers

### Logs & Debugging

- **Frontend**: Check browser console (F12)
- **Backend**: Check terminal output where uvicorn is running
- **API Requests**: Use Network tab in browser dev tools

## 📚 Documentation

- **Backend Integration**: [docs/backend-integration.md](docs/backend-integration.md)
- **API Reference**: http://localhost:8000/docs (when backend is running)
- **Mobile API**: [docs/mobile-api.md](docs/mobile-api.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the terminal output for error messages
3. Ensure both frontend and backend servers are running
4. Verify database connectivity

---

**Happy Coding! 🎉**
