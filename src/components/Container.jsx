import React from "react";
import Header from "./Header";

const Container = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Container;
