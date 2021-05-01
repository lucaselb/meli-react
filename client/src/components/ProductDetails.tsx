import React, { useState, useEffect } from "react";
import { Stack, Image, Text, Button, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Products } from "./types";

function ProductDetails() {
	const param: any = useParams();
	const [product, setProduct] = useState<Products>({
		id: "",
		title: "",
		price: 0,
		thumbnail: "",
	});

	useEffect(() => {
		fetch(`https://api.mercadolibre.com/items/${param.id}`)
			.then((response) => response.json())
			.then((data) =>
				setProduct({
					id: data.id,
					title: data.title,
					price: data.price,
					thumbnail: data.thumbnail,
				})
			);
	}, []);

	return (
		<Box padding={4} width="100%">
			<Stack direction="column">
				<Stack direction="row" key={product.id} justify="center" spacing={10}>
					<Image
						padding={4}
						height={300}
						minHeight={300}
						minWidth={300}
						width={300}
						src={product.thumbnail}
					/>
					<Stack direction="column" maxWidth="300px">
						<Text fontSize="2xl" fontWeight="bold">
							{product.title}
						</Text>
						<Text fontSize="4xl">
							{product.price.toLocaleString("es-AR", {
								style: "currency",
								currency: "ARS",
							})}
						</Text>
						<Button colorScheme="blue">Comprar</Button>
					</Stack>
				</Stack>
			</Stack>
		</Box>
	);
}

export default ProductDetails;
