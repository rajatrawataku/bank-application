import * as React from 'react';
import { IDropDownOptionData } from 'src/types';

interface IStyleProps {
	ctnClass?: string;
	selectInputClass?: string;
}

interface IDropDownProps {
	options: IDropDownOptionData[];
	placeHolderText: string;
	onChangeHandler: (value: IDropDownOptionData) => void;
	selectedValue?: IDropDownOptionData;
	styleProps?: IStyleProps;
}

export default function DropDown(props: IDropDownProps) {
	const { styleProps = {} as IStyleProps, options, selectedValue, onChangeHandler, placeHolderText } = props;
	const { ctnClass, selectInputClass } = styleProps;

	const changeHandler = event => {
		const value = event.target.value;
		onChangeHandler(options[value]);
	};

	const isSelectedFromDropdown = !!selectedValue;

	return (
		<div className={ctnClass}>
			<select onChange={changeHandler} className={selectInputClass}>
				<option value={placeHolderText} disabled selected={!isSelectedFromDropdown}>
					{placeHolderText}
				</option>
				{options.map((option: IDropDownOptionData, index: number) => {
					const { value, text } = option;
					return (
						<option value={index} selected={value === selectedValue?.value}>
							{text}
						</option>
					);
				})}
			</select>
		</div>
	);
}
