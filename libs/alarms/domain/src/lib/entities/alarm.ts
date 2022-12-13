export interface Alarm {
  id: string;
  status: string;
  managed_object: number;
  managed_object__label: string;
  administrative_domain: number;
  administrative_domain__label: string;
  severity: number;
  severity__label: string;
  alarm_class: string;
  alarm_class__label: string;
  timestamp: string;
  subject: string;
  events: number;
  duration: number;
  clear_timestamp: string | null;
  row_class: string;
  segment__label: string;
  segment: string;
  location_1: string;
  location_2: string;
  platform: string;
  address: string;
  ack_user: string | null;
  ack_ts: string | null;
  summary: string;
  total_objects: number;
  fav_status: boolean;
  isInMaintenance: boolean;
  total_grouped: number;
  // total_subscribers: [],
  // total_services: [],
  // logs: [],
  // escalation_tt: null,
  // escalation_error: null,
}
