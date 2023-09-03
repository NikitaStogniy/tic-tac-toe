import Image from "next/image";
import Game from "./game";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center gap-24 p-24">
			<h1 className="text-6xl font-bold">Tic Tac Toe</h1>
			<Game />
		</main>
	);
}
