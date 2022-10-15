interface Props {
  children: any;
}

const Container = ({ children }: Props) => {
  return <div className={`container`}>{children}</div>;
};

export default Container;
