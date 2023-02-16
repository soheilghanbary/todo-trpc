interface IconProps {
  name: string;
}

export default function Icon({ name }: IconProps) {
  return <i className={`uil uil-${name}`}></i>;
}
