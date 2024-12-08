export type Files = {
  file: File;
  id?: string;
};

export interface FileUploaderProps {
  files: Files[];
  onDropFiles: (files: File[]) => void;
  fileTypes: string[];
  showPreviewImages?: boolean;
  showFileName?: boolean;
  onDeleteFiles?: (fileId: string) => void;
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  error?: string;
  customStyle?: string;
}
