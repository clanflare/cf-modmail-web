"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/utils";

interface Props {
	children: React.ReactNode;
}

const ReactQueryProvider = (props: Props) => {
	const { children } = props;
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
};

export default ReactQueryProvider;
