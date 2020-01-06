import axios from 'axios';
import {Alert} from 'components/alert';
import {List, RichText} from 'components/editable';
import {generateGUID, getModifiers, sleep} from 'components/libs';
import {Steps} from 'components/navigation';
import {ErrorMessage, Formik} from 'formik';
import React, {useState} from 'react';
import {Button} from './Button';
import {Checkbox} from './Checkbox';
import {Switch} from './Switch';
import {DateInput} from './Date';
import {File} from './File';
import './Form.scss';
import {Label} from './Label';
import {Password} from './Password';
import {Radio} from './Radio';
import {RangeInput} from './Range';
import {Select} from './Select';
import {Textarea} from './Textarea';
import {TextInput} from './TextInput';

import * as Types from 'components/types';

export const Message = ({children}: {children?: React.ReactNode}) => {
	return (
		<div className={`field__error`}>
			<p>{children}</p>
		</div>
	);

	/*
	return (
		<Alert type="error" isDismissable={false} showIcon={false} className={`field__error`}>
			<p>{children}</p>
		</Alert>
	);
	*/
};

type FormErrorProps = {
	errors: object;
	touched: object;
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
		<Alert type="error">
			<List isUnstyled>{display}</List>
		</Alert>
	);
};

const COMPONENTS = {
	select: Select,
	textarea: Textarea,
	radio: Radio,
	date: DateInput,
	range: RangeInput,
	password: Password,
	checkbox: Checkbox,
	file: File,
	switch: Switch,
};

export type GenericFieldHTMLAttributes =
	| JSX.IntrinsicElements['input']
	| JSX.IntrinsicElements['select']
	| JSX.IntrinsicElements['textarea'];

type DynamicFormField = GenericFieldHTMLAttributes & {
	id?: string;
	label?: string;
	type?: string;
	name: string;
	value?: any;
	mask?: any;
	options?: any;
	component?: any;
	help?: string;
	layout?: string;
};

export type DynamicFormFields = Array<DynamicFormField>;

type Step = {
	label?: string;
	fields: DynamicFormFields;
};

type Steps = Array<Step>;

type Params = any;

export interface ChildFunction {
	(params: Params): JSX.Element | null;
}

type Props = {
	method?: any;
	submitText?: string;
	endpoint: string;
	fields: DynamicFormFields | Steps;
	validation?: object;
	showErrorGroup?: boolean;
	layout?: string;
	children?: ChildFunction;
};

export const Form = (props: Props) => {
	const [step, setStep] = useState(0);

	const base: string = 'form';
	const {layout} = props;

	const atts = {
		className: getModifiers(base, {
			layout,
		}),
	};

	const getInitialValues = (fields: DynamicFormFields): object => {
		const values = {};

		fields.forEach(field => {
			if (!(values as any)[field.name]) {
				(values as any)[field.name] = field.value || '';
			}
		});

		return values;
	};

	const getInitialStepValues = (steps: Steps): object => {
		let values = {};

		steps.forEach(step => {
			const vals = getInitialValues(step.fields);
			values = {...values, ...vals};
		});

		return values;
	};

	const renderFieldSteps = (steps: Steps): React.ReactNode => {
		return steps.map((step, index) => {
			return (
				<fieldset key={`step-${index}`}>
					<legend>{step.label}</legend>
					{renderFields(step.fields)}
				</fieldset>
			);
		});
	};

	const renderFields = (fields: DynamicFormFields): React.ReactNode => {
		const {validation} = props;

		// @ts-ignore
		const schema = validation ? validation.describe() : null;

		return fields.map((field, index) => {
			const {name} = field;
			const {label, value, component, help, ...rest} = field;

			const {type = 'text'} = rest;

			const id = field.id || name; //generateGUID();
			const additional: any = {
				id,
			};

			const Component = component || (COMPONENTS as any)[type] || TextInput;

			if (type === 'hidden') {
				return <Component key={`f-${index}`} {...rest} {...additional} />;
			}

			let isRequired = false;

			if (schema) {
				try {
					if (schema.fields[name]) {
						const tests = schema.fields[name].tests;

						tests.forEach((test: any) => {
							if (test.name === 'required') {
								isRequired = true;
							}
						});
					}
				} catch (e) {
					console.log(e);
				}
			}

			return (
				<div key={`f-${index}`} className={`form-field form-field--${type}`}>
					<div className="form-field__main">
						<div>
							<Label label={label} id={id} required={isRequired} />
							<RichText content={help} className={`form-help`} />
						</div>
						<Component {...rest} {...additional} />
					</div>
					{name && <ErrorMessage name={name} component={Message} />}
				</div>
			);
		});
	};

	const onSubmit = (payload: any, {resetForm, setSubmitting}: any) => {
		console.log('onSubmit', payload);

		const {endpoint, method = 'get'} = props;

		if (endpoint) {
			axios({
				method,
				url: endpoint,
				[method === 'get' ? 'params' : 'data']: payload,
			})
				.then((result: any) => {
					const data = (result && result.data) || false;

					console.log('success', data);

					/*
					const isSuccess = isObject(data) && isBoolean(data.success) ? data.success : true;

					if (data && isSuccess) {
						this.onSuccess(data);

						// FIXME: calling this results in the component being unmounted...
						// resetForm(this.initialValues);
					} else {
						this.onFailure(data);
					}
					*/
				})
				.catch(error => {
					console.log('error', error);
					/*
					if (DEBUG) {
						console.log(error);
					}

					this.onFailure();
					*/
				})
				.finally(() => {
					/*setSubmitting(false);

					if (this.__loadingTimer) {
						clearTimeout(this.__loadingTimer);
						this.__loadingTimer = null;
					}*/
				});
		} else {
			console.log('no endpoint');
		}

		sleep(2000).then(() => {
			resetForm();
			setSubmitting(false);
		});
	};

	const {fields, validation = null, showErrorGroup = true, submitText = 'Submit', children} = props;

	const isSteps = 'fields' in fields[0];

	const initialValues = isSteps
		? getInitialStepValues(fields as Steps)
		: getInitialValues(fields as DynamicFormFields);

	const steps = isSteps
		? (fields as Steps).map(step => {
				return {
					label: step.label || '',
				};
		  })
		: null;

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validation}>
			{({handleSubmit, isSubmitting, errors, touched, isValid, values}) => (
				<>
					<form onSubmit={handleSubmit} noValidate {...atts}>
						{steps && steps.length > 1 && <Steps steps={steps} current={step} />}

						{showErrorGroup && <FormErrors errors={errors} touched={touched} />}

						<div className={`${base}__fields`}>
							{isSteps ? renderFieldSteps(fields as Steps) : renderFields(fields as DynamicFormFields)}

							<div className="form-field form-field--buttons">
								<Button
									priority="primary"
									label={submitText}
									isLoading={isSubmitting}
									isDisabled={isSubmitting || !isValid}
									type="submit"
								/>
							</div>
						</div>
					</form>

					{children && typeof children === 'function' && children(values)}
				</>
			)}
		</Formik>
	);
};
