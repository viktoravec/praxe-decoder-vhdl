import fs from "fs";

const inputValue = parseInt(process.argv[2]);

//check vstupu
if(!Number.isInteger(inputValue) || inputValue <= 0 || (inputValue & (inputValue - 1)) !== 0) {
   console.error(`Zadaná hodnota ${inputValue} je neplatná!`);
   process.exit(1);
};

const bits = Math.log2(inputValue) | 0;

const cases = Array.from({ length: inputValue }, (_, i) => {
  const binaryInput = i.toString(2).padStart(bits, "0");

  const output =
    "0".repeat(inputValue - 1 - i) +
    "1" +
    "0".repeat(i);

  return `         when "${binaryInput}" => y <= "${output}";`;
}).join("\n");

//vhdl bordel
const vhdl = `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity decoder_${inputValue} is
   port (
      a : in  std_logic_vector(${bits - 1} downto 0);
      y : out std_logic_vector(${inputValue - 1} downto 0)
   );
end entity decoder_${inputValue};

architecture behavioral of decoder_${inputValue} is
begin
   decode_proc : process(a)
   begin
      case a is
${cases}
         when others => y <= (others => '0');
      end case;
   end process decode_proc;
end architecture behavioral;
`;

fs.writeFileSync(`decoder_${inputValue}.vhd`, vhdl);


console.log(`Soubor decoder_${inputValue} byl vygenerován (${bits} => ${inputValue} bitů)`);