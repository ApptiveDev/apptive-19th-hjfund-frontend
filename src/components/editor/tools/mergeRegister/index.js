export default function mergeRegister(...func) {
  return () => {
    func.forEach((f) => f());
  };
}