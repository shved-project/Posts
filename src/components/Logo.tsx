import {Link} from "react-router";
import logo from "../assets/logo.svg";

const Logo = ({size}: {size: "large" | "small"}) => {
	return (
		<Link to={"/"} className='flex items-center gap-1.5'>
			<img src={logo} alt='logo' width={size === "large" ? 100 : 60} />
			<p className={`text-[#61DAFB] ${size === "large" ? "text-4xl" : "text-xl"}`}>MyLogo</p>
		</Link>
	);
};

export default Logo;
