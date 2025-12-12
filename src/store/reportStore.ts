import { create } from 'zustand';

export interface Report {
  id: string;
  user_id: string;
  username: string;
  latitude: number;
  longitude: number;
  location_name: string;
  transport_line?: string;
  description?: string;
  verification_count: number;
  created_at: string;
  expires_at: string;
  is_verified_by_me: boolean;
}

interface ReportState {
  reports: Report[];
  isLoading: boolean;
  error: string | null;
  setReports: (reports: Report[]) => void;
  addReport: (report: Report) => void;
  updateReport: (id: string, updates: Partial<Report>) => void;
  removeReport: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearReports: () => void;
}

export const useReportStore = create<ReportState>((set) => ({
  reports: [],
  isLoading: false,
  error: null,

  setReports: (reports) => set({ reports, error: null }),

  addReport: (report) =>
    set((state) => ({
      reports: [report, ...state.reports],
    })),

  updateReport: (id, updates) =>
    set((state) => ({
      reports: state.reports.map((report) =>
        report.id === id ? { ...report, ...updates } : report
      ),
    })),

  removeReport: (id) =>
    set((state) => ({
      reports: state.reports.filter((report) => report.id !== id),
    })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  clearReports: () => set({ reports: [], error: null }),
}));
