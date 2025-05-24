import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserCheck, Chrome } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Login() {
	const navigate = useNavigate();
	const onGuestLoggin = () => {
		navigate("/board");
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl font-bold">Welcome</CardTitle>
					<CardDescription>
						Choose how you'd like to sign in to continue
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Button variant="outline" className="w-full h-12 text-base">
						<Chrome className="mr-2 h-5 w-5" />
						Sign in with Google
					</Button>

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<Separator className="w-full" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or
							</span>
						</div>
					</div>

					<Button
						onClick={onGuestLoggin}
						variant="secondary"
						className="w-full h-12 text-base"
					>
						<UserCheck className="mr-2 h-5 w-5" />
						Continue as Guest
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
