import React from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DateTimePickerExampleProps {
  date: Date;
  onChange: (event: any, selectedDate?: Date) => void;
}

const DateTimePickerExample: React.FC<DateTimePickerExampleProps> = ({
  date,
  onChange,
}) => {
  return (
    <View>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => onChange(event, selectedDate)}
      />
    </View>
  );
};

export default DateTimePickerExample;
