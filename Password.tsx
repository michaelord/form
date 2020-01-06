import {connect, FieldAttributes} from 'formik';
import React, {useState} from 'react';
import './Password.scss';

import * as Types from 'components/types';

type PasswordInputProps = {};

type Props = FieldAttributes<any> & PasswordInputProps;

const Component = (props: Props) => {
	const {
		name,
		formik: {handleChange, handleBlur, values},
	} = props;

	const {formik, mask, ...rest} = props;
	const {autoComplete = null} = props;

	const getMatches = (value: string = '') => {
		const hasLowercase = value.match(/[a-z]/) != null;
		const hasUppercase = value.match(/[A-Z]/) != null;
		const hasSpecial = value.match(/[!@#$%^&*(),.?":{}|<>]/) != null;
		const hasCharacters = value.length > 8;

		return {
			hasLowercase,
			hasUppercase,
			hasSpecial,
			hasCharacters,
		};
	};

	const [matches, setMatches] = useState(getMatches(''));

	const onChange = (ev: any) => {
		const value: string = ev.target.value;

		setMatches(getMatches(value));

		handleChange(ev);
	};

	const atts = {
		...{
			value: values[name] || '',
			onBlur: handleBlur,
			onChange: onChange,
		},
		...rest,
	};

	return (
		<div className="password">
			<input {...atts} />

			{autoComplete === 'new-password' && (
				<ul>
					<li className={`${matches.hasLowercase ? 'matched' : ''}`}>
						<b>a</b>
						<em>Lowercase</em>
					</li>
					<li className={`${matches.hasUppercase ? 'matched' : ''}`}>
						<b>A</b>
						<em>Uppercase</em>
					</li>
					<li className={`${matches.hasSpecial ? 'matched' : ''}`}>
						<b>#</b>
						<em>Special</em>
					</li>
					<li className={`${matches.hasCharacters ? 'matched' : ''}`}>
						<b>8+</b>
						<em>Characters</em>
					</li>
				</ul>
			)}
		</div>
	);
};

export const Password = connect(Component);
