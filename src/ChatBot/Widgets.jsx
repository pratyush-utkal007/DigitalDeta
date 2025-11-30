import React from "react";

const ServiceOptions = (props) => {
  const options = [
    "Web Development",
    "AI Solutions",
    "App Development",
    "Cloud Services",
    "CRM & Salesforce",
    "UI/UX Design",
    "Consultation",
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => props.actions.handleService(opt)}
          className="bg-[#00B4D8] text-white px-3 py-1 rounded-lg hover:bg-[#0096c7] transition"
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default { serviceOptions: ServiceOptions };
