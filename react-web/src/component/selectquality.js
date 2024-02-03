import React from "react";

const Select = (props) => {
    const { inputref, id, lable, lableSize, data,
        frmField,
        errMessage, ...others } = props;
    const lableClass = `col-sm-${lableSize ? lableSize : 4} col-form-label mb-3`;
    const inputClass = `col-sm-4 ${errMessage ? " is-invalid" : ""}`;
    return (
        <div className="col-sm">
            <label htmlFor={id} className={lableClass}>{lable}</label>
            <select ref={inputref} className={inputClass}  {...others}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
            {errMessage ? <div className="invalid-feeback"> {errMessage}</div> : ""}
        </div>
    );
}

export default Select;