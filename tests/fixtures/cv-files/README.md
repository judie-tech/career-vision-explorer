# Test CV Fixtures

This directory contains test CV files for automated testing.

## ✅ Available Files (All Created)

- ✓ `sample-cv.pdf` (2.94 KB) - Standard CV with complete information (John Doe, Software Engineer)
- ✓ `sample-cv.docx` (36.27 KB) - DOCX format CV with same content as PDF version
- ✓ `comprehensive-cv.pdf` (2.28 KB) - CV with all sections (Jane Smith: experience, education, projects, certifications)
- ✓ `sample-cv-with-duplicates.pdf` (1.66 KB) - CV containing duplicate skills for testing duplicate removal
- ✓ `updated-cv.pdf` (1.82 KB) - Updated version of sample CV (John Doe with new position)
- ✓ `corrupted-cv.pdf` (0.07 KB) - Invalid/corrupted PDF for error testing
- ✓ `invalid.jpg` (0.07 KB) - Invalid file type (image) for file type validation testing
- ✓ `large-cv.pdf` (195.47 KB) - Large file for size limit testing (note: currently 195KB, not 10MB+)

## Usage

These fixtures are used by:
- `tests/e2e/cv-upload.spec.ts` - CV upload and parsing tests
- `tests/e2e/jobseeker-workflow.spec.ts` - Job application with CV upload

## File Contents

### sample-cv.pdf
- Name: John Doe
- Title: Software Engineer | Full Stack Developer
- Skills: JavaScript, TypeScript, Python, React, Node.js, PostgreSQL, AWS, Docker
- Experience: 2 positions (Senior Software Engineer, Software Engineer)
- Education: BS in Computer Science
- Certifications: AWS Certified, PSM I

### comprehensive-cv.pdf
- Name: Jane Smith
- Title: Senior Full Stack Developer
- Extensive skills list (20+ technologies)
- Multiple work experiences (3 positions)
- Education: Master's and Bachelor's degrees
- Projects: E-commerce Platform, AI Chatbot
- Certifications: AWS, GCP, Azure

### sample-cv-with-duplicates.pdf
- Contains intentionally duplicated skills: JavaScript (3x), React (3x), TypeScript (3x)
- Used to test skill deduplication functionality

## Regenerating Files

If you need to regenerate these fixtures:
```bash
python create_cv_fixtures.py
```

This will recreate all test CV files with realistic content.
