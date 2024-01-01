import { Button } from "@/components";
import Icon from "@/components/icon";
import Textfield from "@/components/textfield";

export default function TestPage() {
  return (
    <div>
      <Icon iconType="share-link" />
      <Button buttonStyle="outlined">Hello</Button>
      <Textfield placeholder="hello" textfieldSize="small" />
    </div>
  );
}
