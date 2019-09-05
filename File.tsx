import React from 'react';
import {connect, FieldAttributes} from 'formik';

import './File.scss';

type FileProps = {};

type Props = FieldAttributes<any> & FileProps;

const Component = (props: Props) => {
	const {
		name,
		formik: {handleChange, handleBlur, values},
	} = props;

	const {formik, ...rest} = props;

	const atts = {
		...{
			value: values[name] || '',
			onBlur: handleBlur,
			onChange: handleChange,
		},
		...rest,
	};

	return (
		<div className="file-input">
			<input {...atts} />
		</div>
	);
};

export const File = connect(Component);
