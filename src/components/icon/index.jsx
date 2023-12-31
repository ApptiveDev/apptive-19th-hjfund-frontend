"use client";

import React from "react";
import PropTypes from "prop-types";
import icons from "./assets";

const Icon = ({ iconType = "add-square", ...props }) => {
  const IconComponent = icons[iconType];

  return <IconComponent {...props} />;
};

Icon.propTypes = {
  iconType: PropTypes.oneOf(Object.keys(icons)).isRequired,
};

export default Icon;