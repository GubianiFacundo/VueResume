import axiosInstance from '../axiosInstance';
import { type Skill } from '@/types/skill';

const skillService = {
  async getSkills(): Promise<Skill[]> {
    try {
      const response = await axiosInstance.get<Skill[]>('/skills');
      return response.data;
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw error;
    }
  },
};

export default skillService;