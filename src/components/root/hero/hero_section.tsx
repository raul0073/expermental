function Hero() {
	return (
		<section className="hero w-full bg-green-700 rounded-lg">
			<div className="w-full flex flex-col items-center p-6 text-white">
				<div className="container ">
					<h1 className="text-4xl font-bold text-center mb-4">
						Welcome to ExperiMental
					</h1>
					<p className="text-lg text-center">
						A web application that provides real-time football data, fixtures,
						and statistics.
					</p>

					<div className="flex justify-center gap-4 my-4">
						<a
							href=""
							className="px-8 py-3 text-white bg-emerald-900 rounded-md hover:bg-emerald-800">
							View on GitHub
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
