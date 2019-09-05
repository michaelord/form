import React from 'react';

import {Text} from 'components/editable';

type LabelProps = {
	id?: string;
	label?: string;
	required?: boolean;
};

export const Label = (props: LabelProps) => {
	const {label, id = undefined, required = false} = props;

	if (!label) {
		return null;
	}

	return (
		<label htmlFor={id}>
			<Text content={label} />
			{required && <em title="Required">*</em>}
		</label>
	);
};
