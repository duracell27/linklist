import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RadioTogglers = ({ options, defaultValue, onChange }) => {
  return (
    <div className="radio-togglers shadow">
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            name="bgType"
            value={option.value}
            defaultChecked={option.value === defaultValue}
            onClick={(e) => onChange(e.target.value)}
          />
          <span>
            <FontAwesomeIcon className="mr-2" icon={option.icon} />{" "}
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default RadioTogglers;
