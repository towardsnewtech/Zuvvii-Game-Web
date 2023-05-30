export interface Session {
  sessionId: string;
  userId: number;
  dtCreated: string;
  dtLastUsed: string;
  ipAddress: string;
}

export interface UserRegistrationInfo {
  userName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}



export interface VideoData {
  videoUrl: string;
  thumbnailUrl: string;
}

export interface Game {
  id: number;
  name: string;
  link: string;
  image: string;
  clips: number;
  views: number;
  timeStamp: string;
}
