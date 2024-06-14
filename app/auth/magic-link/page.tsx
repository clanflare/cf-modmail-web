import { MagicLinkScreen } from "@/components/screens";

interface Props {
	searchParams: {
		token?: string;
	};
}

const MagicLinkPage = (props: Props) => {
	const { searchParams } = props;

	const { token } = searchParams;

	return (
		<main className="w-full h-screen flex items-center justify-center bg-primary-dark font-bahnschrift">
			{token ? (
				<MagicLinkScreen token={token} />
			) : (
				<p className="text-3xl max-w-[600px] text-primary-light text-center tracking-wider">
					The given link is broken, Please generate a new link.
				</p>
			)}
		</main>
	);
};

export default MagicLinkPage;

export const revalidate = 0;
