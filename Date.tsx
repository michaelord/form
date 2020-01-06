import {Icon} from 'components/icon';
import IconCalendar from 'components/icon/calendar.inline.svg';
import React from 'react';
import {TextInput, TextInputProps} from './TextInput';

import * as Types from 'components/types';

export const DateInput = (props: TextInputProps) => {
	const onClick = (ev: any) => {
		ev.preventDefault();
	};

	return (
		<div className="form-group">
			<TextInput {...props} />
			<button onClick={onClick}>
				<Icon icon={IconCalendar} />
			</button>
		</div>
	);
};
