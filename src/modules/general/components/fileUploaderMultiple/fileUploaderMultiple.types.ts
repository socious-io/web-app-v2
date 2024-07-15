import { PostMediaUploadRes } from 'src/core/api';

export interface FileUploaderMultipleProps {
  fileTypes: string[];
  maxFileNumbers?: number;
  maxSize?: number;
  customStyle?: string;
  uploaded: PostMediaUploadRes[];
  setUploaded: (newVal: PostMediaUploadRes[]) => void;
  onDeleteFile?: (deletedIndex: number) => void;
  setShowFiles?: (files: File[]) => void;
  showFiles?: File[];
  loading: boolean;
}

export interface fileInfo {
  name: string;
  type: string;
  size: string;
}
