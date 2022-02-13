import { Students } from '../types';

export const getStudentProfiles = async (): Promise<Students> => {
  const response = await fetch('https://api.hatchways.io/assessment/students');
  return response.json();
};
