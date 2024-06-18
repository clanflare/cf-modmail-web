"use client";

import { SolidBtn } from "@/components/elements";
import { AccordionTrigger } from "@/components/ui/accordion";
import { Embed } from "@/types/models";
import { AccordionItem } from "@radix-ui/react-accordion";
import { Trash } from "lucide-react";

interface Props {
	configId: string;
	embedIndex: number;
	embed: Embed;
}

const EmbedAccordion = (props: Props) => {
	const { configId, embedIndex, embed } = props;

	return (
		<>
			<AccordionItem value={`${configId}-${embedIndex}`} className="mt-2">
				<AccordionTrigger className="w-full flex no-underline hover:no-underline px-2 bg-tertiary-dark py-3 rounded-lg">
					<div className="w-full flex item-center justify-between no-underline hover:no-underline">
						<p className="flex items-center text-primary-light">
							Embed {embedIndex + 1}
						</p>

						<SolidBtn
							className="p-0 bg-transparent hover:bg-transparent ml-2 w-fit"
							LeftIcon={Trash}
							leftIconClassName="text-primary-red pr-0"
							title=""
						/>
					</div>
				</AccordionTrigger>
			</AccordionItem>
		</>
	);
};

export default EmbedAccordion;
