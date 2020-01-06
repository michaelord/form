---
title: Forms
tags : ["all", "form", "wip"]
category: "Undefined"
logo: "./thumbnail.jpg"
icon: '<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="85" y="29" width="90" height="12" fill="var(--color-contrast-high)"></rect><rect x="60" y="52" width="140" height="7" fill="var(--color-contrast-low)"></rect><rect x="121" y="75" width="96" height="20" fill="var(--color-bg)" stroke="var(--color-contrast-low)" stroke-width="2"></rect><rect x="43" y="81" width="48" height="7" fill="var(--color-contrast-low)"></rect><rect x="121" y="103" width="96" height="20" fill="var(--color-bg)" stroke="var(--color-contrast-low)" stroke-width="2"></rect><rect x="43" y="109" width="30" height="7" fill="var(--color-contrast-low)"></rect><rect x="121" y="131" width="96" height="20" fill="var(--color-bg)" stroke="var(--color-contrast-low)" stroke-width="2"></rect><rect x="43" y="137" width="48" height="7" fill="var(--color-contrast-low)"></rect></svg>'
published : true
---
import { Playground, PlaygroudCode } from 'components/styleguide';
import {Autocomplete, Form, Location} from 'components/form';
import * as Yup from 'yup';

[TODO]

<Form
    endpoint="#"
    fields={[
        {
            label: 'Custom Fields',
            fields: [
                {
                    name: 'location',
                    label: 'Location',
                    component: Location,
                },
                {
                    name: 'autocomplete',
                    label: 'Autocomplete',
                    component: Autocomplete,
                },
                {
                    name: 'hidden',
                    type: 'hidden',
                },
            ],
        },
        {
            label: 'Input Masks',
            fields: [
                {
                    name: 'cleavecard',
                    label: 'Enter credit card number',
                    type: 'text',
                    placeholder: 'Enter credit card number',
                    mask: {creditCard: true},
                },
                {
                    name: 'cleavedate',
                    label: 'Cleave Date',
                    type: 'date',
                    placeholder: 'DD/MM/YYYY',
                    mask: {date: true, datePattern: ['d', 'm', 'Y']},
                },
                {
                    name: 'cleaveprefix',
                    label: 'Cleave Prefix',
                    type: 'text',
                    mask: {blocks: [6, 4, 4, 4], uppercase: true, delimiter: '-', prefix: 'PREFIX'},
                },
                {
                    name: 'cleavenumeral',
                    label: 'Cleave Numeral',
                    type: 'text',
                    placeholder: 'Enter numeral',
                    mask: {numeral: true, numeralThousandsGroupStyle: 'thousand'},
                },
                {
                    name: 'cleaveblocks',
                    label: 'Cleave Blocks',
                    type: 'text',
                    placeholder: 'Custom delimiter / blocks',
                    mask: {blocks: [4, 3, 3], delimiter: '-', numericOnly: true},
                },
            ],
        },
        {
            label: 'Input fields',
            fields: [
                {
                    name: 'text',
                    label: 'Text input',
                    type: 'text',
                    placeholder: 'Text Input',
                },
                {
                    name: 'password',
                    label: 'Password',
                    type: 'password',
                    autoComplete: 'new-password',
                    placeholder: 'Type your Password',
                    help: `Password should be at least 8 characters, contain a lowercase, a uppercase and special characters`,
                },
                {
                    name: 'url',
                    label: 'Web Address',
                    type: 'url',
                    placeholder: 'http://yoursite.com',
                },
                {
                    name: 'email',
                    label: 'Email Address',
                    type: 'email',
                    placeholder: 'name@email.com',
                },
                {
                    name: 'tel',
                    label: 'Phone Number',
                    type: 'tel',
                    placeholder: '(999) 999-9999',
                },
                {
                    name: 'search',
                    label: 'Search',
                    type: 'search',
                    placeholder: 'Enter Search Term',
                },
                {
                    name: 'number',
                    label: 'Number Input',
                    type: 'number',
                    placeholder: 'Enter a Number',
                },
            ],
        },
        {
            label: 'Select fields',
            fields: [
                {
                    name: 'select',
                    label: 'Select',
                    type: 'select',
                    value: 'premium',
                    options: [
                        {
                            label: 'Option A',
                            value: 'opa',
                        },
                        {
                            label: 'Option B',
                            value: 'opb',
                        },
                    ],
                },
            ],
        },
        {
            label: 'File',
            fields: [
                {
                    name: 'file',
                    label: 'File Input',
                    type: 'file',
                    placeholder: 'Select a File',
                },
            ],
        },
        {
            label: 'Checkboxes',
            fields: [
                {
                    name: 'checkbox',
                    label: 'Checkbox',
                    type: 'checkbox',
                    value: 'copb',
                    options: [
                        {
                            label: 'Option A',
                            value: 'copa',
                        },
                        {
                            label: 'Option B',
                            value: 'copb',
                        },
                        {
                            label: 'Option C',
                            value: 'copc',
                        },
                        {
                            label: 'Option D',
                            value: 'copd',
                        },
                    ],
                },
            ],
        },
        {
            label: 'Radio Groups',
            fields: [
                {
                    name: 'radio',
                    label: 'Radio',
                    type: 'radio',
                    value: 'ropb',
                    options: [
                        {
                            label: 'Option A',
                            value: 'ropa',
                        },
                        {
                            label: 'Option B',
                            value: 'ropb',
                        },
                        {
                            label: 'Option C',
                            value: 'ropc',
                        },
                        {
                            label: 'Option D',
                            value: 'ropd',
                        },
                    ],
                },
            ],
        },
        {
            label: 'Textareas',
            fields: [
                {
                    name: 'textarea',
                    label: 'Textarea',
                    type: 'textarea',
                    placeholder: 'Enter your message here',
                },
            ],
        },
        {
            label: 'HTML5 inputs',
            fields: [
                {
                    name: 'color',
                    label: 'Color Input',
                    type: 'color',
                    value: '#000000',
                },
                {
                    name: 'number2',
                    label: 'Number input',
                    type: 'number',
                    value: 5,
                    min: 0,
                    max: 10,
                },
                {
                    name: 'range',
                    label: 'Range input',
                    type: 'range',
                },
                {
                    name: 'date',
                    label: 'Date input',
                    type: 'date',
                    value: '1970-01-01',
                },
                {
                    name: 'month',
                    label: 'Month input',
                    type: 'month',
                    value: '1970-01',
                },
                {
                    name: 'week',
                    label: 'Week input',
                    type: 'week',
                    value: '1970-W01',
                },
                {
                    name: 'datetime',
                    label: 'Datetime input',
                    type: 'datetime',
                    value: '1970-01-01T00:00:00Z',
                },
            ],
        },
    ]}
    validation={Yup.object().shape({
        text: Yup.string().required(),
        password: Yup.string()
            .min(8, 'Password is too short')
            .matches(/[a-z]/, 'Password must contain lowercase letters')
            .matches(/[A-Z]/, 'Password must contain uppercase letters')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain special characters')
            .required('No password provided'),
        url: Yup.string().required(),
        email: Yup.string()
            .email()
            .required(),
        tel: Yup.string().required(),
        search: Yup.string().required(),
        number: Yup.number().required(),
        select: Yup.string().required(),
        textarea: Yup.string().required(),
        color: Yup.string().required(),
        number2: Yup.number().required(),
        range: Yup.number().required(),
        date: Yup.string().required(),
        month: Yup.string().required(),
        week: Yup.string().required(),
        datetime: Yup.string().required(),
    })}
/>
