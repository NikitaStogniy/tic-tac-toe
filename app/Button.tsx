import { IoIosClose, IoIosRadioButtonOff } from "react-icons/io";

interface ButtonProp {
	isCross: Boolean;
	onClick: () => void;
}

const Button: React.FC<ButtonProp> = ({ isCross, onClick }) => {
	return (
		<div
			className="flex justify-center items-center align-center gap-4 bg-white rounded-xl py-2 px-4 hover:bg-gray-100 ease-in-out duration-300 cursor-pointer"
			onClick={onClick}
		>
			Choose{" "}
			{isCross ? <IoIosClose size={32} /> : <IoIosRadioButtonOff size={32} />}
		</div>
	);
};

export default Button;
