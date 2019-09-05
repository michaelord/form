import React from 'react';
import {connect, FieldAttributes} from 'formik';

import './Checkbox.scss';

import {generateGUID} from 'components/libs';

type Option = {
	value: string;
	label: string;
};

type Options = Array<Option>;

type CheckboxProps = {
	options?: Options;
};

type Props = FieldAttributes<any> & CheckboxProps;

const Component = (props: Props) => {
	const {
		id,
		name,
		formik: {handleChange, handleBlur, values /*, setFieldValue*/},
	} = props;

	const {formik, options, ...rest} = props;

	const atts = {
		...{
			value: values[name] || '',
			onBlur: handleBlur,
			onChange: handleChange,
		},
		...rest,
	};

	/*
	const onChange = (ev:SyntheticEvent):void => {


		console.log("CHANGE", ev);

		setFieldValue(name, ['a', 'b'])

	}

*/

	if (options) {
		return (
			<fieldset className="checkbox-group">
				<ul>
					{(options as Options).map((option, index) => {
						const i = id && index === 0 ? id : generateGUID();

						return (
							<li key={`o-${index}`}>
								<input
									{...rest}
									type="checkbox"
									value={option.value}
									id={i}
									defaultChecked={values[name] === option.value}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<label htmlFor={i} dangerouslySetInnerHTML={{__html: option.label}} />
							</li>
						);
					})}
				</ul>
			</fieldset>
		);
	}

	return <input {...atts} />;
};

export const Checkbox = connect(Component);
