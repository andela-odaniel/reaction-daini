import React, { Component, PropTypes } from "react";
import classnames from "classnames/dedupe";

class Icon extends Component {
  render() {
    const { icon, notifyIcon } = this.props;
    let classes;

    if (icon) {
      if (icon.indexOf("icon-") === 0 || icon.indexOf("fa") >= 0) {
        classes = icon;
      } else {
        classes = classnames({
          "fa": true,
          [`fa-${icon}`]: true
        });
      }
    }

    if(notifyIcon) {
      classes = classnames({
        "notify-icon":true,
        "rui": true,
        "font-icon": true,
      }, classes, this.props.className);
    } else {
      classes = classnames({
        "rui": true,
        "font-icon": true,
      }, classes, this.props.className);
    }
    

    return (
      <i className={classes} />
    );
  }
}

Icon.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  icon: PropTypes.string.isRequired,
  notifyIcon: PropTypes.bool
};

export default Icon;
