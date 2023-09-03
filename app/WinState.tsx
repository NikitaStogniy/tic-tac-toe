import { IoIosClose } from "react-icons/io";

interface WinStateProps {
	isShown: Boolean;
	reset: () => void;
	isPlayer: Boolean;
}

const WinState: React.FC<WinStateProps> = ({ isShown, reset, isPlayer }) => {
	if (isShown) {
		return (
			<div className="top-0 flex flex-row gap-8 absolute w-full h-full flex justify-center align-center items-center bg-white">
				<div className="">
					{isPlayer ? "Player" : "Ai"}
					{""}wins!
				</div>
				<div onClick={reset}>
					<IoIosClose size={32} />
				</div>
			</div>
		);
	}
};

export default WinState;
