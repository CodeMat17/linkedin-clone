import HeaderLink from "./HeaderLink";
import ExploreIcon from '@mui/icons-material/Explore';
import GroupIcon from '@mui/icons-material/Group';
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { signIn } from 'next-auth/react';

function HeaderLinks({ providers }) {
    return (
        <div className="flex items-center sm:divide-x divide-gray-300 space-x-6">
            <div className="hidden sm:flex items-center sm:space-x-8">
                <HeaderLink Icon={ExploreIcon} text="Discover"/>
                <HeaderLink Icon={GroupIcon} text="People"/>
                <HeaderLink Icon={OndemandVideoSharpIcon} text="Learning" />
                <HeaderLink Icon={BusinessCenterIcon} text="Jobs" />
            </div>
            <div className="pl-6">
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <button
                            onClick={() => signIn(provider.id, {callbackUrl: '/'})}
                            className="text-blue-700 border border-blue-700
                            rounded-full px-5 py-1.5 font-semibold transition-all hover:border-2">
                            Sign in
                        </button>
                    </div>
                ))}
                
            </div>
            
        </div>
        
    )
}

export default HeaderLinks
