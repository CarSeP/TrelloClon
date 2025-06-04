import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

export function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
			<div className="w-full max-w-md">
				<Card className="text-center shadow-lg">
					<CardHeader className="pb-4">
						<CardTitle className="text-6xl font-bold text-primary mb-2">
							404
						</CardTitle>
						<CardDescription className="text-xl">
							Page not found
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-muted-foreground">
							Sorry, the page you are looking for does not exist or has been
							moved.
						</p>
						<div className="flex flex-col sm:flex-row gap-3 justify-center">
							<Button asChild className="w-full sm:w-auto">
								<a href="/board" className="inline-flex items-center gap-2">
									<Home className="h-4 w-4" />
									Go to home
								</a>
							</Button>
							<Button variant="outline" asChild className="w-full sm:w-auto">
								<a
									href="javascript:history.back()"
									className="inline-flex items-center gap-2"
								>
									<ArrowLeft className="h-4 w-4" />
									Back
								</a>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
