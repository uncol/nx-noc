export type AlertType = 'info' | 'warning' | 'success' | 'danger';

export interface NOCAlert {
  uuid: string;
  isAppLevel: boolean;
  icon?: string;
  message: string;
  type: AlertType;
}
