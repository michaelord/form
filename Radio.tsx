import {generateGUID} from 'components/libs';
import {connect, FieldAttributes} from 'formik';

import {Text} from 'components/editable';
import React from 'react';
import './Radio.scss';

import * as Types from 'components/types';

import * as Utils from 'components/libs';

type Option = {
	value: string;
	label: string;
};

type Options = Array<Option>;

type RadioProps = {
	options: Options;
	layout?: 'boxed';
};

type Props = FieldAttributes<any> & RadioProps;

const Component = (props: Props) => {
	const {
		id,
		name,
		formik: {handleChange, handleBlur, values},
	} = props;

	const {formik, options, layout, ...rest} = props;

	const base: string = 'radio-group';

	const atts = {
		className: Utils.getModifiers(base, {layout}),
	};

	return (
		<fieldset {...atts}>
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
								className="radio"
							/>
							<label htmlFor={i}>
								<Text content={option.label} />
							</label>
						</li>
					);
				})}
			</ul>
		</fieldset>
	);
};

export const Radio = connect(Component);
