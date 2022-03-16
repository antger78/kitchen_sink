import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import "./navbar.css";
import SignUpForm from "../Signup";
import LoginForm from "../Login";
import Auth from "../../utils/auth";
import tomatoIcon from "../../images/tomato.svg";

const AppNavbar = (props) => {
	// set modal display state
	const [showModal, setShowModal] = useState(false);

	const { categories, currentCategory, setCurrentCategory } = props;

	// changing tab title name (head/title)
	// useEffect(() => {
	//   document.title = capitalizeFirstLetter(currentCategory.name);
	// }, [currentCategory]);

	return (
		<>
			<Navbar variant="dark" expand="lg" className="brown">
				<Container
					fluid
					// style={{ fontSize: 30, color: "#DE342E" }}
					className="d-flex flex-row justify-content-between navBlock"
				>
					<Navbar.Brand as={Link} to="/" className="headerFont">
						Everything But the Kitchen Sink
						<img src={tomatoIcon} width="10%" alt="Tomato logo" />
					</Navbar.Brand>
					<div>
						<Navbar.Toggle aria-controls="navbar" />
						<Navbar.Collapse id="navbar">
							<Nav className="ml-auto linkCategories">
								{/* if user is logged in show saved books and logout */}
								{Auth.loggedIn() ? (
									<>
										<Nav.Link
											as={Link}
											to="/add-recipe"
											// style={}
											onClick={() => setCurrentCategory(categories[3])}
										>
											Add a Recipe
										</Nav.Link>
										<Nav.Link
											as={Link}
											to="/your-recipes"
											onClick={() => setCurrentCategory(categories[1])}
										>
											Your Recipes
										</Nav.Link>
										<Nav.Link
											as={Link}
											to="/liked-recipes"
											onClick={() => setCurrentCategory(categories[2])}
										>
											Liked Recipes
										</Nav.Link>
										<Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
									</>
								) : (
									<Nav.Link onClick={() => setShowModal(true)}>
										Login/Sign Up
									</Nav.Link>
								)}
							</Nav>
						</Navbar.Collapse>
					</div>
				</Container>
			</Navbar>
			{/* set modal data up */}
			<Modal
				size="lg"
				show={showModal}
				onHide={() => setShowModal(false)}
				aria-labelledby="signup-modal"
			>
				{/* tab container to do either signup or login component */}
				<Tab.Container defaultActiveKey="login">
					<Modal.Header closeButton>
						<Modal.Title id="signup-modal">
							<Nav variant="pills">
								<Nav.Item>
									<Nav.Link eventKey="login">Login</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="signup">Sign Up</Nav.Link>
								</Nav.Item>
							</Nav>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Tab.Content>
							<Tab.Pane eventKey="login">
								<LoginForm handleModalClose={() => setShowModal(false)} />
							</Tab.Pane>
							<Tab.Pane eventKey="signup">
								<SignUpForm handleModalClose={() => setShowModal(false)} />
							</Tab.Pane>
						</Tab.Content>
					</Modal.Body>
				</Tab.Container>
			</Modal>
		</>
	);
};

export default AppNavbar;
