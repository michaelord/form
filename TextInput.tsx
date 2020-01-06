// @ts-ignore
import Cleave from 'cleave.js/react';
import {connect, FieldAttributes} from 'formik';
import React from 'react';

import * as Types from 'components/types';

type Props = {
	mask?: object;
};

export type TextInputProps = FieldAttributes<any> & Props;

const Component = (props: TextInputProps) => {
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
