import React from 'react';
import {useState} from 'react';

import {connect, FieldAttributes} from 'formik';

import {EventEmitter} from 'components/events';

type Option = {
	value: string;
	label: string;
};

type Options = Array<Option>;

type SelectProps = {
	options: Options;
};

type Props = FieldAttributes<any> & SelectProps;

const Component = (props: Props) => {
	const {
		name,
		formik: {handleChange, handleBlur, values},
	} = props;

	const {formik, options, ...rest} = props;

	const [opts, setOptions] = useState<Options>(options);

	const updateOptions = (options: Options) => {
		setOptions(options);
	};

	EventEmitter.subscribe(`field[${name}]`, updateOptions);

	return (
		<select value={values[name] || ''} onChange={handleChange} onBlur={handleBlur} {...rest}>
			{(opts as Options).map((option, index) => {
				return (
					<option value={option.value} key={`option-${index}`}>
						{option.label}
					</option>
				);
			})}
		</select>
	);
};

export const Select = connect(Component);
