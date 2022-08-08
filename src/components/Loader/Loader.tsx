const Loader = ({ modifierClass = "" }) => {
  return (
    <div className={`lds-ellipsis ${modifierClass}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
