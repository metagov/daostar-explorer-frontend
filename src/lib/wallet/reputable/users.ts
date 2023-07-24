export const Users = {
  "0xb7a000c543ac7e39fdf4fc391b3900078e070325": 11,
  "0x1ef94bea1542da6d61c68f26f7a3933a240c87bd": 12,
  "0x710dd7f6e3e47ddc08fac4795694d7ec4506c4e6": 13,
  "0x3a11f0272dc8bc3842a7bc834e3e79bd474cf43a": 42,
};

export const ReverseUsers = Object.fromEntries(
  Object.entries(Users).map(([key, value]) => [value, key]),
);
