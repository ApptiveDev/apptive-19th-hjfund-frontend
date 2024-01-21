import styles from "./styles.module.scss";

export const AbsoluteLayerId = "__absolute_layer";
export const AbsoluteLayerClass = styles["absolute-layer"];

export const FixedLayerId = "__fixed_layer";
export const FixedLayerClass = styles["fixed-layer"];

export function LayerComponents() {
  return (
    <>
      <div id={FixedLayerId} className={FixedLayerClass} />
      <div id={AbsoluteLayerId} className={AbsoluteLayerClass} />
    </>
  );
}
