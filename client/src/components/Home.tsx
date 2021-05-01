import React, { useState, useEffect } from "react";
import {
	Stack,
	Image,
	Link,
	Text,
	Divider,
	Wrap,
	WrapItem,
	Center,
} from "@chakra-ui/react";
import { Products } from "./types";
import { useParams } from "react-router-dom";

function Home() {
	const [products, setProducts] = useState<Products[]>([]);

	useEffect(() => {
		fetch(`https://api.mercadolibre.com/sites/MLA/search?q=tecnologia`)
			.then((response) => response.json())
			.then(function (data) {
				let arr: Array<Products> = [];
				data.results.map((item: Products) => {
					arr.push({
						id: item.id,
						title: item.title,
						price: item.price,
						thumbnail: item.thumbnail,
					});
				});
				setProducts(arr);
			});
	}, []);

	return (
		<Stack direction="column" width="100%">
			<Wrap spacing={5} padding={5}>
				{products.map((prod) => (
					<WrapItem border="1px" borderColor="gray.200" borderRadius="md">
						<Center>
							<Stack direction="column">
								<Link href={"/" + prod.id}>
									<Image src={prod.thumbnail} width="224px" height="224px" />
									<Text fontSize="2xl" padding={2} align="center">
										{prod.price.toLocaleString("es-AR", {
											style: "currency",
											currency: "ARS",
										})}
									</Text>
								</Link>
							</Stack>
						</Center>
					</WrapItem>
				))}
			</Wrap>
		</Stack>
	);
}

export default Home;
