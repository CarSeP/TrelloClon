import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export function BoardsGrid() {
	const cards = [{ id: 1, title: "Project 1" }];

	return (
		<div className="container mx-auto p-6">
			<div className="mb-8 text-center">
				<h1 className="text-3xl font-bold tracking-tight mb-2">My Projects</h1>
				<p className="text-muted-foreground">
					Manage and organize all your projects
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{cards.map((card) => (
					<Card
						key={card.id}
						className="hover:shadow-md transition-shadow duration-200 cursor-pointer min-h-[140px] flex items-center justify-center"
					>
						<CardTitle className="text-lg text-center">{card.title}</CardTitle>
					</Card>
				))}

				<Card className="hover:shadow-md p-0 transition-shadow duration-200 border-dashed border-2 hover:border-primary/50">
					<Button
						variant="ghost"
						className="w-full h-full cursor-pointer min-h-[140px] flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
					>
						<Plus className="h-8 w-8" />
						<span className="text-lg font-medium">Add project</span>
					</Button>
				</Card>
			</div>
		</div>
	);
}
