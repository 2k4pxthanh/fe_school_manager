import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Http from "../../services/Http";

const fetcher = (url) => Http.get(url).then((res) => res.data.data);

function Select2Component({ className, name, id, placeholder, data, multiple, onChange, initValue, allOptions }) {
  const [options, setOptions] = useState([]);
  const selectRef = useRef(null);

  const { data: fetchedData, error } = useSWR(data, fetcher);

  useEffect(() => {
    if (Array.isArray(data)) {
      const transformedData = data.map((item) => ({ name: item }));
      setOptions(transformedData);
    } else if (fetchedData) {
      setOptions(fetchedData);
    }
  }, [data, fetchedData]);

  useEffect(() => {
    if (selectRef.current) {
      $(selectRef.current)
        .select2({
          allowClear: true,
          placeholder: placeholder,
        })
        .on("change", onChange);

      if (initValue) {
        $(selectRef.current).val(initValue).trigger("change");
      }
    }
  }, [placeholder, initValue]);

  return (
    <select
      ref={selectRef}
      className={`select2 ${className}`}
      name={name}
      id={id}
      multiple={multiple}
      placeholder="true"
    >
      <option value="">{allOptions}</option>
      {options?.map((option, index) => {
        const showValue = option?.name || option?.fullName;

        return (
          <option key={option?._id || `option-${index}`} value={option?._id}>
            {showValue}
          </option>
        );
      })}
    </select>
  );
}

export default Select2Component;
