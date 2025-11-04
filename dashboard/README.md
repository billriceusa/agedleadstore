# Privacy Dashboard

A comprehensive analytics dashboard for privacy rights requests and opt-out forms from Aged Lead Store.

## Features

### 📊 Dashboard Metrics

Each CSV file dashboard includes the following 6 key metrics:

1. **Number of submissions per day** - Interactive line chart showing daily submission trends
2. **Number of submissions per month** - Monthly aggregated submission data
3. **Top 10 IP addresses** - Most frequent IP addresses with submission counts
4. **Top 10 States** - Geographic distribution of submissions by state
5. **Top 10 Email addresses** - Most frequent email addresses submitting requests
6. **Top 10 First and Last Names** - Most common names in submissions

### 📋 Form Types Covered

- **Consumer Privacy Rights Requests** - Comprehensive privacy requests including data deletion, portability, disclosure, and correction
- **Opt-out from Profiling** - Requests to opt-out from personal information profiling and predictive analysis
- **Opt-out from Targeted Advertising** - Requests to opt-out from targeted advertising
- **Opt-out from Sale/Sharing** - Requests to opt-out from data sale and sharing with third parties
- **Opt-out from Sensitive Info Use/Sharing** - Requests to opt-out from sensitive personal information use/sharing

## Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Interactive charts and data visualization
- **Papa Parse** - CSV parsing library
- **Lucide React** - Modern icon library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the dashboard directory:
   ```bash
   cd dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Data Files

The dashboard automatically loads CSV files from the `public/data/` directory. The following files are expected:

- `consumer-privacy-rights-request-form-2025-11-04.csv`
- `opt-out-from-profiling-form-2025-11-04.csv`
- `opt-out-from-targeted-advertising-2025-11-04.csv`
- `opt-out-from-the-sale-andor-sharing-of-your-personal-information-2025-11-04.csv`
- `opt-out-from-the-use-andor-sharing-of-your-sensitive-personal-information-2025-11-04.csv`

## Project Structure

```
dashboard/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/[slug]/   # Dynamic dashboard routes
│   │   ├── layout.tsx          # Root layout with navigation
│   │   └── page.tsx           # Homepage with overview
│   ├── components/            # Reusable React components
│   │   ├── dashboard-layout.tsx
│   │   ├── metric-card.tsx
│   │   ├── navigation.tsx
│   │   ├── submissions-chart.tsx
│   │   └── top-items-table.tsx
│   ├── lib/                   # Utility libraries
│   │   └── data-processor.ts  # CSV processing and metrics calculation
│   └── types/                 # TypeScript type definitions
│       └── index.ts
├── public/
│   └── data/                  # CSV data files
└── package.json
```

## Usage

### Navigation

- **Overview Page** (`/`) - Landing page with links to all dashboards
- **Individual Dashboards** (`/dashboard/[form-type]`) - Specific analytics for each form type

### Dashboard Features

- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Interactive Charts** - Hover for detailed data points
- **Real-time Loading** - Data processed client-side for fast interactions
- **Clean UI** - Modern design with clear data visualization

## Development

### Adding New CSV Files

1. Add the CSV file to `public/data/`
2. Update the `CSV_FILES` array in `src/types/index.ts`
3. Ensure the CSV has the required columns:
   - `First Name`, `Last Name`
   - `Email` or `Email Address`
   - `State`
   - `Entry Date`
   - `User IP`

### Customizing Metrics

Modify the `DataProcessor.calculateMetrics()` method in `src/lib/data-processor.ts` to add or change metrics calculations.

### Styling

The project uses Tailwind CSS. Customize the design by modifying the utility classes in the component files.

## Building for Production

```bash
npm run build
npm start
```

## License

This project is part of the Aged Lead Store privacy compliance system.