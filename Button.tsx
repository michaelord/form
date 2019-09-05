import * as React from 'react';

import {Interaction, ButtonProps} from 'components/editable';

import {Text} from 'components/editable';

import {getModifiers} from 'components/libs';

import './Button.scss';

export type ButtonP = Interaction &
	ButtonProps & {
		type?: string;
		isDisabled?: boolean;
		isLoading?: boolean;
	};

export const Button = (props: ButtonP) => {
	const {label, type = 'button', isDisabled = false, isLoading = false} = props;
	const {base = 'btn', isWide, priority = 'default', classes = null, size = 'default', onClick = null} = props;

	const {icon, iconSuffix} = props;

	if (!label) {
		return null;
	}

	const atts: any = {
		className:
			getModifiers(base, {
				wide: isWide,
				priority,
				size: `size-${size}`,
				loading: isLoading,
			}) + (classes ? ` ${classes}` : ''),
		type,
		disabled: isDisabled,
	};

	if (onClick) {
		atts.onClick = onClick;
	}

	const IconPrefix = (icon as React.ReactType) || null;
	const IconSuffix = (iconSuffix as React.ReactType) || null;

	return (
		<button {...atts}>
			<span className={`${base}__inner`}>
				{icon && <IconPrefix className="icon" />}
				<Text content={label} className={`text ${base}__text`} />
				{iconSuffix && <IconSuffix className="icon" />}
			</span>

			<span className="spinner"></span>
		</button>
	);
};
