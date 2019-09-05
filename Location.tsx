import React from 'react';
import {connect, FieldAttributes} from 'formik';

import './Location.scss';

type Props = {};

const Component = (props: FieldAttributes<any> & Props) => {
	const {
		name,
		formik: {handleChange, handleBlur, values, setFieldValue},
	} = props;

	const {formik, ...rest} = props;

	const onClick = (ev: any) => {
		ev.preventDefault();

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position: any) => {
					setFieldValue(name, `${position.coords.latitude}, ${position.coords.longitude}`);
				},
				() => {
					setFieldValue(name, 'location error');
				}
			);
		}
	};

	return (
		<div className="location">
			<input value={values[name] || ''} onChange={handleChange} onBlur={handleBlur} {...rest} />
			<button onClick={onClick}>location</button>
		</div>
	);
};

export const Location = connect(Component);
