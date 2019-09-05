import React from 'react';
import {connect, FieldAttributes} from 'formik';

// @ts-ignore
import Cleave from 'cleave.js/react';

type TextInputProps = {
	mask?: object;
};

type Props = FieldAttributes<any> & TextInputProps;

const Component = (props: Props) => {
	const {
		name,
		type,
		formik: {handleChange, handleBlur, values, setFieldValue},
	} = props;

	const {formik, mask, ...rest} = props;

	const atts = {
		...{
			value: values[name] || '',
			onBlur: handleBlur,
			onChange: handleChange,
		},
		...rest,
	};

	if (mask) {
		return (
			<Cleave
				{...atts}
				data-type={type}
				type="text"
				options={mask}
				onChange={(ev: any) => {
					const val = ev.target.value;
					const raw = ev.target.rawValue;

					if (mask.time || mask.date) {
						setFieldValue(name, val);
					} else {
						setFieldValue(name, raw);
					}
				}}
			/>
		);
	}

	return <input {...atts} />;
};

export const TextInput = connect(Component);
