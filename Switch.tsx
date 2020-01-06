import {connect, FieldAttributes} from 'formik';
import React from 'react';
import './Switch.scss';

type SwitchProps = {};

type Props = FieldAttributes<any> & SwitchProps;

export const Component = (props: Props) => {
	const base: string = 'switch';

	const {
		label,
		id,
		name,
		formik: {handleChange, handleBlur, values},
	} = props;

	const {formik, options, type, ...rest} = props;

	const onChange = (ev: any) => {
		handleChange(ev);

		const value = ev.target.value;

		// console.log(value);
	};

	return (
		<div className={base}>
			{label && <label htmlFor={id}>{label}</label>}
			<div className={`${base}__inner`}>
				<input
					type="checkbox"
					value={values[name] || ''}
					defaultChecked={values[name] === true}
					onChange={onChange}
					onBlur={handleBlur}
					{...rest}
					className={`${base}__input`}
				/>
				<label className={`${base}__label`} aria-hidden="true" htmlFor={id}>
					On
				</label>
				<div className={`${base}__marker`} />
			</div>
		</div>
	);
};

export const Switch = connect(Component);
