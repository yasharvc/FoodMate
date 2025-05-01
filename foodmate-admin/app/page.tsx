import { offlineLoger } from "@/lib/offlineLogger";

export default function Home() {
	offlineLoger.warn("Home page loaded");
	return <div>Home</div>;
}
