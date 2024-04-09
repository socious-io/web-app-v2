export interface FileUploaderMultipleProps {
  fileTypes: string[];
  maxFileNumbers?: number;
  maxSize?: number;
  customStyle?: string;
  files: File[];
  setFiles: (newVal: File[]) => void;
  loading: boolean;
}

export interface fileInfo {
  name: string;
  type: string;
  size: string;
}
