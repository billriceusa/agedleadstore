import { notFound } from 'next/navigation';
import { CSV_FILES } from '@/types';
import { DashboardLayout } from '@/components/dashboard-layout';

interface DashboardPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CSV_FILES.map((file) => ({
    slug: file.name,
  }));
}

export async function generateMetadata({ params }: DashboardPageProps) {
  const { slug } = await params;
  const file = CSV_FILES.find(f => f.name === slug);
  
  if (!file) {
    return {
      title: 'Dashboard Not Found',
    };
  }

  return {
    title: `${file.displayName} - Privacy Dashboard`,
    description: file.description,
  };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { slug } = await params;
  const file = CSV_FILES.find(f => f.name === slug);

  if (!file) {
    notFound();
  }

  return (
    <DashboardLayout
      filename={file.filename}
      title={file.displayName}
      description={file.description}
    />
  );
}
