interface Props {
	searchParams: {
		token?: string;
	};
}

const MagicLinkPage = (props: Props) => {
	const { searchParams } = props;

	const { token } = searchParams;

    return (
        <main className="w-full h-screen flex items-center justify-center bg-background dark:bg-dark-background">
            {
                token ? (
                    <div>

                    </div>
                ) : (
                    <p>The given link is broken!! Please generate a new link</p>
                )
            }
        </main>
    )
};

export default MagicLinkPage;

export const revalidate = 0;
