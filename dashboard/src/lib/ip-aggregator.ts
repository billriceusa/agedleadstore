import Papa from 'papaparse';
import { CSVRow, IPBlockingData, CSV_FILES } from '@/types';

export class IPAggregator {
  static async loadAllCSVData(): Promise<CSVRow[]> {
    const allData: CSVRow[] = [];
    
    for (const file of CSV_FILES) {
      try {
        const response = await fetch(`/data/${file.filename}`);
        const csvText = await response.text();
        
        const result = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header: string) => header.trim().replace(/"/g, ''),
        });
        
        // Add source information to each row
        const dataWithSource = (result.data as CSVRow[]).map(row => ({
          ...row,
          _source: file.displayName
        }));
        
        allData.push(...dataWithSource);
      } catch (error) {
        console.error(`Error loading CSV file ${file.filename}:`, error);
      }
    }
    
    return allData;
  }

  static aggregateIPData(data: CSVRow[]): IPBlockingData[] {
    const ipMap = new Map<string, {
      count: number;
      sources: Set<string>;
      dates: string[];
    }>();

    // Process each row
    data.forEach(row => {
      const ip = row['User IP']?.trim();
      const source = row._source || 'Unknown';
      const date = row['Entry Date'];

      if (ip && ip !== '') {
        if (!ipMap.has(ip)) {
          ipMap.set(ip, {
            count: 0,
            sources: new Set(),
            dates: []
          });
        }

        const ipData = ipMap.get(ip)!;
        ipData.count += 1;
        ipData.sources.add(source);
        if (date) {
          ipData.dates.push(date);
        }
      }
    });

    // Convert to array and sort by count (highest first)
    const result: IPBlockingData[] = Array.from(ipMap.entries()).map(([ip, data]) => {
      const sortedDates = data.dates
        .filter(date => date && date.trim() !== '')
        .sort();

      return {
        ip,
        count: data.count,
        sources: Array.from(data.sources).sort(),
        firstSeen: sortedDates.length > 0 ? sortedDates[0] : '',
        lastSeen: sortedDates.length > 0 ? sortedDates[sortedDates.length - 1] : ''
      };
    });

    // Sort by count (descending) then by IP
    return result.sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.ip.localeCompare(b.ip);
    });
  }

  static generateCSV(ipData: IPBlockingData[]): string {
    const headers = ['IP Address', 'Submission Count', 'Sources', 'First Seen', 'Last Seen'];
    const rows = ipData.map(item => [
      item.ip,
      item.count.toString(),
      item.sources.join('; '),
      item.firstSeen,
      item.lastSeen
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    return csvContent;
  }

  static downloadCSV(ipData: IPBlockingData[], filename: string = 'ip-addresses-to-block.csv'): void {
    const csvContent = this.generateCSV(ipData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
