export interface IUser {
    id: number;
    emailAddress: string;
    userName: string;
    firstName: string;
    lastName: string;
    profilePicPath: string;
    password: string | null | undefined;
    followers: number;
    following: number;
    clipCount: number;
    likes: number;
    tagLine: string;
    about: string;
    Followed: boolean;
    youtube: string;
    twitter: string;
    instagram: string;
    snapChat: string;
    tikTok: string;
    twitch: string;
    verified: boolean;
    fCMToken: string;
    dtRegistered: string;
    dtLastLogin: string;
}

export interface IVideoData {
    videoUrl: string;
    thumbnailUrl: string;
}

export interface IVideo {
    id: string;
    text: string;
    description: string;
    type: number;
    videoUrl: string;
    thumbUrl: string;
    published: boolean;
    userId: number;
    userName: string;
    user: IUser;
    userProfileImagePath: string;
    dtUploaded: string;
    dtPublished: string;
    gameId: number;
    gameName: string;
    likes: number;
    views: number;
    liked: boolean;
    Comments: IComment[];
    recorded: boolean;
}

export interface IComment {
    id: string;
    text: string;
    dtPosted: string;
    edited: boolean;
    deleted: boolean;
    userId: number;
    user: IUser | undefined | null;
    profilePic: string;
    itemId: string;
    item: IVideo | undefined | null;
    likes: number;
    liked: boolean;
}

export interface ISession {
    sessionId: string;
    userId: number;
    dtCreated: string;
    dtLastUsed: string;
    ipAddress: string;
}

export interface ILike {
    id: string;
    timestamp: string;
    itemId: string;
    likeType: LikeType;
    userId: number;
    deleted: boolean;
}
  
export enum LikeType {
    Item,
    Comment,
    Like,
}

export interface IGame {
    id: number;
    name: string;
    link: string;
    image: string;
    clips: number;
    views: number;
    timeStamp: string;
}