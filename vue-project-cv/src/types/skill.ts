export enum SkillType {
  FRONTEND = 'Frontend Skills',
  BACKEND = 'Backend Skills',
  DATABASES = 'Databases',
  PROGRAMMING_LANGUAGES = 'Programming Languages',
  DEVOPS_TOOLS = 'DevOps & Tools',
  TESTING = 'Testing',
  MISCELLANEOUS = 'Miscellaneous',
}

export interface Skill {
  id: number;
  name: string;
  icon?: string;
  image?: string;
  link?: string;
  type: SkillType;
}