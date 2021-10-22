import React, { useState } from "react";

const InstitutionContext = React.createContext({
  institute: null,
  setInstitute: (ins) => {}
});

export const InstitutionContextProvider = (props) => {
  const [institute, setInstitute] = useState(null);

  const setMyInstitute = (course) => {
    setInstitute(course);
  };

  return (
    <InstitutionContext.Provider
      value={{
        institute: institute,
        setInstitute: setMyInstitute
      }}
    >
      {props.children}
    </InstitutionContext.Provider>
  );
};

export default InstitutionContext;
