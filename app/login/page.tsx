import Image from "next/image";
import LoginHero from "@/assets/images/login/login-hero.png";

const LoginPage = () => {
	return (
		<main className="w-full h-screen flex bg-primary-dark font-b612">
			<div className="flex-1 h-screen flex flex-col items-center justify-center px-4 py-2">
				<h1 className="text-4xl font-semibold text-accent-background tracking-wide text-center">
					MODMAIL BOT
				</h1>

				<p className="text-lg text-primary-light mt-5 text-center">
					Login with Discord to get Bot Access
				</p>

				<p className="text-lg text-primary-red text-center max-w-[400px] mt-5">
					Login via Dashboard is COMING SOON, till then use the
					Discord app to get your magic link!
				</p>
			</div>
			<div className="w-1/2 h-screen hidden md:flex flex-col bg-secondary-dark items-center justify-end rounded-l-md">
				<Image
					src={LoginHero.src}
					height={LoginHero.height}
					width={LoginHero.width}
					alt="login hero image"
					className="w-full h-fit object-cover"
				/>
			</div>
		</main>
	);
};

export default LoginPage;
