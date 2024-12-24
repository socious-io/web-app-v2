export interface ServiceCreateHeaderProps {
  isEdit?: boolean;
  onPublish: () => void;
  onDiscard: (actionName: 'back' | 'cancel') => void;
  disabled: boolean;
}
