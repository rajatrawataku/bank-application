import * as React from 'react';

interface IStyleProps {
	ctnClass?: string;
	textClass?: string;
}

interface IDebouncedInputProps {
	delay?: number;
	onChangeHandler: (value: string) => void;
	placeholderText: string;
	styleProps?: IStyleProps;
}

export default function DebouncedInput(props: IDebouncedInputProps) {
	let timeoutId: NodeJS.Timer | undefined;

	const { styleProps = {} as IStyleProps, placeholderText, onChangeHandler, delay } = props;
	const { ctnClass, textClass } = styleProps;

	const inputChangeHandler = (event: React.SyntheticEvent<HTMLInputElement>) => {
		timeoutId && clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			if (event.target instanceof HTMLInputElement) {
				onChangeHandler(event.target.value);
			}
		}, delay);
	};

	return (
		<div className={ctnClass}>
			<input className={textClass} placeholder={placeholderText} onChange={inputChangeHandler} />
		</div>
	);
}
