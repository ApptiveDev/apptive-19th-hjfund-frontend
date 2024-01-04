import { DesktopHeader, MobileHeader } from "./container";

import { UserAgentComponent } from "@/tools/user-agent";

const Header = (props) => UserAgentComponent({
  desktop: <DesktopHeader {...props} />,
  mobile: <MobileHeader {...props} />,
});

export default Header;