import { SignedIn } from "@clerk/nextjs";
import ChangeTheme from "./ChangeTheme";
import { Palette } from "lucide-react";
import Logo from "./Logo";

type NavbarProps = {
	rightSide?: React.ReactNode;
	leftSide?: React.ReactNode;
};

export default async function Navbar({ rightSide, leftSide }: NavbarProps) {
	return (
		<header className="navbar bg-base-100 shadow-sm sticky top-0 z-10 px-6">
			<div className="flex-1 items-center space-x-4">
				<Logo />
				{leftSide}
			</div>
			<input />
			<SignedIn>
				<div
					className="dropdown dropdown-end float-start tooltip tooltip-bottom"
					data-tip="Change theme..."
				>
					<div tabIndex={0} role="button" className="btn m-1">
						<Palette />
						<svg
							width="12px"
							height="12px"
							className="inline-block h-2 w-2 fill-current opacity-60"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 2048 2048"
						>
							<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
					>
						<li>
							<ChangeTheme name="light" title="Light" />
						</li>
						<li>
							<ChangeTheme name="dark" title="Dark" />
						</li>
						<li>
							<ChangeTheme name="retro" title="Retro" />
						</li>
						<li>
							<ChangeTheme name="cupcake" title="Cup cake" />
						</li>
						<li>
							<ChangeTheme name="valentine" title="Valentine" />
						</li>
					</ul>
				</div>
			</SignedIn>
			{rightSide}
		</header>
	);
}
