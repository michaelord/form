import {ButtonProps, Interaction, Text} from 'components/editable';
import {Icon} from 'components/icon';
import {getModifiers} from 'components/libs';
import React from 'react';
import './Button.scss';

import * as Types from 'components/types';

import {Spinner as Loader} from 'components/loader';

type Type = 'submit' | 'button' | 'reset';

export type ButtonP = Interaction &
	ButtonProps & {
		type?: Type;
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
		disabled: isDisabled || isLoading,
	};

	if (onClick) {
		atts.onClick = onClick;
	}

	const IconPrefix = (icon as React.ReactType) || null;
	const IconSuffix = (iconSuffix as React.ReactType) || null;

	return (
		<button {...atts}>
			<span className={`${base}__inner`}>
				{icon && <Icon icon={IconPrefix} />}
				<Text content={label} className={`text ${base}__text`} />
				{iconSuffix && <Icon icon={IconSuffix} />}
			</span>

			<span className={`${base}__loader`}>
				<Loader />
			</span>
		</button>
	);
};
