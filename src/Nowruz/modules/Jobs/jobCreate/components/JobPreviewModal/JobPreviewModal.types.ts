type Company = {
  name: string;
  description: string;
  image: string;
};
export interface JobPreviewModalProps {
  open: boolean;
  onClose: () => void;
  company: Company;
}
