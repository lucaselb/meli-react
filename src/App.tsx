import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import {
	Stack,
	Image,
	Input,
	IconButton,
	Link,
	useQuery,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/Bs";
import SearchList from "./components/SearchList";
import ProductDetails from "./components/ProductDetails";

function App() {
	const [count, setCount] = useState(0);
	const [value, setValue] = React.useState("");
	const handleChange = (event: any) => setValue(event.target.value);

	return (
		<Router>
			<Stack direction="column">
				<Stack
					direction="row"
					backgroundColor="yellow.300"
					spacing={10}
					align="center"
				>
					<Link href={"/"} marginLeft="85px">
						<Image
							src={
								"https://http2.mlstatic.com/frontend-assets/ui-navigation/5.14.4/mercadolibre/logo__small.png"
							}
						/>
					</Link>
					<Stack
						width="100%"
						direction="row"
						spacing={0}
						padding={2}
						paddingRight="50"
						backgroundColor="yellow.300"
					>
						<Input
							backgroundColor="white"
							placeholder="Buscar productos, marcas y más"
							borderRightRadius="0"
							onChange={handleChange}
						/>
						<Link href={"/search/" + value}>
							<IconButton
								aria-label="Buscar productos, marcas y más"
								borderLeftRadius="0"
								icon={<BsSearch />}
							/>
						</Link>
					</Stack>
				</Stack>
				<Stack direction="row">
					<Switch>
						<Route path="/search/:query" component={SearchList} />
						<Route path="/:id" component={ProductDetails} />
					</Switch>
				</Stack>
			</Stack>
		</Router>
	);
}

export default App;
