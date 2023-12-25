interface Props {
  colors: string[];
}

function badge(color: string) {
  const badgeClass = "badge filter rounded-4 bg-" + color;
  const badgeSpan = <span className={badgeClass}></span>;

  return badgeSpan;
}

export default function ProductBadge({ colors }: Props) {
  return (
    <>
      <div>{colors.map((color) => badge(color))}</div>
    </>
  );
}
