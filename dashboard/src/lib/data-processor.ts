import Papa from 'papaparse';
import { CSVRow, DashboardMetrics } from '@/types';

export class DataProcessor {
  static async loadCSV(filename: string): Promise<CSVRow[]> {
    try {
      const response = await fetch(`/data/${filename}`);
      const csvText = await response.text();
      
      const result = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header: string) => header.trim().replace(/"/g, ''),
      });
      
      return result.data as CSVRow[];
    } catch (error) {
      console.error(`Error loading CSV file ${filename}:`, error);
      return [];
    }
  }

  static calculateMetrics(data: CSVRow[]): DashboardMetrics {
    // Helper function to get email from different possible column names
    const getEmail = (row: CSVRow): string => {
      return row.Email || row['Email Address'] || '';
    };

    // Helper function to parse date
    const parseDate = (dateStr: string): Date => {
      return new Date(dateStr);
    };

    // Helper function to format date for grouping
    const formatDate = (date: Date): string => {
      return date.toISOString().split('T')[0];
    };

    // Helper function to format month for grouping
    const formatMonth = (date: Date): string => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    };

    // Calculate submissions per day
    const dailySubmissions = new Map<string, number>();
    data.forEach(row => {
      if (row['Entry Date']) {
        const date = parseDate(row['Entry Date']);
        const dateKey = formatDate(date);
        dailySubmissions.set(dateKey, (dailySubmissions.get(dateKey) || 0) + 1);
      }
    });

    const submissionsPerDay = Array.from(dailySubmissions.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Calculate submissions per month
    const monthlySubmissions = new Map<string, number>();
    data.forEach(row => {
      if (row['Entry Date']) {
        const date = parseDate(row['Entry Date']);
        const monthKey = formatMonth(date);
        monthlySubmissions.set(monthKey, (monthlySubmissions.get(monthKey) || 0) + 1);
      }
    });

    const submissionsPerMonth = Array.from(monthlySubmissions.entries())
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month));

    // Calculate top IPs
    const ipCounts = new Map<string, number>();
    data.forEach(row => {
      if (row['User IP']) {
        const ip = row['User IP'].trim();
        if (ip) {
          ipCounts.set(ip, (ipCounts.get(ip) || 0) + 1);
        }
      }
    });

    const topIPs = Array.from(ipCounts.entries())
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Calculate top states
    const stateCounts = new Map<string, number>();
    data.forEach(row => {
      if (row.State) {
        const state = row.State.trim();
        if (state) {
          stateCounts.set(state, (stateCounts.get(state) || 0) + 1);
        }
      }
    });

    const topStates = Array.from(stateCounts.entries())
      .map(([state, count]) => ({ state, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Calculate top emails
    const emailCounts = new Map<string, number>();
    data.forEach(row => {
      const email = getEmail(row);
      if (email) {
        const cleanEmail = email.trim().toLowerCase();
        if (cleanEmail) {
          emailCounts.set(cleanEmail, (emailCounts.get(cleanEmail) || 0) + 1);
        }
      }
    });

    const topEmails = Array.from(emailCounts.entries())
      .map(([email, count]) => ({ email, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Calculate top names (First + Last)
    const nameCounts = new Map<string, number>();
    data.forEach(row => {
      if (row['First Name'] && row['Last Name']) {
        const firstName = row['First Name'].trim();
        const lastName = row['Last Name'].trim();
        if (firstName && lastName) {
          const fullName = `${firstName} ${lastName}`;
          nameCounts.set(fullName, (nameCounts.get(fullName) || 0) + 1);
        }
      }
    });

    const topNames = Array.from(nameCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      submissionsPerDay,
      submissionsPerMonth,
      topIPs,
      topStates,
      topEmails,
      topNames,
      totalSubmissions: data.length
    };
  }
}
