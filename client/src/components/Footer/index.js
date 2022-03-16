import React from "react";
import "./footer.css";

function Footer() {
	return (
		<footer className="App-footer">
			<div className="container">
				<div className="row">
					<a href="https://github.com/antger78/kitchen_sink">
						<i className="fa-brands fa-github-square fa-2x"></i>
					</a>
					<h6>
						&copy;{new Date().getFullYear()} Everything but the Kitchen Sink
					</h6>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
