function Loader({ ...props }) {
  const { modifierClass } = props;
  return (
    <div className={`lds-ellipsis ${modifierClass}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
