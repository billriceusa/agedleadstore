# Deployment Guide

## Vercel Deployment

### Option 1: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Navigate to the dashboard directory:
   ```bash
   cd dashboard
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Deploy the project:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository: `billriceusa/agedleadstore`
4. Set the following configuration:
   - **Framework Preset**: Next.js
   - **Root Directory**: `dashboard`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Environment Configuration

No environment variables are required for this deployment as the CSV files are served statically from the `public/data` directory.

### Post-Deployment

After deployment, your dashboard will be available at:
- Production URL: `https://your-project-name.vercel.app`

The dashboard includes:
- Overview page at `/`
- Individual form dashboards at `/dashboard/[form-type]`

### Updating Data

To update the CSV data:
1. Replace the CSV files in `dashboard/public/data/`
2. Commit and push changes to GitHub
3. Vercel will automatically redeploy

### Custom Domain (Optional)

To add a custom domain:
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS settings as instructed

## Project Structure for Deployment

```
agedleadstore/
├── dashboard/              # Next.js application (deployment root)
│   ├── public/
│   │   └── data/          # CSV files
│   ├── src/               # Source code
│   ├── package.json       # Dependencies
│   ├── vercel.json       # Vercel configuration
│   └── README.md         # Project documentation
├── data/                  # Original CSV files (copied to dashboard/public/data)
└── DEPLOYMENT.md         # This file
```

## Troubleshooting

### Build Issues
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run build`
- Verify CSV files are in `public/data/` directory

### Runtime Issues
- Check browser console for JavaScript errors
- Verify CSV files are accessible at `/data/filename.csv`
- Ensure all required columns exist in CSV files

### Performance
- Large CSV files (>10MB) may cause slow loading
- Consider implementing server-side processing for very large datasets
- Use pagination for tables with many rows
