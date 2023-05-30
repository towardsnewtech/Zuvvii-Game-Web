export interface IXboxVideo {
    gameClipId: string;
    state: string;
    datePublished: string;
    dateRecorded: string;
    lastModified: string;
    userCaption: string;
    type: string;
    durationInSeconds: number;
    scid: string;
    titleId: number;
    rating: number;
    ratingCount: number;
    views: number;
    titleData: string;
    systemProperties: string;
    savedByUser: boolean;
    achievementId: string;
    greatestMomentId: string;
    thumbnails: IXboxThumbnail[];
    gameClipUris: IXboxClip[];
    xuid: string;
    clipName: string;
    titleName: string;
    gameClipLocale: string;
    clipContentAttributes: string;
    deviceType: string;
    commentCount: number;
    likeCount: number;
    shareCount: number;
    partialViews: number;
}
  
interface IXboxThumbnail {
    uri: string;
    fileSize: number;
    thumbnailType: string;
}
  
interface IXboxClip {
    uri: string;
    fileSize: number;
    uriType: string;
    expiration: string;
}
  