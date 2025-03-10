export interface ExpandableTextProps {
  text: string;
  seeMoreText?: string;
  expectedLength?: number;
  clickableUrls?: boolean;
  isMarkdown?: boolean;
  seeMoreButton?: boolean;
  preview?: boolean;
  customStyle?: string;
}
