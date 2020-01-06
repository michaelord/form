import {sleep} from 'components/libs';
import {connect, FieldAttributes} from 'formik';
import React, {useState} from 'react';
import './Autocomplete.scss';

import * as Types from 'components/types';

type Props = {};

type Result = {
	label: string;
};

type AutocompleteResults = Array<Result> | null;

const Component = (props: FieldAttributes<any> & Props) => {
	const [autocomplete, setAutocomplete] = useState<AutocompleteResults>();

	const {
		name,
		formik: {handleChange, handleBlur, values},
	} = props;

	const {formik, ...rest} = props;

	const onChange = (ev: any) => {
		handleChange(ev);

		const value = ev.target.value;

		if (value === '') {
			setAutocomplete(null);
		} else {
			sleep(200).then(() => {
				setAutocomplete([
					{
						label: 'AAAA',
					},
					{
						label: 'BBBB',
					},
				]);
			});
		}
	};

	return (
		<div className="autocomplete">
			<input type="text" value={values[name] || ''} onChange={onChange} onBlur={handleBlur} {...rest} />

			{/* {autocomplete && <MenuDynamic items={autocomplete} />} */}

			{autocomplete && (
				<ul className={`menu menu--chrome`}>
					{autocomplete.map((item, index) => {
						return (
							<li key={index}>
								<a href="#">
									<span className="text" dangerouslySetInnerHTML={{__html: item.label}} />
								</a>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export const Autocomplete = connect(Component);
