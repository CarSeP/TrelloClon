import { Card, CardTitle } from "./ui/card";

interface Props {
	title: string;
	id: string;
	onNavigate: (id: string) => void;
}

export function BoardCell({ title, id, onNavigate }: Props) {
	return (
		<Card
			onClick={() => {
				onNavigate(id);
			}}
			className="hover:shadow-md transition-shadow duration-200 cursor-pointer min-h-[140px] flex items-center justify-center"
		>
			<CardTitle className="text-lg text-center">{title}</CardTitle>
		</Card>
	);
}
