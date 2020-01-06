import {Icon} from 'components/icon';
import IconLocation from 'components/icon/location.inline.svg';
import {connect, FieldAttributes} from 'formik';
import React from 'react';

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
		<div className="form-group">
			<input type="text" value={values[name] || ''} onChange={handleChange} onBlur={handleBlur} {...rest} />
			<button onClick={onClick}>
				<Icon icon={IconLocation} />
			</button>
		</div>
	);
};

export const Location = connect(Component);
