export async function GET () {
	return new Response(JSON.stringify({ name: "Yashar" }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}