import React from "react";
const Input = (props) => {
    const { inputref, id, lable, lableSize, frmField, errMessage, ...others } = props;
    const lableClass = `col-sm-${lableSize ? lableSize : 3} col-form-label`;
    const inputClass = `form-control ${errMessage ? " is-invalid" : ""}`;
    return (
        <div className="row mb-3">
            <label htmlFor={id} className={lableClass}>{lable}</label>
            <div className="col-sm">
                <input className={inputClass} {...frmField} ref={inputref} id={id} {...others} />
                {errMessage ? <div className="invalid-feeback"> {errMessage}</div> : ""}
            </div>
        </div>
    );
}

export default Input;