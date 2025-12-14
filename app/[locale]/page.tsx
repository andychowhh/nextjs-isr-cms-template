import { Product } from "@/types";

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  const allProducts = await fetch("https://fakestoreapi.com/products");
  const allProductsData: Product[] = await allProducts.json();

  return (
    <div style={{ marginTop: "2rem", padding: "2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
                borderBottom: "1px solid #ddd",
                padding: "8px",
              }}
            >
              ID
            </th>
            <th
              style={{
                textAlign: "left",
                borderBottom: "1px solid #ddd",
                padding: "8px",
              }}
            >
              Title
            </th>
            <th
              style={{
                textAlign: "left",
                borderBottom: "1px solid #ddd",
                padding: "8px",
              }}
            >
              Description
            </th>
            <th
              style={{
                textAlign: "left",
                borderBottom: "1px solid #ddd",
                padding: "8px",
              }}
            >
              Link
            </th>
          </tr>
        </thead>
        <tbody>
          {allProductsData.map((product: Product) => (
            <tr key={product.id}>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                {product.id}
              </td>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                {product.title}
              </td>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                {product.description}
              </td>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                <a href={`/${locale}/${product.id}`}>Read more</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
