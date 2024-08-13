export interface UploadBoxProps {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  subtitle?: string;
  errorMessage?: string;
  customStyle?: string;
}
