import axiosInstance from '../axiosInstance';
import { type Project } from '@/types/project';

const ProjectService = {
  async getProjects(): Promise<Project[]> {
    try {
      const response = await axiosInstance.get<Project[]>('/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching Projects:', error);
      throw error;
    }
  },
};

export default ProjectService;