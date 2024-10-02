export interface ReportPostProps {
  open: boolean;
  handleClose: () => void;
  onReportPost: (comment: string) => void;
}
