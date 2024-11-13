import DatePicker from "react-datepicker";
// Interfaces
import { DatepickerProps } from "./interfaces";

const Datepicker = ({ startDate, endDate, handleDateRange }: DatepickerProps) => {
  return (
    <DatePicker
      startDate={startDate}
      endDate={endDate}
      selected={startDate ? startDate : new Date()}
      onChange={handleDateRange}
      selectsRange
      className="datepickerInput"
      dateFormat="yyyy"
      showYearPicker
      isClearable
      placeholderText="Year Range"
    />
  );
};
export default Datepicker;
