import * as React from 'react';
import { Image, View } from 'react-native';
import { useAccount } from '../../hooks/useAccount';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const Header = () => {
  const { signOut } = useAccount();
  return (
    <View className="flex-row items-center gap-[145px] z-0 overflow-hidden h-9">
      <Image source={require('@/assets/logo.svg')} className="w-[126px] h-9 overflow-hidden" />
      <View className="flex-row items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="icon">
              <Image source={require('@/assets/morehorizontal.svg')} className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onPress={() => signOut()}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </View>
    </View>
  );
};

export default Header;
