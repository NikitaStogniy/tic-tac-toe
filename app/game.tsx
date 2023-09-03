"use client";

import { useEffect, useMemo, useState } from "react";
import Tile from "./tile";
import Button from "./Button";
import WinState from "./WinState";

const Game = () => {
	const [isCross, setCross] = useState<boolean | null>();
	const [board, setBoard] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0]);
	const [isPlayer, setIsPlayer] = useState(true);
	const [stepCount, setStepCount] = useState(1);
	const [isWin, setIsWin] = useState(Boolean);
	function checkWin(array: number[]) {
		// Проверка горизонтальных линий
		for (let i = 0; i < 9; i += 3) {
			if (
				array[i] !== 0 &&
				array[i] === array[i + 1] &&
				array[i] === array[i + 2]
			) {
				return array[i];
			}
		}

		// Проверка вертикальных линий
		for (let i = 0; i < 3; i++) {
			if (
				array[i] !== 0 &&
				array[i] === array[i + 3] &&
				array[i] === array[i + 6]
			) {
				return array[i];
			}
		}

		// Проверка диагональных линий
		if (array[0] !== 0 && array[0] === array[4] && array[0] === array[8]) {
			return array[0];
		}
		if (array[2] !== 0 && array[2] === array[4] && array[2] === array[6]) {
			return array[2];
		}

		// Проверка на ничью
		if (!array.includes(0)) {
			return 0;
		}

		// Вернуть -1, если нет победителя и игра продолжается
		return -1;
	}

	const reset = () => {
		setCross(null);
		setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
		setIsPlayer(true);
		setStepCount(1);
		setIsWin(false);
	};

	useEffect(() => {
		const result = checkWin(board);
		if (result == 1 || result == 2 || result == 0) {
			setIsPlayer(!isPlayer);
			setIsWin(true);
		}

		if (stepCount % 2 == 0) {
			let interval = setInterval(function () {
				let result = fetchData()
					.then((result) => {
						console.log("From Effect");
						console.log(result);
						if (typeof result == "number") {
							if (board[result] == 0) {
								handleClick(result);
								clearInterval(interval);
							}
						}
					})
					.catch((err) => console.error(err));
			}, 2000);
		}
	}, [stepCount]);

	const handleClick = (index: number) => {
		if (board[index] != 0 && isPlayer) {
			alert("Ты че бля");
		} else {
			console.log("click", index);
			setStepCount(stepCount + 1);
			let sign;
			if (isCross && isPlayer) {
				sign = 1;
			} else if (!isCross && isPlayer) {
				sign = 2;
			} else if (!isCross && !isPlayer) {
				sign = 1;
			} else if (isCross && !isPlayer) {
				sign = 2;
			} else {
				sign = 2;
			}
			const newArray = [...board];
			console.log(newArray);
			newArray[index] = sign;
			setBoard(newArray);
			setIsPlayer(!isPlayer);
		}
	};

	const fetchData = async () => {
		try {
			const res = await fetch("/api/ai", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: `You are a professional tic-tac-toe player, there is a field in front of you (The 3 x 3 cell field is converted to an array, 0 is an empty value: ${board}), your opponent walks with the number 1, you are with the number ${
						isCross ? "2" : "1"
					} put your number only on a free cell (indicated by the number 0 ) to win as quickly as possible and not let your opponent win. Give the answer in one digit in json format`, // your array goes here
				}),
			});

			if (!res.ok) {
				throw new Error(res.statusText);
			}

			const data = await res.json();
			const result = JSON.parse(data.result.content).move;
			console.log("test" + JSON.parse(data.result.content).move);

			return result ?? 1;
			// process the data as needed
		} catch (error) {
			console.error("An error occurred while fetching data:", error);
		}
	};

	return (
		<div className="h-full w-full flex justify-center align-center items-center flex-col">
			<WinState reset={reset} isShown={isWin} isPlayer={isPlayer} />
			<div className="text-4xl w-fit m-auto mb-10">
				{isPlayer ? "Your" : "Ai"} turn
			</div>
			{isCross != undefined ? (
				<div className="grid grid-cols-3 grid-rows-3 w-fit m-auto">
					{board.map((item, i) => (
						<div key={i}>
							<Tile
								onClick={() => handleClick(i)}
								isCross={item}
								isPlayer={isPlayer}
								isChecked={item != 0}
							/>
						</div>
					))}
				</div>
			) : (
				<div className="flex flex-row gap-8">
					<Button onClick={() => setCross(true)} isCross={true} />
					<Button onClick={() => setCross(false)} isCross={false} />
				</div>
			)}
		</div>
	);
};

export default Game;
