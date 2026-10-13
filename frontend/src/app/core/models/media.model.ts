export type MediaType = 'image' | 'video';

export interface MediaItem {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  eventId: string | null;
  eventTitle: string;
  originalFilename: string;
  storedFilename: string;
  url: string;
  mediaType: MediaType;
  mimeType: string;
  sizeBytes: number;
  caption?: string;
  createdAt: string;
  status: 'completed' | 'uploading' | 'failed';
  isPublished: boolean;
  isRemovedByAdmin: boolean;
  removalReason?: string | null;
  removedAt?: string | null;
  removedBy?: string | null;
}

export interface MediaLimits {
  maxImageSizeBytes: number;
  maxImageSizeFormatted: string;
  maxVideoSizeBytes: number;
  maxVideoSizeFormatted: string;
  maxFilesPerUpload: number;
  allowedImageExtensions: string[];
  allowedVideoExtensions: string[];
  allowedImageMimes: string[];
  allowedVideoMimes: string[];
}

export interface MediaResponse {
  success: boolean;
  count?: number;
  media?: MediaItem[];
  item?: MediaItem;
  message?: string;
  error?: string;
  warnings?: string[];
}
