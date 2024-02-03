import React from "react";

const Select = (props) => {
    const { inputref, id, lable, lableSize, data,
        frmField,
        errMessage, ...others } = props;
    const lableClass = `col-sm-${lableSize ? lableSize : 4} col-form-label`;
    const inputClass = `col-sm-4 ${errMessage ? " is-invalid" : ""}`;
    return (
        <div className="col-sm">
            <label htmlFor={id} className={lableClass}>{lable}</label>
            <select className={inputClass}  {...others}>
                <option value={1}>Nam</option>
                <option value={0}>Nữ</option>
            </select>
            {errMessage ? <div className="invalid-feeback"> {errMessage}</div> : ""}
        </div>
    );
}

export default Select;