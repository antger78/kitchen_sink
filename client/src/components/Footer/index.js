import React from "react";
import "./footer.css";

function Footer() {
	return (
		<footer>
			<div className="container App-footer">
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
