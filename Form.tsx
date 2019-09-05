import React from 'react';
import * as Yup from 'yup';

import {ErrorMessage, withFormik, FormikProps, FieldAttributes, Form as FormikForm, Field} from 'formik';

import {Button} from './Button';
import {Alert} from 'components/alert';
import {List} from 'components/editable';
import {generateGUID, sleep} from 'components/libs';
import Cleave from 'cleave.js/react';

import {Label} from './Label';

import './Form.scss';

// Shape of form values
type FormValues = {
	email: string;
	password: string;
	plan: string;
};

type OtherProps = {
	showErrorGroup?: boolean;
};

type FormRowProps = {
	children?: React.ReactNode;
	label?: string;
	id?: string;
	name?: string;
};

type FormFieldProps = FieldAttributes<any> & {
	label?: string;
};

type FormErrorProps = {
	errors: object;
	touched: object;
};

// The type of props MyForm receives
type MyFormProps = {
	initialEmail?: string;
};

const FormRow = (props: FormRowProps) => {
	const {children, label, id, name} = props;

	return (
		<div className={`form__field`}>
			<Label label={label} id={id} />
			{children}
			{name && <ErrorMessage name={name} component={Message} />}
		</div>
	);
};

const FormField = (props: FormFieldProps) => {
	const {label, ...rest} = props;
	const {name} = props;
	const id = props.id || generateGUID();

	return (
		<FormRow name={name} label={label} id={id}>
			<div>
				<Field {...rest} />
			</div>
		</FormRow>
	);
};

export const Message = ({children}: {children?: React.ReactNode}) => {
	return (
		<Alert type="error" isDismissable={false} showIcon={false}>
			<p>{children}</p>
		</Alert>
	);
};

export const FormErrors = (props: FormErrorProps) => {
	const {errors = {}, touched = {}} = props;

	const display = Object.keys(errors)
		.map(e => {
			if ((touched as any)[e]) {
				return (errors as any)[e];
			}

			return null;
		})
		.filter(e => e);

	if (display.length === 0) {
		return null;
	}

	return (
		<Alert type="error" isDismissable={false}>
			<List isUnstyled>{display}</List>
		</Alert>
	);
};

const validateAsync = (value: string) => {
	return sleep(500).then(() => {
		if (['admin', 'null', 'god'].includes(value)) {
			throw 'Nice try';
		}
	});
};

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
	const {touched, errors, isSubmitting, showErrorGroup} = props;

	return (
		<div>
			<FormikForm noValidate>
				{showErrorGroup && <FormErrors errors={errors} touched={touched} />}

				<fieldset>
					<legend>Input fields</legend>
					<FormField
						label="Text input"
						type="text"
						name="text"
						placeholder="Text Input"
						validate={validateAsync}
					/>
					<FormField label="Password" type="password" name="password" placeholder="Type your Password" />
					<FormField label="Web Address" type="url" name="url" placeholder="http://yoursite.com" />
					<FormField label="Email Address" type="email" name="email" placeholder="name@email.com" />
					<FormField label="Phone Number" type="tel" name="tel" placeholder="(999) 999-9999" />
					<FormField label="Search" type="search" name="search" placeholder="Enter Search Term" />
					<FormField label="Number Input" type="number" name="number" placeholder="Enter a Number" />
				</fieldset>

				<fieldset>
					<legend>Select menus</legend>
					<FormRow label="Select" id="select" name="select">
						<Field component="select" name="select">
							<option value="free">Free</option>
							<option value="premium">Premium</option>
						</Field>
					</FormRow>
				</fieldset>

				<fieldset>
					<legend>Checkboxes</legend>
				</fieldset>

				<fieldset>
					<legend>Radio Groups</legend>
				</fieldset>

				<fieldset>
					<legend>Textareas</legend>
					<FormField
						label="Textarea"
						component="textarea"
						name="textarea"
						placeholder="Enter your message here"
						rows="8"
						cols="48"
					/>
				</fieldset>

				<fieldset>
					<legend>HTML5 inputs</legend>
					<FormField label="Color Input" type="color" name="color" />
					<FormField label="Number Input" type="number" name="number2" min={0} max={10} />
					<FormField label="Range Input" type="range" name="range" />
					<FormField label="Date Input" type="date" name="date" />
					<FormField label="Month Input" type="month" name="month" />
					<FormField label="Week Input" type="week" name="week" />
					<FormField label="Datetime Input" type="datetime" name="datetime" />
				</fieldset>

				<FormRow>
					<Button
						priority="primary"
						label="Submit"
						isWide
						isLoading={isSubmitting}
						isDisabled={isSubmitting}
						type="submit"
					/>
				</FormRow>
			</FormikForm>

			<fieldset>
				<legend>Cleave</legend>
				<FormRow>
					<Cleave placeholder="Enter credit card number" options={{creditCard: true}} />
				</FormRow>

				{/* <Cleave placeholder="Enter phone number" options={{phone: true}} /> */}

				<FormRow>
					<Cleave placeholder="DD/MM/YYYY" options={{date: true, datePattern: ['d', 'm', 'Y']}} />
				</FormRow>

				<FormRow>
					<Cleave options={{blocks: [6, 4, 4, 4], uppercase: true, delimiter: '-', prefix: 'PREFIX'}} />
				</FormRow>

				<FormRow>
					<Cleave
						className="input-numeral"
						placeholder="Enter numeral"
						options={{numeral: true, numeralThousandsGroupStyle: 'thousand'}}
					/>
				</FormRow>

				<FormRow>
					<Cleave
						placeholder="Custom delimiter / blocks"
						options={{blocks: [4, 3, 3], delimiter: '-', numericOnly: true}}
					/>
				</FormRow>
			</fieldset>
		</div>
	);
};

// Wrap our form with the using withFormik HoC
export const StaticForm = withFormik<MyFormProps, FormValues>({
	// Transform outer props into form values
	mapPropsToValues: props => {
		return {
			// input fields
			text: '',
			password: '',
			url: '',
			email: props.initialEmail || '',
			tel: '',
			search: '',
			number: '',
			// select
			select: 'premium',
			// checkboxes
			// radios
			// textearea
			textarea: '',
			// html5 inputs
			color: '#000000',
			number2: 5,
			range: '',
			date: '1970-01-01',
			month: '1970-01',
			week: '1970-W01',
			datetime: '1970-01-01T00:00:00Z',

			// tests
			text2: '',
			plan: '',
		};
	},

	validationSchema: Yup.object().shape({
		// input fields
		text: Yup.string().required(),
		password: Yup.string()
			.min(9)
			.required(),
		url: Yup.string().required(),

		email: Yup.string()
			.email()
			.required(),

		tel: Yup.string().required(),

		search: Yup.string().required(),

		number: Yup.number().required(),
		// selects
		select: Yup.string().required(),
		// checkboxes
		// radios
		// textarea
		textarea: Yup.string().required(),
		// html5 inputs
		color: Yup.string().required(),

		number2: Yup.number().required(),
		range: Yup.number().required(),

		date: Yup.string().required(),
		month: Yup.string().required(),
		week: Yup.string().required(),
		datetime: Yup.string().required(),
		// tests
	}),

	handleSubmit: (values, {resetForm, setErrors, setSubmitting}) => {
		// do submitting things
		console.log('handleSubmit()', values);

		sleep(2000).then(() => {
			if (values.email === 'test@test.com') {
				setErrors({email: 'that email is taken'});
			} else {
				resetForm();
			}

			setSubmitting(false);
		});
	},
})(InnerForm);
