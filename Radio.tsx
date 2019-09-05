import React from 'react';
import {connect, FieldAttributes} from 'formik';

import {generateGUID} from 'components/libs';

import './Radio.scss';

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
		id,
		name,
		formik: {handleChange, handleBlur, values},
	} = props;

	const {formik, options, ...rest} = props;

	return (
		<fieldset className="radio-group">
			<ul>
				{(options as Options).map((option, index) => {
					const i = id && index === 0 ? id : generateGUID();

					return (
						<li key={`o-${index}`}>
							<input
								{...rest}
								type="radio"
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
};

export const Radio = connect(Component);
