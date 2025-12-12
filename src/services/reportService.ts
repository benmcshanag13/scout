import { apiClient } from './apiClient';
import { Report } from '../store/reportStore';

interface CreateReportData {
  latitude: number;
  longitude: number;
  location_name: string;
  transport_line?: string;
  description?: string;
  is_anonymous?: boolean;
}

interface GetReportsParams {
  latitude?: number;
  longitude?: number;
  radius?: number;
  limit?: number;
  offset?: number;
  min_verifications?: number;
}

interface ReportsResponse {
  reports: Report[];
  total: number;
  limit: number;
  offset: number;
}

export const reportService = {
  async getReports(params: GetReportsParams = {}): Promise<ReportsResponse> {
    const response = await apiClient.get<ReportsResponse>('/reports', { params });
    return response.data;
  },

  async getReportById(id: string): Promise<Report> {
    const response = await apiClient.get<Report>(`/reports/${id}`);
    return response.data;
  },

  async createReport(data: CreateReportData): Promise<Report> {
    const response = await apiClient.post<Report>('/reports', data);
    return response.data;
  },

  async verifyReport(id: string): Promise<{ id: string; verification_count: number; is_verified_by_me: boolean }> {
    const response = await apiClient.put(`/reports/${id}/verify`);
    return response.data;
  },

  async deleteReport(id: string): Promise<void> {
    await apiClient.delete(`/reports/${id}`);
  },
};
