import React from "react";
import { Spinner } from "react-bootstrap";

const CustomButton = (props) => {
    const { color, className, icon, isLoading, ...others } = props;
    const buttonClass = `btn-btn-${color} ${className}`;
    const iconClass = `${icon} me-1}`;
    return (
        <button type="button." {...others} className={buttonClass}>
            {isLoading ?
                (<Spinner animation="border" size="sm" className="me-1" />
                ) : (
                    icon ?
                        <i className={iconClass} /> : ""
                )}
            {props.children}
        </button>
    );
};
export default CustomButton;