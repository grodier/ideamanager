function ItemCard({ children, ...rest }) {
  return (
    <div
      className="max-w-full break-words border-b border-gray-400 p-3"
      {...rest}
    >
      {children}
    </div>
  );
}

export default ItemCard;
