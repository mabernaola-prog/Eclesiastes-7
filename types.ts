export interface ImageRequest {
  concept: string;
  title: string;
  description: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  title: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface GenerationState {
  status: AppStatus;
  leftImage?: GeneratedImage;
  rightImage?: GeneratedImage;
  error?: string;
}