/* eslint no-unused-vars: 1 */
//
// TODO review PropTypes import in flatButton.js
//
import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import Button from "./button.jsx";

class FlatButton extends Component {
  render() {
    const {
      icon,
      onIcon,
      badge,
      notifyIcon,
      ...otherProps
    } = this.props;

    let buttonClassName = classnames({
      "rui": true,
      "button": true,
      "flat": true
    });


    let iconClassName = classnames({
      "fa-lg": false,
      [icon]: true
    });

    let onIconClassName;

    if (onIcon) {
      onIconClassName = classnames({
        "fa-lg": true,
        [onIcon]: true
      });
    }

    return (
      <Button
        className={buttonClassName}
        icon={iconClassName}
        badge={badge}
        notifyIcon={notifyIcon}
        onIcon={onIconClassName}
        {...otherProps}
      />
    );
  }
}

FlatButton.propTypes = Object.assign({}, Button.propTypes);

export default FlatButton;
