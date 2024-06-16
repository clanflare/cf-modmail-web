"use client";

import { useConfigNode } from "./hook";

interface Props {
	rootId: string;
}

const ConfigNode = (props: Props) => {
	const { rootId } = props;

	const { activeChild, messageTitle, pickActiveChild } = useConfigNode({
		rootId,
	});

	return (
		<div className="w-full flex flex-col">
			<div className="w-full flex flex-col px-5 py-2 bg-secondary-dark rounded-md h-96">
                
            </div>
		</div>
	);
};

export default ConfigNode;
