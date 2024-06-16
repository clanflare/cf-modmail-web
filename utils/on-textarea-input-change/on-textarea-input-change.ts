export const onTextareaInputChange =
	(setState: React.Dispatch<React.SetStateAction<string>>) =>
	(e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setState(e.target.value);
