library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity decoder_8 is
   port (
      a : in  std_logic_vector(2 downto 0);
      y : out std_logic_vector(7 downto 0)
   );
end entity decoder_8;

architecture behavioral of decoder_8 is
begin
   decode_proc : process(a)
   begin
      case a is
         when "000" => y <= "00000001";
         when "001" => y <= "00000010";
         when "010" => y <= "00000100";
         when "011" => y <= "00001000";
         when "100" => y <= "00010000";
         when "101" => y <= "00100000";
         when "110" => y <= "01000000";
         when "111" => y <= "10000000";
         when others => y <= (others => '0');
      end case;
   end process decode_proc;
end architecture behavioral;
