import {connect, FieldAttributes} from 'formik';
import React, {useState} from 'react';
import './Range.scss';

import * as Types from 'components/types';

type Props = {
	prefix?: string;
};

export type TextInputProps = FieldAttributes<any> & Props;

export const Component = (props: TextInputProps) => {
	const base: string = 'range-field';

	const {
		name,
		prefix = '',
		min = 0,
		max = 100,
		formik: {handleChange, handleBlur, values},
	} = props;

	const defaultValue = props.value || Math.round((max - min) / 2);

	const [value, setValue] = useState(defaultValue);

	const {formik, ...rest} = props;

	const update = (input: any) => {
		const value = input.value;

		setValue(value);
	};

	const onChange = (ev: any) => {
		update(ev.target);
		handleChange(ev);
	};

	const atts = {
		...{
			value: values[name] || 0,
			onBlur: handleBlur,
			onChange,
		},
		...rest,
	};

	const percentage: number = (100 / (max - min)) * (value - min);

	const style = {
		'--slider-fill-value': `${percentage}%`,
		'--slider-empty-value': `${100 - percentage}%`,
	} as React.CSSProperties;

	return (
		<div className={base}>
			<div className={`${base}__main`} style={style}>
				<input {...atts} min={min} max={max} defaultValue={defaultValue} />
			</div>
			<div className={`${base}__data`} aria-hidden="true">
				{prefix}
				{value}
			</div>
		</div>
	);
};

export const RangeInput = connect(Component);
