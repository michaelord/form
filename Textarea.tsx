import React from 'react';
import {useState} from 'react';

import './Textarea.scss';

import {connect, FieldAttributes} from 'formik';

import {replaceTokens} from 'components/libs';

type TextareaProps = {
	rows: number;
	cols: number;

	counter?: string;
	countTotal?: number;
};

type Props = FieldAttributes<any> & TextareaProps;

const Component = (props: Props) => {
	const {
		name,
		formik: {handleChange, handleBlur, values},
	} = props;

	const {
		formik,
		countTotal = 300,
		counter = 'You have <b>{count}</b> characters left',
		rows = 8,
		cols = 48,
		...rest
	} = props;

	const [count, setCount] = useState(countTotal);

	const onInput = (ev: any) => {
		const value: string = ev.target.value;

		setCount(countTotal - value.length);
	};

	return (
		<>
			<textarea
				value={values[name] || ''}
				onChange={handleChange}
				onBlur={handleBlur}
				onInput={onInput}
				{...rest}
				rows={rows}
				cols={cols}
			/>
			<div className="character-count" aria-live="polite" aria-atomic="true">
				<div
					className="character-count__inner"
					dangerouslySetInnerHTML={{__html: replaceTokens(counter, {count})}}
				/>
			</div>
		</>
	);
};

export const Textarea = connect(Component);
