import React /*, {useState}*/ from 'react';

import {Formik, ErrorMessage} from 'formik';

import {generateGUID, sleep} from 'components/libs';
import {Steps} from 'components/navigation';

import {FormErrors, Message} from './Form';
import {Button} from './Button';
import {Label} from './Label';
import {Select} from './Select';
import {TextInput} from './TextInput';
import {Textarea} from './Textarea';
import {Radio} from './Radio';
import {Checkbox} from './Checkbox';
import {File} from './File';

const COMPONENTS = {
	select: Select,
	textarea: Textarea,
	radio: Radio,
	checkbox: Checkbox,
	file: File,
};

import './Form.scss';

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
};

type DynamicFormFields = Array<DynamicFormField>;

type Step = {
	label?: string;
	fields: DynamicFormFields;
};

type Steps = Array<Step>;

type Props = {
	fields: DynamicFormFields | Steps;
	validation?: object;
	showErrorGroup?: boolean;
};

export const Form = (props: Props) => {
	// const [step, setStep] = useState(0);

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
			const {label, value, component, ...rest} = field;

			const {type = 'text'} = rest;

			const id = field.id || generateGUID();
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
				<div key={`f-${index}`} className={`form__field`}>
					<Label label={label} id={id} required={isRequired} />
					<Component {...rest} {...additional} />
					{/* <Field {...rest} {...additional} /> */}
					{name && <ErrorMessage name={name} component={Message} />}
				</div>
			);
		});
	};

	const onSubmit = (payload: any, {resetForm, /*setErrors,*/ setSubmitting}: any) => {
		console.log('onSubmit', payload /*, formikBag*/);

		sleep(2000).then(() => {
			resetForm();
			setSubmitting(false);
		});
	};

	const {fields, validation = null, showErrorGroup = true} = props;

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
		<div>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validation}
				render={({handleSubmit, isSubmitting, errors, touched, values}) => {
					return (
						<div className="ff">
							<form onSubmit={handleSubmit} noValidate>
								{steps && steps.length > 1 && <Steps steps={steps} />}

								{showErrorGroup && <FormErrors errors={errors} touched={touched} />}

								{isSteps
									? renderFieldSteps(fields as Steps)
									: renderFields(fields as DynamicFormFields)}

								<Button
									priority="primary"
									label="Submit"
									isWide
									isLoading={isSubmitting}
									isDisabled={isSubmitting}
									type="submit"
								/>
							</form>

							<pre className="code">
								<code>{JSON.stringify(values, undefined, 2)}</code>
							</pre>
						</div>
					);
				}}
			/>
		</div>
	);
};
