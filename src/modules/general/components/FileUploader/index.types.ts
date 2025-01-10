export type Files = {
  id: string;
  url?: string;
  name?: string;
};

export interface FileUploaderProps {
  files: Files[];
  onDropFiles: (files: File[]) => void;
  fileTypes: string[];
  showPreviewImages?: boolean;
  showFileName?: boolean;
  deleteOnFileName?: boolean;
  onDeleteFiles?: (fileId: string) => void;
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  error?: string;
  customStyle?: string;
}
