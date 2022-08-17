import { forwardRef } from "react";
import DatePicker from "react-datepicker";
// Icon
import { ReactComponent as DatepickerIcon } from "../../assets/images/datepicker.svg";

// Interfaces
import { DatepickerProps } from "./interfaces";

const Datepicker = ({ startDate, endDate, handleDateRange }: DatepickerProps) => {
  const DatepickerInput = forwardRef<any, Record<string, any>>(({ onClick }, ref) => (
    <DatepickerIcon onClick={onClick} ref={ref} />
  ));
  return (
    <DatePicker
      startDate={startDate}
      endDate={endDate}
      selected={startDate ? startDate : new Date()}
      onChange={handleDateRange}
      selectsRange
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      calendarStartDay={1}
      customInput={<DatepickerInput />}
    />
  );
};
export default Datepicker;
