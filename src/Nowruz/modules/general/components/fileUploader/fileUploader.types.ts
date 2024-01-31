export interface FileUploaderProps {
  fileTypes: string[];
  maxFileNumbers?: number;
  maxFileSize?: number;
  customStyle?: string;
  setAttachments: (newVal: string[]) => void;
}
