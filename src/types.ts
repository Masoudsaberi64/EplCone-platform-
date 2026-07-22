export type ViewType = 'dashboard' | 'learning_path' | 'digital_factory' | 'ai_mentor' | 'portfolio' | 'community';

export interface User {
  name: string;
  level: string;
  levelTitle: string;
  progress: number;
}

export interface AcademyModule {
  id: string;
  title: string;
  description: string;
  status: 'locked' | 'in_progress' | 'completed';
  progress: number;
}

export interface SimulationProject {
  id: string;
  title: string;
  category: 'electrical' | 'plc' | 'hmi' | 'network' | 'scada';
  status: 'locked' | 'unlocked';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
