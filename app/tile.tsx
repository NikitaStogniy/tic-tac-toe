"use client";

import {
	IoIosClose,
	IoIosRadioButtonOff,
	IoIosQrScanner,
} from "react-icons/io";

interface tileProps {
	onClick: () => void;
	isPlayer: boolean;
	isCross: number;
	isChecked: boolean;
}

const Tile: React.FC<tileProps> = ({
	onClick,
	isChecked,
	isPlayer,
	isCross,
}) => {
	if (isPlayer) {
		return (
			<div
				onClick={onClick}
				className={`flex justify-center align-center items-center block h-[64px] w-[64px] rounded-xl border-1 ${
					isChecked ? "" : " hover:bg-white  cursor-pointer "
				} ease-in-out duration-300 hover:text-black`}
			>
				{isChecked ? (
					isCross == 1 ? (
						<IoIosClose size={32} />
					) : (
						<IoIosRadioButtonOff size={32} />
					)
				) : (
					<IoIosQrScanner size={32} />
				)}
			</div>
		);
	} else {
		return (
			<div
				className={`flex justify-center align-center items-center block h-[64px] w-[64px] rounded-xl border-1 ${
					isChecked ? "" : " "
				} ease-in-out duration-300`}
			>
				{isChecked ? (
					isCross == 1 ? (
						<IoIosClose size={32} />
					) : (
						<IoIosRadioButtonOff size={32} />
					)
				) : (
					<IoIosQrScanner size={32} />
				)}
			</div>
		);
	}
};

export default Tile;
