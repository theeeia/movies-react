export interface DatepickerProps {
  startDate: Date | null;
  endDate: Date | null;
  handleDateRange: (date: any) => void;
}
