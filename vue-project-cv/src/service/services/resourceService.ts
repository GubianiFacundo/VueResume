import axiosInstance from '../axiosInstance';
import { type Resource } from '@/types/resource';

const resourceService = {
  async getResources(): Promise<Resource[]> {
    try {
      const response = await axiosInstance.get<Resource[]>('/resources');
      return response.data;
    } catch (error) {
      console.error('Error fetching Resources:', error);
      throw error;
    }
  },
};

export default resourceService;