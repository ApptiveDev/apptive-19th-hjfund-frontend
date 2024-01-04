import { DesktopHeaderWrapper, MobileHeaderWrapper } from "./components";

import { UserAgentComponent } from "@/tools/user-agent";

const Header = (props) => UserAgentComponent({
  desktop: <DesktopHeaderWrapper {...props} />,
  mobile: <MobileHeaderWrapper {...props} />,
});

export default Header;