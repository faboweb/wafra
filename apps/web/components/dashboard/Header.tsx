import * as React from 'react';
import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search, MoreHorizontal } from 'lucide-react-native';
import { useAccount } from '@/hooks/useAccount';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const Header = () => {
  const { signOut } = useAccount();
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut();
    navigation.navigate('Login');
  };

  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <Image
        source={require('@/assets/logo.svg')}
        style={{
          width: 80,
          height: 24,
        }}
      />
      <View className="flex-row items-center gap-2">
        <Button variant="ghost" className="rounded-full bg-wafra-green-lighter p-2">
          <Search size={20} className="text-wafra-black" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full bg-wafra-green-lighter p-2">
              <MoreHorizontal size={20} className="text-wafra-black" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onPress={handleSignOut}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </View>
    </View>
  );
};

export default Header;
