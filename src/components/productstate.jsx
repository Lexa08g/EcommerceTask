import { Link } from "react-router-dom";

export default function ProductState({ p }) {
  if (!p) return null;
  return (
    <Link
      to={`/product/${p.slug || p.id}`}
      state={p}
      className="text-blue-600 hover:underline mt-2 block"
    >
      Lihat Detail
    </Link>
  );
}
