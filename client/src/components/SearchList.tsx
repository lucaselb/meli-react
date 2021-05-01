import React, { useState, useEffect } from "react";
import { Stack, Image, Link, Text, Divider } from "@chakra-ui/react";
import { Products } from "./types";
import { useParams } from "react-router-dom";

function SearchList() {
	const [products, setProducts] = useState<Products[]>([]);
	const param: any = useParams();

	useEffect(() => {
		fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${param.query}`)
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
		<Stack direction="column" spacing={5} padding={50} width="100%">
			{products.map((prod) => (
				<Stack direction="column" spacing={5} key={prod.id}>
					<Stack
						direction="row"
						spacing={10}
						align="center"
						key={prod.id}
						width="100%"
					>
						<Link href={"/" + prod.id}>
							<Image
								src={prod.thumbnail}
								height={160}
								minHeight={160}
								minWidth={160}
								width={160}
								backgroundPosition="center"
								backgroundRepeat="no-repeat"
								backgroundSize="contain"
							/>
						</Link>
						<Stack direction="column">
							<Text fontSize="2xl">
								{prod.price.toLocaleString("es-AR", {
									style: "currency",
									currency: "ARS",
								})}
							</Text>
							<Text fontSize="2sm">{prod.title}</Text>
						</Stack>
					</Stack>
					<Divider />
				</Stack>
			))}
		</Stack>
	);
}

export default SearchList;
