import React from 'react';

import classes from './Input.module.css';

const input = props => {

    let inputEl = null;
    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case 'select':
            inputEl = (
                <select className={inputClasses.join(' ')} onChange={props.changed}>
                    {props.elementConfig.options.map(option => <option key={option.value} defaultValue={!!props.value} value={option.value}>{option.displayValue}</option>)}
                </select>
            );
            break;
        case 'textarea':
            inputEl = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case 'input':
        default:
            inputEl = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEl}
        </div>
    );
};

export default input;
